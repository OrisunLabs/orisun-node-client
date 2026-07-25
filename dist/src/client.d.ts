import * as grpc from '@grpc/grpc-js';
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
export declare enum ValueType {
    TEXT = "TEXT",
    NUMERIC = "NUMERIC",
    BOOLEAN = "BOOLEAN",
    TIMESTAMPTZ = "TIMESTAMPTZ"
}
export declare enum ConditionCombinator {
    AND = "AND",
    OR = "OR"
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
export declare enum IndexState {
    UNSPECIFIED = "INDEX_STATE_UNSPECIFIED",
    BUILDING = "INDEX_STATE_BUILDING",
    READY = "INDEX_STATE_READY"
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
export declare enum StorageBackend {
    UNSPECIFIED = "STORAGE_BACKEND_UNSPECIFIED",
    POSTGRES = "STORAGE_BACKEND_POSTGRES",
    SQLITE = "STORAGE_BACKEND_SQLITE",
    FOUNDATIONDB = "STORAGE_BACKEND_FOUNDATIONDB"
}
export declare enum ServerCapability {
    UNSPECIFIED = "SERVER_CAPABILITY_UNSPECIFIED",
    COMMAND_CONTEXT_CONSISTENCY = "SERVER_CAPABILITY_COMMAND_CONTEXT_CONSISTENCY",
    CATCH_UP_SUBSCRIPTIONS = "SERVER_CAPABILITY_CATCH_UP_SUBSCRIPTIONS",
    INDEX_MANAGEMENT = "SERVER_CAPABILITY_INDEX_MANAGEMENT",
    BOUNDARY_CATALOG = "SERVER_CAPABILITY_BOUNDARY_CATALOG",
    GRPC_HEALTH = "SERVER_CAPABILITY_GRPC_HEALTH"
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
 * orisun client operations
 */
export declare class EventStoreClient {
    private client;
    private channel;
    private logger;
    private credentials?;
    private disposed;
    private cachedToken?;
    constructor(options?: EventStoreClientOptions);
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
    private mapEvent;
    /**
     * Save events to a stream
     * @throws {Error} If the request is invalid or the operation fails
     * @returns {Promise<WriteResult>} The write result containing the log position
     */
    saveEvents(request: SaveEventsRequest): Promise<WriteResult>;
    /**
     * Get events from a stream
     * @throws {Error} If the request is invalid or the operation fails
     */
    getEvents(request: GetEventsRequest): Promise<Event[]>;
    /**
     * Get the latest event matching each criterion from one server-side read snapshot.
     *
     * Use the returned contextPosition as SaveEvents.query.expectedPosition with
     * the same combined criteria. Independent getEvents calls are not equivalent
     * for multi-criterion command contexts because they observe separate snapshots.
     */
    getLatestByCriteria(request: GetLatestByCriteriaRequest): Promise<GetLatestByCriteriaResponse>;
    /**
     * Subscribe to events using async iteration (for await...of)
     * @param request The subscription request
     * @param onEvent Event handler function
     * @param onError Optional error handler function
     * @returns gRPC stream that can be cancelled
     */
    subscribeToEvents(request: SubscribeRequest, onEvent: (event: Event) => Promise<void>, onError?: (error: Error) => void): grpc.ClientReadableStream<any>;
    /**
     * Close the client connection and clean up resources
     */
    close(): void;
    /**
     * Ping the server to check connectivity
     * @returns Promise<void> Resolves if the server responds successfully
     */
    ping(): Promise<void>;
    /**
     * Return build, backend, node identity, and capability information for the
     * server that handles this call.
     */
    getServerInfo(): Promise<ServerInfo>;
    createIndex(request: CreateIndexRequest): Promise<CreateIndexResponse>;
    dropIndex(request: DropIndexRequest): Promise<DropIndexResponse>;
    listIndexes(boundary: string): Promise<ListIndexesResponse>;
    getIndex(boundary: string, name: string): Promise<GetIndexResponse>;
    private mapIndexDefinition;
    /**
     * Check if the client is connected to the server
     * @returns Promise<boolean> True if connected, false otherwise
     */
    healthCheck(): Promise<boolean>;
}
//# sourceMappingURL=client.d.ts.map