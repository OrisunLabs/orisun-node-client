"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const grpc = __importStar(require("@grpc/grpc-js"));
// Mock gRPC and protobuf modules
const mockSaveEvents = jest.fn();
const mockGetEvents = jest.fn();
const mockGetLatestByCriteria = jest.fn();
const mockCatchUpSubscribeToEvents = jest.fn();
const mockPing = jest.fn();
const mockGetServerInfo = jest.fn();
const mockEventStoreClient = {
    saveEvents: mockSaveEvents,
    getEvents: mockGetEvents,
    getLatestByCriteria: mockGetLatestByCriteria,
    catchUpSubscribeToEvents: mockCatchUpSubscribeToEvents,
    ping: mockPing,
    getServerInfo: mockGetServerInfo,
};
const mockClient = jest.fn().mockImplementation(() => mockEventStoreClient);
jest.mock('@grpc/grpc-js', () => ({
    credentials: {
        createInsecure: jest.fn(() => 'mock-credentials')
    },
    loadPackageDefinition: jest.fn(() => ({
        orisun: {
            EventStore: mockClient
        }
    })),
    Metadata: jest.fn().mockImplementation(() => {
        const metadata = {};
        return {
            add: jest.fn((key, value) => {
                if (!metadata[key]) {
                    metadata[key] = [];
                }
                metadata[key].push(value);
            }),
            get: jest.fn((key) => metadata[key] || [])
        };
    })
}));
jest.mock('@grpc/proto-loader', () => ({
    loadSync: jest.fn(() => 'mock-package-definition')
}));
// Setup mock implementations
beforeEach(() => {
    mockSaveEvents.mockImplementation((request, metadata, callback) => {
        callback(null, {
            log_position: {
                commit_position: '123',
                prepare_position: '123'
            },
            new_stream_version: '123'
        });
    });
    mockGetEvents.mockImplementation((request, metadata, callback) => {
        // Return a mock call object with an 'on' method
        const mockCall = {
            on: jest.fn((event, handler) => {
                if (event === 'metadata') {
                    // Call the handler with empty metadata
                    handler(new grpc.Metadata());
                }
            })
        };
        // For health check, return empty events array
        if (request.stream && request.stream.name === 'health-check') {
            callback(null, { events: [] });
        }
        else {
            callback(null, {
                events: [
                    {
                        event_id: 'test-event-1',
                        event_type: 'TestEvent',
                        data: JSON.stringify({ test: 'data' }),
                        metadata: JSON.stringify({ source: 'test' }),
                        stream_id: 'test-stream',
                        position: { commit_position: '0', prepare_position: '0' },
                        date_created: { seconds: '1704067200', nanos: 0 }
                    }
                ]
            });
        }
        return mockCall;
    });
    mockGetLatestByCriteria.mockImplementation((request, metadata, callback) => {
        const mockCall = {
            on: jest.fn((event, handler) => {
                if (event === 'metadata') {
                    handler(new grpc.Metadata());
                }
            })
        };
        callback(null, {
            results: [
                {
                    criterion: request.criteria[0],
                    event: {
                        event_id: 'acct-1-balance',
                        event_type: 'MoneyCredited',
                        data: JSON.stringify({ account_id: 'acct-1', balance: 100 }),
                        metadata: JSON.stringify({ source: 'test' }),
                        position: { commit_position: '12', prepare_position: '12' },
                        date_created: { seconds: '1704067200', nanos: 0 }
                    }
                },
                {
                    criterion: request.criteria[1]
                }
            ],
            context_position: { commit_position: '12', prepare_position: '12' }
        });
        return mockCall;
    });
    mockCatchUpSubscribeToEvents.mockReturnValue({
        on: jest.fn(),
        cancel: jest.fn()
    });
    mockCatchUpSubscribeToEvents.mockReturnValue({
        on: jest.fn(),
        cancel: jest.fn()
    });
    mockPing.mockImplementation((request, metadata, callback) => {
        // Return a mock call object with an 'on' method
        const mockCall = {
            on: jest.fn((event, handler) => {
                if (event === 'metadata') {
                    // Call the handler with empty metadata
                    handler(new grpc.Metadata());
                }
            })
        };
        callback(null, {});
        return mockCall;
    });
    mockGetServerInfo.mockImplementation((request, metadata, callback) => {
        const mockCall = {
            on: jest.fn()
        };
        callback(null, {
            version: '0.10.0',
            git_commit: 'abc123',
            build_time: '2026-07-25T12:00:00Z',
            backend: 'STORAGE_BACKEND_SQLITE',
            node_id: 'node-1',
            capabilities: [
                'SERVER_CAPABILITY_COMMAND_CONTEXT_CONSISTENCY',
                'SERVER_CAPABILITY_GRPC_HEALTH'
            ]
        });
        return mockCall;
    });
});
describe('EventStoreClient', () => {
    let client;
    beforeEach(() => {
        client = new src_1.EventStoreClient({
            host: 'localhost',
            port: 5005,
            username: 'test',
            password: 'test'
        });
    });
    afterEach(() => {
        client.close();
    });
    describe('constructor', () => {
        it('should create client with default options', () => {
            const defaultClient = new src_1.EventStoreClient({ host: 'localhost', port: 5005 });
            expect(defaultClient).toBeInstanceOf(src_1.EventStoreClient);
            defaultClient.close();
        });
        it('should create client with custom options', () => {
            expect(client).toBeInstanceOf(src_1.EventStoreClient);
        });
        it('should create client with keep-alive options', () => {
            const clientWithKeepalive = new src_1.EventStoreClient({
                host: 'localhost',
                port: 5005,
                username: 'test',
                password: 'test',
            });
            expect(clientWithKeepalive).toBeInstanceOf(src_1.EventStoreClient);
            clientWithKeepalive.close();
        });
        it('should configure high-throughput gRPC channel defaults', () => {
            const tunedClient = new src_1.EventStoreClient({
                host: 'localhost',
                port: 5005,
                username: 'test',
                password: 'test',
            });
            const channelOptions = mockClient.mock.calls[mockClient.mock.calls.length - 1][2];
            expect(channelOptions).toMatchObject({
                'grpc.max_receive_message_length': 100 * 1024 * 1024,
                'grpc.max_send_message_length': 100 * 1024 * 1024,
                'grpc-node.flow_control_window': 1024 * 1024,
                'grpc.lb_policy_name': 'round_robin',
            });
            tunedClient.close();
        });
        it('should allow gRPC channel option overrides', () => {
            const tunedClient = new src_1.EventStoreClient({
                host: 'localhost',
                port: 5005,
                username: 'test',
                password: 'test',
                channelOptions: {
                    'grpc-node.flow_control_window': 2 * 1024 * 1024,
                },
            });
            const channelOptions = mockClient.mock.calls[mockClient.mock.calls.length - 1][2];
            expect(channelOptions['grpc-node.flow_control_window']).toBe(2 * 1024 * 1024);
            tunedClient.close();
        });
        it('should create client with load balancing options', () => {
            const clientWithLoadBalancing = new src_1.EventStoreClient({
                host: 'localhost',
                port: 5005,
                username: 'test',
                password: 'test',
                loadBalancingPolicy: 'round_robin'
            });
            expect(clientWithLoadBalancing).toBeInstanceOf(src_1.EventStoreClient);
            clientWithLoadBalancing.close();
        });
        it('should create client with comma-separated hosts for load balancing', () => {
            const clientWithMultipleHosts = new src_1.EventStoreClient({
                host: 'host1.example.com,host2.example.com,host3.example.com',
                port: 5005,
                username: 'test',
                password: 'test'
            });
            expect(clientWithMultipleHosts).toBeInstanceOf(src_1.EventStoreClient);
            clientWithMultipleHosts.close();
        });
        it('should create client with target string for DNS-based load balancing', () => {
            const clientWithTarget = new src_1.EventStoreClient({
                target: 'dns:///eventstore.example.com:5005',
                username: 'test',
                password: 'test'
            });
            expect(clientWithTarget).toBeInstanceOf(src_1.EventStoreClient);
            clientWithTarget.close();
        });
    });
    var firstSaveResponse;
    describe('saveEvents', () => {
        it('should save events successfully', async () => {
            const request = {
                query: {
                    expectedPosition: {
                        commitPosition: -1,
                        preparePosition: -1
                    },
                },
                events: [
                    {
                        eventId: 'test-event-1',
                        eventType: 'TestEvent',
                        data: { test: 'data' },
                        metadata: { source: 'test' }
                    }
                ],
                boundary: 'test-boundary'
            };
            firstSaveResponse = await client.saveEvents(request);
            expect(firstSaveResponse).toBeDefined();
            expect(firstSaveResponse.logPosition).toBeDefined();
            expect(firstSaveResponse.logPosition.commitPosition).toBe(123);
            expect(firstSaveResponse.logPosition.preparePosition).toBe(123);
        });
        it('should save events with subsetQuery successfully', async () => {
            const request = {
                query: {
                    expectedPosition: firstSaveResponse.logPosition,
                    subsetQuery: {
                        criteria: [
                            {
                                tags: [
                                    { key: 'category', value: 'test' }
                                ]
                            }
                        ]
                    }
                },
                events: [
                    {
                        eventId: 'test-event-1',
                        eventType: 'TestEvent',
                        data: { test: 'data' },
                        metadata: { source: 'test' }
                    }
                ],
                boundary: 'test-boundary'
            };
            const result = await client.saveEvents(request);
            expect(result).toBeDefined();
            expect(result.logPosition).toBeDefined();
            expect(result.logPosition.commitPosition).toBe(123);
            expect(result.logPosition.preparePosition).toBe(123);
            // Verify that the mock was called with the correct subsetQuery field
            expect(mockSaveEvents).toHaveBeenLastCalledWith(expect.objectContaining({
                query: expect.objectContaining({
                    subsetQuery: request.query.subsetQuery
                })
            }), expect.any(Object), expect.any(Function));
        });
    });
    describe('getEvents', () => {
        it('should retrieve events successfully', async () => {
            const request = {
                stream: {
                    name: 'test-stream'
                },
                boundary: 'test-boundary'
            };
            const events = await client.getEvents(request);
            expect(events).toHaveLength(1);
            expect(events[0]).toEqual({
                eventId: 'test-event-1',
                eventType: 'TestEvent',
                data: { test: 'data' },
                metadata: { source: 'test' },
                position: {
                    commitPosition: 0,
                    preparePosition: 0
                },
                dateCreated: '2024-01-01T00:00:00.000Z'
            });
        });
        it('should handle position paging parameters', async () => {
            const request = {
                fromPosition: { commitPosition: 1, preparePosition: 1 },
                count: 5,
                direction: 'ASC',
                boundary: 'test-boundary'
            };
            const events = await client.getEvents(request);
            expect(events).toHaveLength(1);
        });
    });
    describe('getLatestByCriteria', () => {
        it('should retrieve the latest event per criterion with context position', async () => {
            const response = await client.getLatestByCriteria({
                boundary: 'accounts',
                criteria: [
                    { tags: [{ key: 'account_id', value: 'acct-1' }] },
                    { tags: [{ key: 'account_id', value: 'acct-2' }] }
                ]
            });
            expect(response.contextPosition).toEqual({
                commitPosition: 12,
                preparePosition: 12
            });
            expect(response.results).toHaveLength(2);
            expect(response.results[0].event).toEqual({
                eventId: 'acct-1-balance',
                eventType: 'MoneyCredited',
                data: { account_id: 'acct-1', balance: 100 },
                metadata: { source: 'test' },
                position: {
                    commitPosition: 12,
                    preparePosition: 12
                },
                dateCreated: '2024-01-01T00:00:00.000Z'
            });
            expect(response.results[1].event).toBeUndefined();
            expect(mockGetLatestByCriteria).toHaveBeenLastCalledWith(expect.objectContaining({
                boundary: 'accounts',
                criteria: [
                    { tags: [{ key: 'account_id', value: 'acct-1' }] },
                    { tags: [{ key: 'account_id', value: 'acct-2' }] }
                ]
            }), expect.any(Object), expect.any(Function));
        });
        it('should reject empty latest-by-criteria requests', async () => {
            await expect(client.getLatestByCriteria({
                boundary: 'accounts',
                criteria: []
            })).rejects.toThrow('At least one criterion is required');
        });
    });
    describe('subscribeToEvents', () => {
        it('should create subscription successfully', () => {
            const request = {
                subscriberName: 'test-subscriber',
                stream: 'test-stream',
                boundary: 'test-boundary'
            };
            const onEvent = jest.fn();
            const onError = jest.fn();
            const subscription = client.subscribeToEvents({
                subscriberName: 'test-subscriber',
                boundary: 'test-boundary'
            }, onEvent, onError);
            expect(subscription).toBeDefined();
            expect(typeof subscription).toBe('object');
            expect(subscription.cancel).toBeDefined();
            expect(typeof subscription.cancel).toBe('function');
        });
        it('should handle subscription without stream', () => {
            const request = {
                afterPosition: { commitPosition: 100, preparePosition: 100 },
                boundary: 'test-boundary'
            };
            const onEvent = jest.fn();
            const subscription = client.subscribeToEvents({
                subscriberName: 'test-subscriber',
                afterPosition: { commitPosition: 100, preparePosition: 100 },
                boundary: 'test-boundary'
            }, onEvent);
            expect(subscription).toBeDefined();
            expect(subscription.cancel).toBeDefined();
            expect(typeof subscription.cancel).toBe('function');
        });
        it('should allow cancelling subscription', () => {
            const mockStream = {
                on: jest.fn(),
                cancel: jest.fn()
            };
            mockCatchUpSubscribeToEvents.mockReturnValue(mockStream);
            const onEvent = jest.fn();
            const subscription = client.subscribeToEvents({
                subscriberName: 'test-subscriber',
                boundary: 'test-boundary'
            }, onEvent);
            expect(subscription.cancel).toBeDefined();
            // Call cancel
            subscription.cancel();
            // Verify that the stream's cancel method was called
            expect(mockStream.cancel).toHaveBeenCalled();
        });
    });
    describe('ping', () => {
        it('should ping successfully', async () => {
            await expect(client.ping()).resolves.not.toThrow();
            // Check that mock was called (the exact call signature depends on promisify implementation)
            expect(mockPing).toHaveBeenCalled();
        });
        it('should use basic auth for initial ping', async () => {
            await client.ping();
            // Check that the metadata contains authorization header
            const metadataCall = mockPing.mock.calls[mockPing.mock.calls.length - 1][1];
            expect(metadataCall.get).toBeDefined();
            expect(metadataCall.get('authorization')).toContain('Basic dGVzdDp0ZXN0'); // base64 of 'test:test'
        });
        it('should use cached token for subsequent pings', async () => {
            // First call to establish token - we need to manually set the cached token
            // since our mock doesn't properly simulate the response metadata extraction
            const clientInstance = client;
            clientInstance.cachedToken = 'cached-token-123';
            // Second call should use cached token
            mockPing.mockImplementationOnce((request, metadata, callback) => {
                // Check that metadata contains cached token
                expect(metadata.get('x-auth-token')).toContain('cached-token-123');
                // Return a mock call object with an 'on' method
                const mockCall = {
                    on: jest.fn((event, handler) => {
                        if (event === 'metadata') {
                            // Call the handler with empty metadata
                            handler(new grpc.Metadata());
                        }
                    })
                };
                callback(null, {});
                return mockCall;
            });
            await client.ping();
        });
    });
    describe('getServerInfo', () => {
        it('maps the server information response', async () => {
            await expect(client.getServerInfo()).resolves.toEqual({
                version: '0.10.0',
                gitCommit: 'abc123',
                buildTime: '2026-07-25T12:00:00Z',
                backend: src_1.StorageBackend.SQLITE,
                nodeId: 'node-1',
                capabilities: [
                    src_1.ServerCapability.COMMAND_CONTEXT_CONSISTENCY,
                    src_1.ServerCapability.GRPC_HEALTH
                ]
            });
            expect(mockGetServerInfo).toHaveBeenCalled();
        });
    });
    describe('token caching', () => {
        it('should cache token from saveEvents response', async () => {
            // Mock saveEvents to return token in response metadata
            mockSaveEvents.mockImplementationOnce((request, metadata, callback) => {
                const responseMetadata = {
                    get: jest.fn((key) => {
                        if (key === 'x-auth-token') {
                            return ['save-events-token'];
                        }
                        return [];
                    })
                };
                // Mock call object with 'on' method
                const mockCall = {
                    on: jest.fn((event, handler) => {
                        if (event === 'metadata') {
                            // Call the handler with the response metadata
                            handler(responseMetadata);
                        }
                    })
                };
                callback(null, {
                    log_position: {
                        commit_position: '123',
                        prepare_position: '123'
                    }
                });
                return mockCall;
            });
            const request = {
                query: {
                    expectedPosition: {
                        commitPosition: -1,
                        preparePosition: -1
                    },
                },
                events: [
                    {
                        eventId: 'test-event-1',
                        eventType: 'TestEvent',
                        data: { test: 'data' },
                        metadata: { source: 'test' }
                    }
                ],
                boundary: 'test-boundary'
            };
            await client.saveEvents(request);
            // Verify next call uses cached token
            mockSaveEvents.mockImplementationOnce((request, metadata, callback) => {
                expect(metadata.get('x-auth-token')).toContain('save-events-token');
                callback(null, {
                    log_position: {
                        commit_position: '124',
                        prepare_position: '124'
                    }
                });
            });
            await client.saveEvents(request);
        });
        it('should cache token from getEvents response', async () => {
            // Mock getEvents to return token in response metadata
            mockGetEvents.mockImplementationOnce((request, metadata, callback) => {
                const responseMetadata = {
                    get: jest.fn((key) => {
                        if (key === 'x-auth-token') {
                            return ['get-events-token'];
                        }
                        return [];
                    })
                };
                // Mock call object with 'on' method
                const mockCall = {
                    on: jest.fn((event, handler) => {
                        if (event === 'metadata') {
                            // Call the handler with the response metadata
                            handler(responseMetadata);
                        }
                    })
                };
                callback(null, {
                    events: [
                        {
                            event_id: 'test-event-1',
                            event_type: 'TestEvent',
                            data: JSON.stringify({ test: 'data' }),
                            metadata: JSON.stringify({ source: 'test' }),
                            position: { commit_position: '0', prepare_position: '0' },
                            date_created: { seconds: '1704067200', nanos: 0 }
                        }
                    ]
                });
                return mockCall;
            });
            const request = {
                boundary: 'test-boundary'
            };
            await client.getEvents(request);
            // Verify next call uses cached token
            mockGetEvents.mockImplementationOnce((request, metadata, callback) => {
                expect(metadata.get('x-auth-token')).toContain('get-events-token');
                callback(null, { events: [] });
            });
            await client.getEvents(request);
        });
        it('should cache token from getLatestByCriteria response', async () => {
            mockGetLatestByCriteria.mockImplementationOnce((request, metadata, callback) => {
                const responseMetadata = {
                    get: jest.fn((key) => {
                        if (key === 'x-auth-token') {
                            return ['latest-token'];
                        }
                        return [];
                    })
                };
                const mockCall = {
                    on: jest.fn((event, handler) => {
                        if (event === 'metadata') {
                            handler(responseMetadata);
                        }
                    })
                };
                callback(null, {
                    results: [],
                    context_position: { commit_position: '-1', prepare_position: '-1' }
                });
                return mockCall;
            });
            const request = {
                boundary: 'accounts',
                criteria: [{ tags: [{ key: 'account_id', value: 'acct-1' }] }]
            };
            await client.getLatestByCriteria(request);
            mockGetLatestByCriteria.mockImplementationOnce((request, metadata, callback) => {
                expect(metadata.get('x-auth-token')).toContain('latest-token');
                callback(null, {
                    results: [],
                    context_position: { commit_position: '-1', prepare_position: '-1' }
                });
            });
            await client.getLatestByCriteria(request);
        });
        it('should use cached token for subscriptions', async () => {
            // First, establish a cached token by calling saveEvents
            mockSaveEvents.mockImplementationOnce((request, metadata, callback) => {
                const responseMetadata = {
                    get: jest.fn((key) => {
                        if (key === 'x-auth-token') {
                            return ['subscription-token'];
                        }
                        return [];
                    })
                };
                // Mock call object with 'on' method
                const mockCall = {
                    on: jest.fn((event, handler) => {
                        if (event === 'metadata') {
                            // Call the handler with the response metadata
                            handler(responseMetadata);
                        }
                    })
                };
                callback(null, {
                    log_position: {
                        commit_position: '123',
                        prepare_position: '123'
                    }
                });
                return mockCall;
            });
            const saveRequest = {
                query: {
                    expectedPosition: {
                        commitPosition: -1,
                        preparePosition: -1
                    },
                },
                events: [
                    {
                        eventId: 'test-event-1',
                        eventType: 'TestEvent',
                        data: { test: 'data' },
                        metadata: { source: 'test' }
                    }
                ],
                boundary: 'test-boundary'
            };
            // Make the saveEvents call to establish the token
            await client.saveEvents(saveRequest);
            // Now test subscription with cached token
            mockCatchUpSubscribeToEvents.mockImplementationOnce((request, metadata) => {
                expect(metadata.get('x-auth-token')).toContain('subscription-token');
                return {
                    on: jest.fn(),
                    cancel: jest.fn()
                };
            });
            const onEvent = jest.fn();
            client.subscribeToEvents({
                subscriberName: 'test-subscriber',
                boundary: 'test-boundary'
            }, onEvent);
        });
    });
    describe('healthCheck', () => {
        it('should return true for successful connection', async () => {
            const isHealthy = await client.healthCheck();
            expect(isHealthy).toBe(true);
        });
        it('should use ping for health check', async () => {
            await client.healthCheck();
            expect(mockPing).toHaveBeenCalled();
        });
    });
    describe('close', () => {
        it('should close client connection', () => {
            expect(() => client.close()).not.toThrow();
        });
    });
});
//# sourceMappingURL=client.test.js.map