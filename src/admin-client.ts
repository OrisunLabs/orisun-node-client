import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

// Re-export Logger interface from client
export interface Logger {
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
}

export interface AdminClientOptions {
    /**
     * Server hostname or DNS name. Can be a comma-separated list of hosts for load balancing.
     * If using DNS-based load balancing, provide a single DNS name that resolves to multiple IPs.
     */
    host?: string;
    /**
     * Server port. Required when using a single host or comma-separated hosts.
     * Not required when using a target string.
     */
    port?: number;
    /**
     * Alternative to host:port. A fully qualified gRPC target string in the format:
     * dns:[//authority/]host[:port] or ipv4:host:port or ipv6:[host]:port
     * Examples: "dns:///eventstore.example.com:5005", "ipv4:10.0.0.10:5005"
     * When provided, this takes precedence over host and port.
     */
    target?: string;
    /**
     * gRPC credentials for secure connections
     */
    credentials?: grpc.ChannelCredentials;
    /**
     * Authentication username
     */
    username?: string;
    /**
     * Authentication password
     */
    password?: string;
    /**
     * Load balancing policy to use. Options: 'round_robin', 'pick_first'
     * - round_robin: Distributes requests across all available servers
     * - pick_first: Connects to the first available server
     */
    loadBalancingPolicy?: 'round_robin' | 'pick_first';

    /**
     * Additional @grpc/grpc-js channel options. Orisun sets high-throughput
     * defaults for message size and HTTP/2 flow control; values here override
     * those defaults.
     */
    channelOptions?: grpc.ChannelOptions;

    /**
     * Custom logger implementation
     */
    logger?: Logger;
    /**
     * Enable or disable logging
     */
    enableLogging?: boolean;
}

// Domain-specific interfaces matching admin.proto

export interface BoundaryPermissionGrant {
    boundary: string;
    permissions: string[];
}

export interface AdminUser {
    userId: string;
    name: string;
    username: string;
    roles: string[];
    boundaryPermissions?: BoundaryPermissionGrant[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserRequest {
    name: string;
    username: string;
    password: string;
    roles: string[];
    boundaryPermissions?: BoundaryPermissionGrant[];
}

export interface CreateUserResponse {
    user: AdminUser;
}

export interface DeleteUserRequest {
    userId: string;
}

export interface DeleteUserResponse {
    success: boolean;
}

export interface ChangePasswordRequest {
    userId: string;
    currentPassword: string;
    newPassword: string;
}

export interface ChangePasswordResponse {
    success: boolean;
}

export interface SetUserBoundaryPermissionsRequest {
    userId: string;
    boundary: string;
    permissions: string[];
}

export interface SetUserBoundaryPermissionsResponse {
    user: AdminUser;
}

export interface ListUsersRequest {
    // Empty for now, could add pagination/filtering later
}

export interface ListUsersResponse {
    users: AdminUser[];
}

export interface ValidateCredentialsRequest {
    username: string;
    password: string;
}

export interface ValidateCredentialsResponse {
    success: boolean;
    user?: AdminUser;
}

export interface GetUserCountRequest {
    // Empty
}

export interface GetUserCountResponse {
    count: number;
}

export interface GetEventCountRequest {
    boundary: string;
}

export interface GetEventCountResponse {
    count: number;
}

export interface BoundaryPlacement {
    backend: string;
    namespace: string;
}

export enum BoundaryStatus {
    PROVISIONING = 'PROVISIONING',
    ACTIVE = 'ACTIVE',
    FAILED = 'FAILED'
}

export interface BoundaryPosition {
    commitPosition: number;
    preparePosition: number;
}

export interface BoundaryInfo {
    name: string;
    description: string;
    placement: BoundaryPlacement;
    status: BoundaryStatus;
    existedBeforeCatalog: boolean;
    lastError: string;
    definitionPosition?: BoundaryPosition;
    statusPosition?: BoundaryPosition;
}

export interface CreateBoundaryRequest {
    name: string;
    description?: string;
    placement: BoundaryPlacement;
    existedBeforeCatalog?: boolean;
}

export interface CreateBoundaryResponse {
    boundary: BoundaryInfo;
}

export interface ListBoundariesResponse {
    boundaries: BoundaryInfo[];
}

export interface GetBoundaryResponse {
    boundary: BoundaryInfo;
}

/**
 * Validates admin client options and throws errors for invalid configurations
 */
function validateAdminClientOptions(options: AdminClientOptions): void {
    // Validate connection options
    if (!options.target && !options.host) {
        throw new Error('Either host or target must be provided');
    }

    if (options.host && !options.target && !options.port) {
        throw new Error('Port must be provided when using host without target');
    }

    if (options.port && (options.port < 1 || options.port > 65535)) {
        throw new Error('Port must be between 1 and 65535');
    }

    // Validate load balancing policy
    if (options.loadBalancingPolicy &&
        !['round_robin', 'pick_first'].includes(options.loadBalancingPolicy)) {
        throw new Error('loadBalancingPolicy must be either "round_robin" or "pick_first"');
    }
}

/**
 * Default no-op logger that doesn't log anything
 */
class NoopLogger implements Logger {
    debug(message: string, ...args: any[]): void {
    }

    info(message: string, ...args: any[]): void {
    }

    warn(message: string, ...args: any[]): void {
    }

    error(message: string, ...args: any[]): void {
    }
}

const ORISUN_DEFAULT_MAX_MESSAGE_SIZE = 100 * 1024 * 1024;
const ORISUN_DEFAULT_FLOW_CONTROL_WINDOW = 1024 * 1024;

/**
 * Helper function to parse Timestamp from protobuf
 */
function parseTimestamp(timestamp: any): Date {
    if (!timestamp) {
        return new Date();
    }
    return new Date(Number(timestamp.seconds) * 1000 + Math.floor(timestamp.nanos / 1000000));
}

/**
 * Helper function to parse AdminUser from protobuf
 */
function parseAdminUser(user: any): AdminUser {
    return {
        userId: user.user_id,
        name: user.name,
        username: user.username,
        roles: user.roles || [],
        boundaryPermissions: (user.boundary_permissions || []).map((grant: any) => ({
            boundary: grant.boundary,
            permissions: grant.permissions || []
        })),
        createdAt: parseTimestamp(user.created_at),
        updatedAt: parseTimestamp(user.updated_at)
    };
}

function parseBoundaryPosition(position: any): BoundaryPosition | undefined {
    if (!position) {
        return undefined;
    }
    return {
        commitPosition: Number(position.commit_position),
        preparePosition: Number(position.prepare_position)
    };
}

function parseBoundaryInfo(boundary: any): BoundaryInfo {
    return {
        name: boundary.name,
        description: boundary.description,
        placement: {
            backend: boundary.placement?.backend || '',
            namespace: boundary.placement?.namespace || ''
        },
        status: String(boundary.status).replace('BOUNDARY_LIFECYCLE_STATUS_', '') as BoundaryStatus,
        existedBeforeCatalog: Boolean(boundary.existed_before_catalog),
        lastError: boundary.last_error || '',
        definitionPosition: parseBoundaryPosition(boundary.definition_position),
        statusPosition: parseBoundaryPosition(boundary.status_position)
    };
}

/**
 * AdminClient provides user management and administrative operations
 */
export class AdminClient {
    private client: any;
    private logger: Logger;
    private credentials?: grpc.Metadata;
    private disposed: boolean = false;
    private cachedToken?: string;

    constructor(options: AdminClientOptions = {}) {
        // Validate options
        validateAdminClientOptions(options);

        const {
            host = 'localhost',
            port = 5005,
            target,
            credentials = grpc.credentials.createInsecure(),
            username = 'admin',
            password = 'changeit',
            loadBalancingPolicy = 'round_robin',
            channelOptions: userChannelOptions = {},
            logger,
            enableLogging = false
        } = options;

        // Initialize logger
        this.logger = enableLogging ? (logger || console) : new NoopLogger();

        // Load the protobuf definition
        const PROTO_PATH = path.join(__dirname, '../protos/admin.proto');
        const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        });

        const adminProto = grpc.loadPackageDefinition(packageDefinition) as any;

        // Create the client with keep-alive options and load balancing
        const channelOptions: grpc.ChannelOptions = {
            'grpc.max_receive_message_length': ORISUN_DEFAULT_MAX_MESSAGE_SIZE,
            'grpc.max_send_message_length': ORISUN_DEFAULT_MAX_MESSAGE_SIZE,
            'grpc-node.flow_control_window': ORISUN_DEFAULT_FLOW_CONTROL_WINDOW,
            'grpc.lb_policy_name': loadBalancingPolicy,
            'grpc.service_config': JSON.stringify({
                loadBalancingConfig: [{[loadBalancingPolicy]: {}}]
            }),
            ...userChannelOptions
        };

        // Determine the target string
        let targetString: string;

        if (target) {
            // Use the provided target string directly
            targetString = target;
        } else if (host.includes(',')) {
            // Handle comma-separated list of hosts for manual load balancing
            const hosts = host.split(',').map(h => h.trim());
            targetString = hosts.map(h => `${h}:${port}`).join(',');
        } else {
            // Standard host:port format
            targetString = `${host}:${port}`;
        }

        this.client = new adminProto.orisun.Admin(
            targetString,
            credentials,
            channelOptions
        );

        // Set up authentication metadata
        this.credentials = new grpc.Metadata();
        const auth = Buffer.from(`${username}:${password}`).toString('base64');
        this.credentials.add('authorization', `Basic ${auth}`);

        // Set up logger
        this.logger = options.logger || {
            debug: () => {
            },
            info: () => {
            },
            warn: () => {
            },
            error: () => {
            }
        };

        if (options.enableLogging) {
            this.logger.info('AdminClient initialized');
        }

        // Perform mandatory health check immediately after connection
        setImmediate(async () => {
            if (this.disposed) {
                return;
            }

            // Skip health check during testing
            if (process.env.NODE_ENV === 'test') {
                this.logger.info('Skipping health check during testing');
                return;
            }

            try {
                const isHealthy = await this.healthCheck();
                if (!isHealthy) {
                    const error = new Error('Admin connection health check failed');
                    this.logger.error('Initial health check failed:', error);
                    throw error;
                }
                this.logger.info('Initial health check passed - connection established');
            } catch (error) {
                this.logger.error('Initial health check error:', error);
                throw error;
            }
        });
    }

    /**
     * Create metadata with authentication token or basic auth
     * @param operation Optional description of the operation for logging
     * @returns gRPC Metadata with authentication headers
     */
    private createAuthMetadata(operation?: string): grpc.Metadata {
        const metadata = new grpc.Metadata();
        if (this.cachedToken) {
            metadata.add('x-auth-token', this.cachedToken);
            this.logger.debug(`Using cached auth token${operation ? ` for ${operation}` : ''}`);
        }
        if (this.credentials) {
            metadata.add('authorization', this.credentials.get('authorization')[0]);
            this.logger.debug(`Using basic auth${operation ? ` for ${operation}` : ''}`);
        }
        return metadata;
    }

    /**
     * Set up metadata event listener to cache authentication tokens from response
     * @param call The gRPC call object
     * @param operation Optional description of the operation for logging
     */
    private setupTokenCaching(call: any, operation?: string): void {
        call.on('metadata', (metadata: grpc.Metadata) => {
            this.logger.debug('Response metadata:', metadata);

            if (metadata) {
                const tokens = metadata.get('x-auth-token');
                if (tokens && tokens.length > 0) {
                    this.cachedToken = tokens[0].toString();
                    this.logger.debug(`Cached auth token from ${operation || 'response'}`);
                }
            }
        });
    }

    /**
     * Create a new user
     */
    async createUser(request: CreateUserRequest): Promise<CreateUserResponse> {
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }

        if (!request) {
            throw new Error('CreateUserRequest cannot be null or undefined');
        }

        if (!request.name) {
            throw new Error('Name is required');
        }

        if (!request.username) {
            throw new Error('Username is required');
        }

        if (!request.password) {
            throw new Error('Password is required');
        }

        if (!request.roles || !Array.isArray(request.roles)) {
            throw new Error('Roles must be an array');
        }

        this.logger.debug(`Creating user '${request.username}'`);

        const grpcRequest = {
            name: request.name,
            username: request.username,
            password: request.password,
            roles: request.roles,
            boundary_permissions: (request.boundaryPermissions || []).map(grant => ({
                boundary: grant.boundary,
                permissions: grant.permissions
            }))
        };

        try {
            const metadata = this.createAuthMetadata('create user');

            const response = await new Promise<any>((resolve, reject) => {
                const call = this.client.createUser(grpcRequest, metadata, (error: any, response: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(response);
                });

                this.setupTokenCaching(call, 'create user response');
            });

            this.logger.info(`Successfully created user '${request.username}'`);

            return {
                user: parseAdminUser(response.user)
            };
        } catch (error) {
            this.logger.error(`Failed to create user:`, error);
            throw new Error(`Failed to create user: ${(error as Error).message}`);
        }
    }

    /**
     * Delete a user by ID
     */
    async deleteUser(request: DeleteUserRequest): Promise<DeleteUserResponse> {
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }

        if (!request) {
            throw new Error('DeleteUserRequest cannot be null or undefined');
        }

        if (!request.userId) {
            throw new Error('User ID is required');
        }

        this.logger.debug(`Deleting user '${request.userId}'`);

        const grpcRequest = {
            user_id: request.userId
        };

        try {
            const metadata = this.createAuthMetadata('delete user');

            const response = await new Promise<any>((resolve, reject) => {
                const call = this.client.deleteUser(grpcRequest, metadata, (error: any, response: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(response);
                });

                this.setupTokenCaching(call, 'delete user response');
            });

            this.logger.info(`Successfully deleted user '${request.userId}'`);

            return {
                success: response.success
            };
        } catch (error) {
            this.logger.error(`Failed to delete user:`, error);
            throw new Error(`Failed to delete user: ${(error as Error).message}`);
        }
    }

    /**
     * Change a user's password
     */
    async changePassword(request: ChangePasswordRequest): Promise<ChangePasswordResponse> {
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }

        if (!request) {
            throw new Error('ChangePasswordRequest cannot be null or undefined');
        }

        if (!request.userId) {
            throw new Error('User ID is required');
        }

        if (!request.currentPassword) {
            throw new Error('Current password is required');
        }

        if (!request.newPassword) {
            throw new Error('New password is required');
        }

        this.logger.debug(`Changing password for user '${request.userId}'`);

        const grpcRequest = {
            user_id: request.userId,
            current_password: request.currentPassword,
            new_password: request.newPassword
        };

        try {
            const metadata = this.createAuthMetadata('change password');

            const response = await new Promise<any>((resolve, reject) => {
                const call = this.client.changePassword(grpcRequest, metadata, (error: any, response: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(response);
                });

                this.setupTokenCaching(call, 'change password response');
            });

            this.logger.info(`Successfully changed password for user '${request.userId}'`);

            return {
                success: response.success
            };
        } catch (error) {
            this.logger.error(`Failed to change password:`, error);
            throw new Error(`Failed to change password: ${(error as Error).message}`);
        }
    }

    /**
     * Replace a user's permissions for one boundary. Pass an empty permission
     * array to remove the grant.
     */
    async setUserBoundaryPermissions(
        request: SetUserBoundaryPermissionsRequest
    ): Promise<SetUserBoundaryPermissionsResponse> {
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }
        if (!request) {
            throw new Error('SetUserBoundaryPermissionsRequest cannot be null or undefined');
        }
        if (!request.userId) {
            throw new Error('User ID is required');
        }
        if (!request.boundary) {
            throw new Error('Boundary is required');
        }
        if (!Array.isArray(request.permissions)) {
            throw new Error('Permissions must be an array');
        }

        const grpcRequest = {
            user_id: request.userId,
            boundary: request.boundary,
            permissions: request.permissions
        };

        try {
            const metadata = this.createAuthMetadata('set user boundary permissions');
            const response = await new Promise<any>((resolve, reject) => {
                const call = this.client.setUserBoundaryPermissions(
                    grpcRequest,
                    metadata,
                    (error: any, response: any) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(response);
                    }
                );
                this.setupTokenCaching(call, 'set user boundary permissions response');
            });
            return {user: parseAdminUser(response.user)};
        } catch (error) {
            this.logger.error('Failed to set user boundary permissions:', error);
            throw new Error(`Failed to set user boundary permissions: ${(error as Error).message}`);
        }
    }

    /**
     * List all users
     */
    async listUsers(request: ListUsersRequest = {}): Promise<ListUsersResponse> {
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }

        this.logger.debug('Listing users');

        const grpcRequest = {};

        try {
            const metadata = this.createAuthMetadata('list users');

            const response = await new Promise<any>((resolve, reject) => {
                const call = this.client.listUsers(grpcRequest, metadata, (error: any, response: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(response);
                });

                this.setupTokenCaching(call, 'list users response');
            });

            const users = response.users.map((user: any) => parseAdminUser(user));

            this.logger.debug(`Successfully retrieved ${users.length} users`);

            return {users};
        } catch (error) {
            this.logger.error(`Failed to list users:`, error);
            throw new Error(`Failed to list users: ${(error as Error).message}`);
        }
    }

    /**
     * Validate user credentials
     */
    async validateCredentials(request: ValidateCredentialsRequest): Promise<ValidateCredentialsResponse> {
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }

        if (!request) {
            throw new Error('ValidateCredentialsRequest cannot be null or undefined');
        }

        if (!request.username) {
            throw new Error('Username is required');
        }

        if (!request.password) {
            throw new Error('Password is required');
        }

        this.logger.debug(`Validating credentials for user '${request.username}'`);

        const grpcRequest = {
            username: request.username,
            password: request.password
        };

        try {
            const metadata = this.createAuthMetadata('validate credentials');

            const response = await new Promise<any>((resolve, reject) => {
                const call = this.client.validateCredentials(grpcRequest, metadata, (error: any, response: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(response);
                });

                this.setupTokenCaching(call, 'validate credentials response');
            });

            this.logger.info(`Credentials validation for user '${request.username}': ${response.success ? 'success' : 'failed'}`);

            return {
                success: response.success,
                user: response.user ? parseAdminUser(response.user) : undefined
            };
        } catch (error) {
            this.logger.error(`Failed to validate credentials:`, error);
            throw new Error(`Failed to validate credentials: ${(error as Error).message}`);
        }
    }

    /**
     * Get total user count
     */
    async getUserCount(request: GetUserCountRequest = {}): Promise<GetUserCountResponse> {
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }

        this.logger.debug('Getting user count');

        const grpcRequest = {};

        try {
            const metadata = this.createAuthMetadata('get user count');

            const response = await new Promise<any>((resolve, reject) => {
                const call = this.client.getUserCount(grpcRequest, metadata, (error: any, response: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(response);
                });

                this.setupTokenCaching(call, 'get user count response');
            });

            this.logger.debug(`User count: ${response.count}`);

            return {
                count: Number(response.count)
            };
        } catch (error) {
            this.logger.error(`Failed to get user count:`, error);
            throw new Error(`Failed to get user count: ${(error as Error).message}`);
        }
    }

    /**
     * Get event count for a boundary
     */
    async getEventCount(request: GetEventCountRequest): Promise<GetEventCountResponse> {
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }

        if (!request) {
            throw new Error('GetEventCountRequest cannot be null or undefined');
        }

        if (!request.boundary) {
            throw new Error('Boundary is required');
        }

        this.logger.debug(`Getting event count for boundary '${request.boundary}'`);

        const grpcRequest = {
            boundary: request.boundary
        };

        try {
            const metadata = this.createAuthMetadata('get event count');

            const response = await new Promise<any>((resolve, reject) => {
                const call = this.client.getEventCount(grpcRequest, metadata, (error: any, response: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(response);
                });

                this.setupTokenCaching(call, 'get event count response');
            });

            this.logger.debug(`Event count for boundary '${request.boundary}': ${response.count}`);

            return {
                count: Number(response.count)
            };
        } catch (error) {
            this.logger.error(`Failed to get event count:`, error);
            throw new Error(`Failed to get event count: ${(error as Error).message}`);
        }
    }

    /** Record a catalog definition and idempotently provision its physical storage. */
    async createBoundary(request: CreateBoundaryRequest): Promise<CreateBoundaryResponse> {
        return this.writeBoundaryDefinition(request);
    }

    /** List the current event-rebuilt boundary catalog. */
    async listBoundaries(): Promise<ListBoundariesResponse> {
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }
        try {
            const metadata = this.createAuthMetadata('list boundaries');
            const response = await new Promise<any>((resolve, reject) => {
                const call = this.client.listBoundaries({}, metadata, (error: any, value: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(value);
                });
                this.setupTokenCaching(call, 'list boundaries response');
            });
            return {boundaries: (response.boundaries || []).map(parseBoundaryInfo)};
        } catch (error) {
            this.logger.error('Failed to list boundaries:', error);
            throw new Error(`Failed to list boundaries: ${(error as Error).message}`);
        }
    }

    /** Get one boundary from the event-rebuilt catalog. */
    async getBoundary(name: string): Promise<GetBoundaryResponse> {
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }
        if (!name) {
            throw new Error('Boundary name is required');
        }
        try {
            const metadata = this.createAuthMetadata('get boundary');
            const response = await new Promise<any>((resolve, reject) => {
                const call = this.client.getBoundary({name}, metadata, (error: any, value: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(value);
                });
                this.setupTokenCaching(call, 'get boundary response');
            });
            return {boundary: parseBoundaryInfo(response.boundary)};
        } catch (error) {
            this.logger.error(`Failed to get boundary '${name}':`, error);
            throw new Error(`Failed to get boundary: ${(error as Error).message}`);
        }
    }

    private async writeBoundaryDefinition(
        request: CreateBoundaryRequest
    ): Promise<CreateBoundaryResponse> {
        const operation = 'create boundary';
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }
        if (!request?.name) {
            throw new Error('Boundary name is required');
        }
        if (!request.placement?.backend || !request.placement?.namespace) {
            throw new Error('Boundary placement backend and namespace are required');
        }

        const grpcRequest = {
            name: request.name,
            description: request.description || '',
            placement: {
                backend: request.placement.backend,
                namespace: request.placement.namespace
            },
            existed_before_catalog: request.existedBeforeCatalog || false
        };
        try {
            const metadata = this.createAuthMetadata(operation);
            const response = await new Promise<any>((resolve, reject) => {
                const call = this.client.createBoundary(grpcRequest, metadata, (error: any, value: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(value);
                });
                this.setupTokenCaching(call, `${operation} response`);
            });
            return {boundary: parseBoundaryInfo(response.boundary)};
        } catch (error) {
            this.logger.error(`Failed to ${operation}:`, error);
            throw new Error(`Failed to ${operation}: ${(error as Error).message}`);
        }
    }

    /**
     * Close the client connection and clean up resources
     */
    close(): void {
        if (this.disposed) {
            this.logger.debug('AdminClient already disposed');
            return;
        }

        this.logger.debug('Closing AdminClient connection');

        try {
            if (this.client && typeof this.client.close === 'function') {
                this.client.close();
            } else if (this.client && (this.client as any).channel) {
                const channel = (this.client as any).channel;
                if (typeof channel.close === 'function') {
                    channel.close();
                }
            }

            this.disposed = true;
            this.logger.debug('AdminClient connection closed successfully');
        } catch (error) {
            this.logger.error('Error closing AdminClient connection:', error);
            throw new Error(`Failed to close AdminClient: ${(error as Error).message}`);
        }
    }

    /**
     * Check if the client is connected to the server
     */
    async healthCheck(): Promise<boolean> {
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }

        this.logger.debug('Performing health check');

        try {
            // Try to make a simple call to test connectivity
            await this.getUserCount();
            this.logger.debug('Health check successful');
            return true;
        } catch (error) {
            this.logger.warn('Health check failed:', error);
            return false;
        }
    }
}
