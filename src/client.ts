import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import {promisify} from 'util';
import * as path from 'path';
import * as pb from './generated/eventstore_pb';

// Client-friendly interfaces that match the expected API
export interface Event {
    eventId: string;
    eventType: string;
    data: any;
    metadata?: Record<string, any>;
    position: Position;
    dateCreated: string;
}

export interface EventToSave {
    eventId: string;
    eventType: string;
    data: any;
    metadata?: Record<string, any>;
}

export interface Position {
    commitPosition: number;
    preparePosition: number;
}

export interface Tag {
    key: string;
    value: string;
}

export interface Criterion {
    tags: Tag[];
}

export interface Query {
    criteria: Criterion[];
}

export interface SaveEventsRequest {
    boundary: string;
    query: {
        expectedPosition: Position;
        subsetQuery?: Query;
    };
    events: EventToSave[];
}

export interface GetEventsRequest {
    query?: Query;
    fromPosition?: Position;
    count?: number;
    direction?: 'ASC' | 'DESC';
    boundary: string;
}

export interface GetLatestByCriteriaRequest {
    boundary: string;
    criteria: Criterion[];
}

export interface LatestCriterionResult {
    criterion: Criterion;
    event?: Event;
}

export interface GetLatestByCriteriaResponse {
    results: LatestCriterionResult[];
    contextPosition: Position;
}

export interface SubscribeRequest {
    afterPosition?: Position;
    query?: Query;
    subscriberName: string;
    boundary: string;
}

export interface WriteResult {
    logPosition: Position;
}

export enum ValueType {
    TEXT = 'TEXT',
    NUMERIC = 'NUMERIC',
    BOOLEAN = 'BOOLEAN',
    TIMESTAMPTZ = 'TIMESTAMPTZ'
}

export enum ConditionCombinator {
    AND = 'AND',
    OR = 'OR'
}

export interface IndexField {
    jsonKey: string;
    valueType: ValueType;
}

export interface IndexCondition {
    key: string;
    operator: string;
    value: string;
}

export interface CreateIndexRequest {
    boundary: string;
    name: string;
    fields: IndexField[];
    conditions?: IndexCondition[];
    conditionCombinator?: ConditionCombinator;
}

export interface CreateIndexResponse {
}

export interface DropIndexRequest {
    boundary: string;
    name: string;
}

export interface DropIndexResponse {
}

export enum IndexState {
    UNSPECIFIED = 'INDEX_STATE_UNSPECIFIED',
    BUILDING = 'INDEX_STATE_BUILDING',
    READY = 'INDEX_STATE_READY'
}

export interface IndexDefinition {
    name: string;
    fields: IndexField[];
    conditions: IndexCondition[];
    conditionCombinator: ConditionCombinator;
    state: IndexState;
}

export interface ListIndexesResponse {
    indexes: IndexDefinition[];
}

export interface GetIndexResponse {
    index: IndexDefinition;
}

export enum StorageBackend {
    UNSPECIFIED = 'STORAGE_BACKEND_UNSPECIFIED',
    POSTGRES = 'STORAGE_BACKEND_POSTGRES',
    SQLITE = 'STORAGE_BACKEND_SQLITE',
    FOUNDATIONDB = 'STORAGE_BACKEND_FOUNDATIONDB'
}

export enum ServerCapability {
    UNSPECIFIED = 'SERVER_CAPABILITY_UNSPECIFIED',
    COMMAND_CONTEXT_CONSISTENCY = 'SERVER_CAPABILITY_COMMAND_CONTEXT_CONSISTENCY',
    CATCH_UP_SUBSCRIPTIONS = 'SERVER_CAPABILITY_CATCH_UP_SUBSCRIPTIONS',
    INDEX_MANAGEMENT = 'SERVER_CAPABILITY_INDEX_MANAGEMENT',
    BOUNDARY_CATALOG = 'SERVER_CAPABILITY_BOUNDARY_CATALOG',
    GRPC_HEALTH = 'SERVER_CAPABILITY_GRPC_HEALTH'
}

export interface ServerInfo {
    version: string;
    gitCommit: string;
    buildTime: string;
    backend: StorageBackend;
    nodeId: string;
    capabilities: ServerCapability[];
}

/**
 * Logger interface for client logging
 */
export interface Logger {
    debug(message: string, ...args: any[]): void;

    info(message: string, ...args: any[]): void;

    warn(message: string, ...args: any[]): void;

    error(message: string, ...args: any[]): void;
}


export interface EventStoreClientOptions {
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

/**
 * Validates client options and throws errors for invalid configurations
 */
function validateClientOptions(options: EventStoreClientOptions): void {
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
 * orisun client operations
 */
export class EventStoreClient {
    private client: any;
    private channel!: grpc.Channel;
    private logger: Logger;
    private credentials?: grpc.Metadata;
    private disposed: boolean = false;
    private cachedToken?: string;

    constructor(options: EventStoreClientOptions = {}) {
        // Validate options
        validateClientOptions(options);

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
        const PROTO_PATH = path.join(__dirname, '../protos/eventstore.proto');
        const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        });

        const eventStoreProto = grpc.loadPackageDefinition(packageDefinition) as any;

        // Create the client with keep-alive options and load balancing
        const channelOptions: grpc.ChannelOptions = {
            // 'grpc.keepalive_time_ms': keepaliveTimeMs,
            // 'grpc.keepalive_timeout_ms': keepaliveTimeoutMs,
            // 'grpc.keepalive_permit_without_calls': keepalivePermitWithoutCalls ? 1 : 0,
            // 'grpc.http2.min_time_between_pings_ms': keepaliveTimeMs,
            // 'grpc.http2.max_pings_without_data': 0,
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

        this.client = new eventStoreProto.orisun.EventStore(
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
            this.logger.info('EventStoreClient initialized');
        }

        // Perform mandatory health check immediately after connection
        // Use setImmediate to perform health check after constructor completes
        setImmediate(async () => {
            // Skip health check if client has been disposed
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
                    const error = new Error('EventStore connection health check failed');
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
        if (!call || typeof call.on !== 'function') {
            return;
        }

        // In @grpc/grpc-js, we need to listen for the 'metadata' event on the call
        call.on('metadata', (metadata: grpc.Metadata) => {
            this.logger.debug('Response metadata:', metadata);

            // Extract token from response headers if present
            if (metadata) {
                const tokens = metadata.get('x-auth-token');
                if (tokens && tokens.length > 0) {
                    // Convert MetadataValue (Buffer) to string
                    this.cachedToken = tokens[0].toString();
                    this.logger.debug(`Cached auth token from ${operation || 'response'}`);
                }
            }
        });
    }

    private mapEvent(event: any): Event {
        const position = {
            commitPosition: Number(event.position?.commit_position || '0'),
            preparePosition: Number(event.position?.prepare_position || '0')
        };
        const dateCreated = event.date_created
            ? new Date(Number(event.date_created.seconds || '0') * 1000 + Math.floor(Number(event.date_created.nanos || 0) / 1000000)).toISOString()
            : new Date().toISOString();

        try {
            return {
                eventId: event.event_id,
                eventType: event.event_type,
                data: JSON.parse(event.data),
                metadata: JSON.parse(event.metadata || '{}'),
                position,
                dateCreated
            };
        } catch (parseError) {
            this.logger.error(`Failed to parse event data or metadata: ${(parseError as Error).message}`);
            return {
                eventId: event.event_id,
                eventType: event.event_type,
                data: event.data,
                metadata: event.metadata || '{}',
                position,
                dateCreated
            };
        }
    }

    /**
     * Save events to a stream
     * @throws {Error} If the request is invalid or the operation fails
     * @returns {Promise<WriteResult>} The write result containing the log position
     */
    async saveEvents(request: SaveEventsRequest): Promise<WriteResult> {
        // Check if client is disposed
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }

        if (!request) {
            throw new Error('SaveEventsRequest cannot be null or undefined');
        }

        if (!request.boundary) {
            throw new Error('Boundary is required');
        }

        if (!request.events || !Array.isArray(request.events) || request.events.length === 0) {
            throw new Error('At least one event is required');
        }

        // Validate each event
        request.events.forEach((event, index) => {
            if (!event.eventId) {
                throw new Error(`Event at index ${index} is missing eventId`);
            }
            if (!event.eventType) {
                throw new Error(`Event at index ${index} is missing eventType`);
            }
            if (event.data === undefined || event.data === null) {
                throw new Error(`Event at index ${index} is missing data`);
            }
        });

        this.logger.debug(`Saving ${request.events.length} events`);

        // Try using plain object approach instead of generated protobuf classes
        const grpcRequest = {
            boundary: request.boundary,
            query: {
                expected_position: request.query.expectedPosition ? {
                    commit_position: request.query.expectedPosition.commitPosition,
                    prepare_position: request.query.expectedPosition.preparePosition
                } : null,
                ...(request.query.subsetQuery && {subsetQuery: request.query.subsetQuery})
            },
            events: request.events.map(event => ({
                event_id: event.eventId,
                event_type: event.eventType,
                data: JSON.stringify(event.data),
                metadata: JSON.stringify(event.metadata || {})
            }))
        };

        try {
            // Create metadata with authentication
            const metadata = this.createAuthMetadata('save events');

            // Use callback-based API to access response headers
            const response = await new Promise<any>((resolve, reject) => {
                const call = this.client.saveEvents(grpcRequest, metadata, (error: any, response: any, responseMetadata: grpc.Metadata) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(response);
                });

                // Set up token caching from response metadata
                this.setupTokenCaching(call, 'save events response');
            });

            this.logger.info(`Successfully saved events`);

            // Transform the gRPC response to match our interface
            return {
                logPosition: {
                    commitPosition: Number(response.log_position?.commit_position || '0'),
                    preparePosition: Number(response.log_position?.prepare_position || '0')
                }
            };
        } catch (error) {
            this.logger.error(`Failed to save events: `, error);

            // Enhance error with context
            const enhancedError = new Error(
                `Failed to save events to stream: ${(error as Error).message}`
            );
            enhancedError.stack = (error as Error).stack;
            (enhancedError as any).originalError = error;
            (enhancedError as any).eventCount = request.events.length;

            throw enhancedError;
        }
    }

    /**
     * Get events from a stream
     * @throws {Error} If the request is invalid or the operation fails
     */
    async getEvents(request: GetEventsRequest): Promise<Event[]> {
        // Check if client is disposed
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }

        if (!request) {
            throw new Error('GetEventsRequest cannot be null or undefined');
        }

        if (!request.boundary) {
            throw new Error('Boundary is required');
        }

        // Validate count if provided
        if (request.count !== undefined && request.count <= 0) {
            throw new Error('Count must be greater than 0');
        }

        const countValue = request.count || 100;
        this.logger.debug(`Setting count to: ${countValue}`);

        // Use plain object instead of protobuf classes
        const grpcRequest: any = {
            boundary: request.boundary,
            count: countValue,
            direction: request.direction === 'DESC' ? 1 : 0 // DESC = 1, ASC = 0
        };

        if (request.query) {
            grpcRequest.query = request.query;
        }

        if (request.fromPosition) {
            grpcRequest.from_position = {
                commit_position: request.fromPosition.commitPosition,
                prepare_position: request.fromPosition.preparePosition
            };
        }

        this.logger.debug(`Getting events with count: ${countValue}`);

        try {
            // Create metadata with authentication
            const metadata = this.createAuthMetadata('get events');

            // Use callback-based API to access response headers
            const response = await new Promise<any>((resolve, reject) => {
                const call = this.client.getEvents(grpcRequest, metadata, (error: any, response: any, responseMetadata: grpc.Metadata) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(response);
                });

                // Set up token caching from response metadata
                this.setupTokenCaching(call, 'get events response');
            });

            if (!response || !response.events || response.events.length === 0) {
                this.logger.warn(`No events returned`);
                return [];
            }

            const events = response.events.map((event: any) => this.mapEvent(event));

            this.logger.debug(`Successfully retrieved ${events.length} events`);
            return events;
        } catch (error) {
            this.logger.error(`Failed to get events:`, error);

            // Enhance error with context
            const enhancedError = new Error(
                `Failed to get events: ${(error as Error).message}`
            );
            enhancedError.stack = (error as Error).stack;
            (enhancedError as any).originalError = error;
            (enhancedError as any).boundary = request.boundary;

            throw enhancedError;
        }
    }

    /**
     * Get the latest event matching each criterion from one server-side read snapshot.
     *
     * Use the returned contextPosition as SaveEvents.query.expectedPosition with
     * the same combined criteria. Independent getEvents calls are not equivalent
     * for multi-criterion command contexts because they observe separate snapshots.
     */
    async getLatestByCriteria(request: GetLatestByCriteriaRequest): Promise<GetLatestByCriteriaResponse> {
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }

        if (!request) {
            throw new Error('GetLatestByCriteriaRequest cannot be null or undefined');
        }

        if (!request.boundary) {
            throw new Error('Boundary is required');
        }

        if (!request.criteria || !Array.isArray(request.criteria) || request.criteria.length === 0) {
            throw new Error('At least one criterion is required');
        }

        request.criteria.forEach((criterion, index) => {
            if (!criterion || !criterion.tags || !Array.isArray(criterion.tags) || criterion.tags.length === 0) {
                throw new Error(`Criterion at index ${index} must include at least one tag`);
            }
        });

        const grpcRequest = {
            boundary: request.boundary,
            criteria: request.criteria
        };

        try {
            const metadata = this.createAuthMetadata('get latest by criteria');

            const response = await new Promise<any>((resolve, reject) => {
                const call = this.client.getLatestByCriteria(grpcRequest, metadata, (error: any, response: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(response);
                });

                this.setupTokenCaching(call, 'get latest by criteria response');
            });

            return {
                results: (response.results || []).map((result: any) => ({
                    criterion: result.criterion,
                    event: result.event && result.event.event_id ? this.mapEvent(result.event) : undefined
                })),
                contextPosition: {
                    commitPosition: Number(response.context_position?.commit_position || '-1'),
                    preparePosition: Number(response.context_position?.prepare_position || '-1')
                }
            };
        } catch (error) {
            this.logger.error(`Failed to get latest events by criteria:`, error);
            const enhancedError = new Error(
                `Failed to get latest events by criteria: ${(error as Error).message}`
            );
            enhancedError.stack = (error as Error).stack;
            (enhancedError as any).originalError = error;
            (enhancedError as any).boundary = request.boundary;
            throw enhancedError;
        }
    }

    /**
     * Subscribe to events using async iteration (for await...of)
     * @param request The subscription request
     * @param onEvent Event handler function
     * @param onError Optional error handler function
     * @returns gRPC stream that can be cancelled
     */
    subscribeToEvents(
        request: SubscribeRequest,
        onEvent: (event: Event) => Promise<void>,
        onError?: (error: Error) => void
    ): grpc.ClientReadableStream<any> {
        // Check if client is disposed
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }

        if (!request) {
            throw new Error('SubscribeRequest cannot be null or undefined');
        }

        if (!request.boundary) {
            throw new Error('Boundary is required');
        }

        if (!request.subscriberName) {
            throw new Error('Subscriber name is required');
        }

        if (!onEvent || typeof onEvent !== 'function') {
            throw new Error('Event handler function is required');
        }

        this.logger.debug(`Subscribing with subscriber '${request.subscriberName}' (async)`);

        let stream: grpc.ClientReadableStream<any>;

        try {
            // Subscribe to all events - use plain object
            const grpcRequest: any = {
                subscriber_name: request.subscriberName,
                boundary: request.boundary,
            };

            if (request.afterPosition) {
                grpcRequest.after_position = {
                    commit_position: request.afterPosition.commitPosition,
                    prepare_position: request.afterPosition.preparePosition
                };
            }

            if (request.query) {
                grpcRequest.query = request.query;
            }

            // Create metadata with authentication
            const metadata = this.createAuthMetadata('event subscription');
            stream = this.client.catchUpSubscribeToEvents(grpcRequest, metadata);
            this.setupTokenCaching(stream, 'event subscription response');

        } catch (error) {
            this.logger.error(`Failed to create subscription: `, error);

            // Enhance error with context
            const enhancedError = new Error(
                `Failed to create subscription: ${(error as Error).message}`
            );
            enhancedError.stack = (error as Error).stack;
            (enhancedError as any).originalError = error;
            (enhancedError as any).subscriberName = request.subscriberName;

            throw enhancedError;
        }

        this.logger.debug(`Successfully subscribed to eventstore (async)`);

        // Start async iteration in background
        (async () => {
            try {
                // Use for await...of for cleaner async iteration
                for await (const event of stream) {
                    try {
                        const parsedEvent: Event = {
                            eventId: event.event_id,
                            eventType: event.event_type,
                            data: JSON.parse(event.data),
                            metadata: JSON.parse(event.metadata || '{}'),
                            position: {
                                commitPosition: Number(event.position?.commit_position || '0'),
                                preparePosition: Number(event.position?.prepare_position || '0')
                            },
                            dateCreated: event.date_created ? new Date(Number(event.date_created.seconds) * 1000 + Math.floor(event.date_created.nanos / 1000000)).toISOString() : new Date().toISOString()
                        };

                        // Events are processed sequentially with await
                        await onEvent(parsedEvent);
                    } catch (parseError) {
                        this.logger.error(`Failed to parse event data or metadata: ${(parseError as Error).message}`);

                        // Call error handler with enhanced error
                        const enhancedError = new Error(
                            `Failed to parse event: ${(parseError as Error).message}`
                        );
                        enhancedError.stack = (parseError as Error).stack;
                        (enhancedError as any).originalError = parseError;
                        (enhancedError as any).eventId = event.eventId;
                        (enhancedError as any).eventType = event.eventType;

                        if (onError) {
                            onError(enhancedError);
                        } else {
                            this.logger.error('Subscription parse error:', enhancedError);
                        }
                    }
                }

                this.logger.debug(`Subscription ended (async)`);
            } catch (error) {
                this.logger.error(`Subscription error:`, error);

                // Enhance error with context
                const enhancedError = new Error(
                    `Subscription error: ${(error as Error).message}`
                );
                enhancedError.stack = (error as Error).stack;
                (enhancedError as any).originalError = error;
                (enhancedError as any).subscriberName = request.subscriberName;

                if (onError) {
                    onError(enhancedError);
                } else {
                    this.logger.error('Unhandled subscription error:', enhancedError);
                }
            }
        })();

        return stream;
    }

    /**
     * Close the client connection and clean up resources
     */
    close(): void {
        if (this.disposed) {
            this.logger.debug('EventStoreClient already disposed');
            return;
        }

        this.logger.debug('Closing EventStoreClient connection');

        try {
            // No rate limiter or circuit breaker to clean up

            // In newer versions of gRPC, we need to close the channel
            if (this.client && typeof this.client.close === 'function') {
                this.client.close();
            } else if (this.client && (this.client as any).channel) {
                // Try to close the underlying channel
                const channel = (this.client as any).channel;
                if (typeof channel.close === 'function') {
                    channel.close();
                }
            }

            this.disposed = true;
            this.logger.debug('EventStoreClient connection closed successfully');
        } catch (error) {
            this.logger.error('Error closing EventStoreClient connection:', error);
            throw new Error(`Failed to close EventStoreClient: ${(error as Error).message}`);
        }
    }

    /**
     * Ping the server to check connectivity
     * @returns Promise<void> Resolves if the server responds successfully
     */
    async ping(): Promise<void> {
        // Check if client is disposed
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }

        this.logger.debug('Pinging server');

        try {
            // Create metadata with authentication
            const metadata = this.createAuthMetadata('ping');

            // Use callback-based API to access response headers
            const response = await new Promise<any>((resolve, reject) => {
                const call = this.client.ping({}, metadata, (error: any, response: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    setTimeout(() => {
                            resolve(response);
                        },
                        1000
                    );
                });

                // Set up token caching from response metadata
                this.setupTokenCaching(call, 'ping response');
            });

            this.logger.debug('Ping successful');
        } catch (error) {
            this.logger.error('Ping failed:', error);
            throw new Error(`Ping failed: ${(error as Error).message}`);
        }
    }

    /**
     * Return build, backend, node identity, and capability information for the
     * server that handles this call.
     */
    async getServerInfo(): Promise<ServerInfo> {
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }

        try {
            const metadata = this.createAuthMetadata('get server info');
            const response = await new Promise<any>((resolve, reject) => {
                const call = this.client.getServerInfo({}, metadata, (error: any, value: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(value);
                });

                this.setupTokenCaching(call, 'get server info response');
            });

            return {
                version: response.version,
                gitCommit: response.git_commit,
                buildTime: response.build_time,
                backend: response.backend as StorageBackend,
                nodeId: response.node_id,
                capabilities: (response.capabilities || []) as ServerCapability[]
            };
        } catch (error) {
            this.logger.error('Failed to get server info:', error);
            throw new Error(`Failed to get server info: ${(error as Error).message}`);
        }
    }

    async createIndex(request: CreateIndexRequest): Promise<CreateIndexResponse> {
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }

        if (!request) {
            throw new Error('CreateIndexRequest cannot be null or undefined');
        }

        if (!request.boundary) {
            throw new Error('Boundary is required');
        }

        if (!request.name) {
            throw new Error('Index name is required');
        }

        if (!request.fields || !Array.isArray(request.fields) || request.fields.length === 0) {
            throw new Error('Fields must be a non-empty array');
        }

        this.logger.debug(`Creating index '${request.name}' for boundary '${request.boundary}'`);

        const grpcRequest = {
            boundary: request.boundary,
            name: request.name,
            fields: request.fields.map(f => ({
                json_key: f.jsonKey,
                value_type: f.valueType
            })),
            conditions: (request.conditions || []).map(c => ({
                key: c.key,
                operator: c.operator,
                value: c.value
            })),
            condition_combinator: request.conditionCombinator || ConditionCombinator.AND
        };

        try {
            const metadata = this.createAuthMetadata('create index');

            await new Promise<any>((resolve, reject) => {
                const call = this.client.createIndex(grpcRequest, metadata, (error: any, response: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(response);
                });

                this.setupTokenCaching(call, 'create index response');
            });

            this.logger.info(`Successfully created index '${request.name}' for boundary '${request.boundary}'`);
            return {};
        } catch (error) {
            this.logger.error(`Failed to create index:`, error);
            throw new Error(`Failed to create index: ${(error as Error).message}`);
        }
    }

    async dropIndex(request: DropIndexRequest): Promise<DropIndexResponse> {
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }

        if (!request) {
            throw new Error('DropIndexRequest cannot be null or undefined');
        }

        if (!request.boundary) {
            throw new Error('Boundary is required');
        }

        if (!request.name) {
            throw new Error('Index name is required');
        }

        this.logger.debug(`Dropping index '${request.name}' for boundary '${request.boundary}'`);

        try {
            const metadata = this.createAuthMetadata('drop index');

            await new Promise<any>((resolve, reject) => {
                const call = this.client.dropIndex({
                    boundary: request.boundary,
                    name: request.name
                }, metadata, (error: any, response: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(response);
                });

                this.setupTokenCaching(call, 'drop index response');
            });

            this.logger.info(`Successfully dropped index '${request.name}' for boundary '${request.boundary}'`);
            return {};
        } catch (error) {
            this.logger.error(`Failed to drop index:`, error);
            throw new Error(`Failed to drop index: ${(error as Error).message}`);
        }
    }

    async listIndexes(boundary: string): Promise<ListIndexesResponse> {
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }
        if (!boundary) {
            throw new Error('Boundary is required');
        }
        try {
            const metadata = this.createAuthMetadata('list indexes');
            const response = await new Promise<any>((resolve, reject) => {
                const call = this.client.listIndexes({boundary}, metadata, (error: any, value: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(value);
                });
                this.setupTokenCaching(call, 'list indexes response');
            });
            return {
                indexes: (response.indexes || []).map((index: any) => this.mapIndexDefinition(index))
            };
        } catch (error) {
            this.logger.error('Failed to list indexes:', error);
            throw new Error(`Failed to list indexes: ${(error as Error).message}`);
        }
    }

    async getIndex(boundary: string, name: string): Promise<GetIndexResponse> {
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }
        if (!boundary) {
            throw new Error('Boundary is required');
        }
        if (!name) {
            throw new Error('Index name is required');
        }
        try {
            const metadata = this.createAuthMetadata('get index');
            const response = await new Promise<any>((resolve, reject) => {
                const call = this.client.getIndex({boundary, name}, metadata, (error: any, value: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(value);
                });
                this.setupTokenCaching(call, 'get index response');
            });
            return {index: this.mapIndexDefinition(response.index)};
        } catch (error) {
            this.logger.error('Failed to get index:', error);
            throw new Error(`Failed to get index: ${(error as Error).message}`);
        }
    }

    private mapIndexDefinition(index: any): IndexDefinition {
        return {
            name: index.name,
            fields: (index.fields || []).map((field: any) => ({
                jsonKey: field.json_key,
                valueType: field.value_type as ValueType
            })),
            conditions: (index.conditions || []).map((condition: any) => ({
                key: condition.key,
                operator: condition.operator,
                value: condition.value
            })),
            conditionCombinator: index.condition_combinator as ConditionCombinator,
            state: index.state as IndexState
        };
    }

    /**
     * Check if the client is connected to the server
     * @returns Promise<boolean> True if connected, false otherwise
     */
    async healthCheck(): Promise<boolean> {
        // Check if client is disposed
        if (this.disposed) {
            throw new Error('Client has been disposed');
        }

        this.logger.debug('Performing health check');

        try {
            // Use ping instead of getEvents for health check
            await this.ping();

            // Try to make a simple call to test connectivity
            await this.getEvents({
                boundary: 'orisun_admin',
                count: 1
            });
            this.logger.debug('Health check successful');
            return true;
        } catch (error) {
            this.logger.warn('Health check failed:', error);
            return false;
        }
    }
}
