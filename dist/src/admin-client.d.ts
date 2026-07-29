import * as grpc from '@grpc/grpc-js';
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
export declare enum BoundaryStatus {
    PROVISIONING = "PROVISIONING",
    ACTIVE = "ACTIVE",
    FAILED = "FAILED"
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
 * AdminClient provides user management and administrative operations
 */
export declare class AdminClient {
    private client;
    private logger;
    private credentials?;
    private disposed;
    private cachedToken?;
    constructor(options?: AdminClientOptions);
    /**
     * Create metadata with authentication token or basic auth
     * @param operation Optional description of the operation for logging
     * @returns gRPC Metadata with authentication headers
     */
    private createAuthMetadata;
    /**
     * Set up metadata event listener to cache authentication tokens from response
     * @param call The gRPC call object
     * @param operation Optional description of the operation for logging
     */
    private setupTokenCaching;
    /**
     * Create a new user
     */
    createUser(request: CreateUserRequest): Promise<CreateUserResponse>;
    /**
     * Delete a user by ID
     */
    deleteUser(request: DeleteUserRequest): Promise<DeleteUserResponse>;
    /**
     * Change a user's password
     */
    changePassword(request: ChangePasswordRequest): Promise<ChangePasswordResponse>;
    /**
     * Replace a user's permissions for one boundary. Pass an empty permission
     * array to remove the grant.
     */
    setUserBoundaryPermissions(request: SetUserBoundaryPermissionsRequest): Promise<SetUserBoundaryPermissionsResponse>;
    /**
     * List all users
     */
    listUsers(request?: ListUsersRequest): Promise<ListUsersResponse>;
    /**
     * Validate user credentials
     */
    validateCredentials(request: ValidateCredentialsRequest): Promise<ValidateCredentialsResponse>;
    /**
     * Get total user count
     */
    getUserCount(request?: GetUserCountRequest): Promise<GetUserCountResponse>;
    /**
     * Get event count for a boundary
     */
    getEventCount(request: GetEventCountRequest): Promise<GetEventCountResponse>;
    /** Record a catalog definition and idempotently provision its physical storage. */
    createBoundary(request: CreateBoundaryRequest): Promise<CreateBoundaryResponse>;
    /** List the current event-rebuilt boundary catalog. */
    listBoundaries(): Promise<ListBoundariesResponse>;
    /** Get one boundary from the event-rebuilt catalog. */
    getBoundary(name: string): Promise<GetBoundaryResponse>;
    private writeBoundaryDefinition;
    /**
     * Close the client connection and clean up resources
     */
    close(): void;
    /**
     * Check if the client is connected to the server
     */
    healthCheck(): Promise<boolean>;
}
//# sourceMappingURL=admin-client.d.ts.map