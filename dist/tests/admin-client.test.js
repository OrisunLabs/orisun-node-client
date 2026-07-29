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
const mockCreateUser = jest.fn();
const mockDeleteUser = jest.fn();
const mockChangePassword = jest.fn();
const mockSetUserBoundaryPermissions = jest.fn();
const mockListUsers = jest.fn();
const mockValidateCredentials = jest.fn();
const mockGetUserCount = jest.fn();
const mockGetEventCount = jest.fn();
const mockCreateBoundary = jest.fn();
const mockListBoundaries = jest.fn();
const mockGetBoundary = jest.fn();
const mockAdminClient = {
    createUser: mockCreateUser,
    deleteUser: mockDeleteUser,
    changePassword: mockChangePassword,
    setUserBoundaryPermissions: mockSetUserBoundaryPermissions,
    listUsers: mockListUsers,
    validateCredentials: mockValidateCredentials,
    getUserCount: mockGetUserCount,
    getEventCount: mockGetEventCount,
    createBoundary: mockCreateBoundary,
    listBoundaries: mockListBoundaries,
    getBoundary: mockGetBoundary,
};
const mockClient = jest.fn().mockImplementation(() => mockAdminClient);
jest.mock('@grpc/grpc-js', () => ({
    credentials: {
        createInsecure: jest.fn(() => 'mock-credentials')
    },
    loadPackageDefinition: jest.fn(() => ({
        orisun: {
            Admin: mockClient
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
const mockUser = {
    userId: 'user-123',
    name: 'Test User',
    username: 'testuser',
    roles: ['admin', 'user'],
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    updatedAt: new Date('2024-01-01T00:00:00.000Z')
};
beforeEach(() => {
    mockCreateUser.mockImplementation((request, metadata, callback) => {
        const mockCall = {
            on: jest.fn((event, handler) => {
                if (event === 'metadata') {
                    handler(new grpc.Metadata());
                }
            })
        };
        callback(null, {
            user: {
                user_id: mockUser.userId,
                name: mockUser.name,
                username: mockUser.username,
                roles: mockUser.roles,
                created_at: { seconds: '1704067200', nanos: 0 },
                updated_at: { seconds: '1704067200', nanos: 0 }
            }
        });
        return mockCall;
    });
    mockDeleteUser.mockImplementation((request, metadata, callback) => {
        const mockCall = {
            on: jest.fn((event, handler) => {
                if (event === 'metadata') {
                    handler(new grpc.Metadata());
                }
            })
        };
        callback(null, { success: true });
        return mockCall;
    });
    mockChangePassword.mockImplementation((request, metadata, callback) => {
        const mockCall = {
            on: jest.fn((event, handler) => {
                if (event === 'metadata') {
                    handler(new grpc.Metadata());
                }
            })
        };
        callback(null, { success: true });
        return mockCall;
    });
    mockSetUserBoundaryPermissions.mockImplementation((request, metadata, callback) => {
        const mockCall = {
            on: jest.fn((event, handler) => {
                if (event === 'metadata') {
                    handler(new grpc.Metadata());
                }
            })
        };
        callback(null, {
            user: {
                user_id: mockUser.userId,
                name: mockUser.name,
                username: mockUser.username,
                roles: mockUser.roles,
                boundary_permissions: [{
                        boundary: request.boundary,
                        permissions: request.permissions
                    }],
                created_at: { seconds: '1704067200', nanos: 0 },
                updated_at: { seconds: '1704067200', nanos: 0 }
            }
        });
        return mockCall;
    });
    mockListUsers.mockImplementation((request, metadata, callback) => {
        const mockCall = {
            on: jest.fn((event, handler) => {
                if (event === 'metadata') {
                    handler(new grpc.Metadata());
                }
            })
        };
        callback(null, {
            users: [
                {
                    user_id: mockUser.userId,
                    name: mockUser.name,
                    username: mockUser.username,
                    roles: mockUser.roles,
                    created_at: { seconds: '1704067200', nanos: 0 },
                    updated_at: { seconds: '1704067200', nanos: 0 }
                }
            ]
        });
        return mockCall;
    });
    mockValidateCredentials.mockImplementation((request, metadata, callback) => {
        const mockCall = {
            on: jest.fn((event, handler) => {
                if (event === 'metadata') {
                    handler(new grpc.Metadata());
                }
            })
        };
        callback(null, {
            success: true,
            user: {
                user_id: mockUser.userId,
                name: mockUser.name,
                username: mockUser.username,
                roles: mockUser.roles,
                created_at: { seconds: '1704067200', nanos: 0 },
                updated_at: { seconds: '1704067200', nanos: 0 }
            }
        });
        return mockCall;
    });
    mockGetUserCount.mockImplementation((request, metadata, callback) => {
        const mockCall = {
            on: jest.fn((event, handler) => {
                if (event === 'metadata') {
                    handler(new grpc.Metadata());
                }
            })
        };
        callback(null, { count: '5' });
        return mockCall;
    });
    mockGetEventCount.mockImplementation((request, metadata, callback) => {
        const mockCall = {
            on: jest.fn((event, handler) => {
                if (event === 'metadata') {
                    handler(new grpc.Metadata());
                }
            })
        };
        callback(null, { count: '100' });
        return mockCall;
    });
    const boundaryResponse = (existedBeforeCatalog) => ({
        boundary: {
            name: 'sales',
            description: 'Sales domain',
            placement: { backend: 'postgres', namespace: 'tenant_data' },
            status: 'BOUNDARY_LIFECYCLE_STATUS_PROVISIONING',
            existed_before_catalog: existedBeforeCatalog,
            last_error: '',
            definition_position: { commit_position: '12', prepare_position: '13' },
            status_position: { commit_position: '12', prepare_position: '13' }
        }
    });
    const boundaryCall = () => ({ on: jest.fn() });
    mockCreateBoundary.mockImplementation((request, metadata, callback) => {
        callback(null, boundaryResponse(request.existed_before_catalog));
        return boundaryCall();
    });
    mockListBoundaries.mockImplementation((request, metadata, callback) => {
        callback(null, { boundaries: [boundaryResponse(false).boundary] });
        return boundaryCall();
    });
    mockGetBoundary.mockImplementation((request, metadata, callback) => {
        callback(null, boundaryResponse(false));
        return boundaryCall();
    });
});
describe('AdminClient', () => {
    let client;
    beforeEach(() => {
        client = new src_1.AdminClient({
            host: 'localhost',
            port: 5005,
            username: 'admin',
            password: 'changeit'
        });
    });
    describe('boundary management', () => {
        it('creates a boundary through the admin RPC', async () => {
            const response = await client.createBoundary({
                name: 'sales',
                description: 'Sales domain',
                placement: { backend: 'postgres', namespace: 'tenant_data' }
            });
            expect(mockCreateBoundary).toHaveBeenCalled();
            expect(response.boundary.status).toBe('PROVISIONING');
            expect(response.boundary.existedBeforeCatalog).toBe(false);
            expect(response.boundary.definitionPosition).toEqual({ commitPosition: 12, preparePosition: 13 });
        });
        it('records when physical storage predates the catalog', async () => {
            const response = await client.createBoundary({
                name: 'sales',
                placement: { backend: 'postgres', namespace: 'tenant_data' },
                existedBeforeCatalog: true
            });
            const lastCall = mockCreateBoundary.mock.calls[mockCreateBoundary.mock.calls.length - 1];
            expect(lastCall[0].existed_before_catalog).toBe(true);
            expect(response.boundary.existedBeforeCatalog).toBe(true);
        });
        it('validates boundary placement locally', async () => {
            await expect(client.createBoundary({ name: 'sales', placement: { backend: '', namespace: '' } }))
                .rejects.toThrow('Boundary placement backend and namespace are required');
        });
        it('lists boundaries from the catalog', async () => {
            const response = await client.listBoundaries();
            expect(response.boundaries).toHaveLength(1);
            expect(response.boundaries[0].name).toBe('sales');
        });
        it('gets a boundary from the catalog', async () => {
            const response = await client.getBoundary('sales');
            expect(mockGetBoundary.mock.calls[0][0]).toEqual({ name: 'sales' });
            expect(response.boundary.status).toBe('PROVISIONING');
        });
        it('requires a boundary name for get', async () => {
            await expect(client.getBoundary('')).rejects.toThrow('Boundary name is required');
        });
    });
    afterEach(() => {
        client.close();
    });
    describe('constructor', () => {
        it('should create client with default options', () => {
            const defaultClient = new src_1.AdminClient({ host: 'localhost', port: 5005 });
            expect(defaultClient).toBeInstanceOf(src_1.AdminClient);
            defaultClient.close();
        });
        it('should create client with custom options', () => {
            expect(client).toBeInstanceOf(src_1.AdminClient);
        });
        it('should configure high-throughput gRPC channel defaults', () => {
            const tunedClient = new src_1.AdminClient({
                host: 'localhost',
                port: 5005,
                username: 'admin',
                password: 'changeit',
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
            const tunedClient = new src_1.AdminClient({
                host: 'localhost',
                port: 5005,
                username: 'admin',
                password: 'changeit',
                channelOptions: {
                    'grpc-node.flow_control_window': 2 * 1024 * 1024,
                },
            });
            const channelOptions = mockClient.mock.calls[mockClient.mock.calls.length - 1][2];
            expect(channelOptions['grpc-node.flow_control_window']).toBe(2 * 1024 * 1024);
            tunedClient.close();
        });
        it('should create client with load balancing options', () => {
            const clientWithLoadBalancing = new src_1.AdminClient({
                host: 'localhost',
                port: 5005,
                username: 'admin',
                password: 'changeit',
                loadBalancingPolicy: 'round_robin'
            });
            expect(clientWithLoadBalancing).toBeInstanceOf(src_1.AdminClient);
            clientWithLoadBalancing.close();
        });
        it('should create client with comma-separated hosts for load balancing', () => {
            const clientWithMultipleHosts = new src_1.AdminClient({
                host: 'host1.example.com,host2.example.com,host3.example.com',
                port: 5005,
                username: 'admin',
                password: 'changeit'
            });
            expect(clientWithMultipleHosts).toBeInstanceOf(src_1.AdminClient);
            clientWithMultipleHosts.close();
        });
        it('should create client with target string for DNS-based load balancing', () => {
            const clientWithTarget = new src_1.AdminClient({
                target: 'dns:///orisun.example.com:5005',
                username: 'admin',
                password: 'changeit'
            });
            expect(clientWithTarget).toBeInstanceOf(src_1.AdminClient);
            clientWithTarget.close();
        });
        it('should throw error when neither host nor target is provided', () => {
            expect(() => {
                new src_1.AdminClient({ port: 5005 });
            }).toThrow('Either host or target must be provided');
        });
        it('should throw error when host is provided without port', () => {
            expect(() => {
                new src_1.AdminClient({ host: 'localhost' });
            }).toThrow('Port must be provided when using host without target');
        });
        it('should throw error when port is out of range', () => {
            expect(() => {
                new src_1.AdminClient({ host: 'localhost', port: 99999 });
            }).toThrow('Port must be between 1 and 65535');
        });
        it('should throw error when load balancing policy is invalid', () => {
            expect(() => {
                new src_1.AdminClient({
                    host: 'localhost',
                    port: 5005,
                    loadBalancingPolicy: 'invalid'
                });
            }).toThrow('loadBalancingPolicy must be either "round_robin" or "pick_first"');
        });
    });
    describe('createUser', () => {
        it('should create user successfully', async () => {
            const request = {
                name: 'Test User',
                username: 'testuser',
                password: 'password123',
                roles: ['admin', 'user']
            };
            const response = await client.createUser(request);
            expect(response).toBeDefined();
            expect(response.user).toBeDefined();
            expect(response.user.userId).toBe(mockUser.userId);
            expect(response.user.name).toBe(mockUser.name);
            expect(response.user.username).toBe(mockUser.username);
            expect(response.user.roles).toEqual(mockUser.roles);
            expect(response.user.createdAt).toBeInstanceOf(Date);
            expect(response.user.updatedAt).toBeInstanceOf(Date);
        });
        it('should throw error when request is null', async () => {
            await expect(client.createUser(null)).rejects.toThrow('CreateUserRequest cannot be null or undefined');
        });
        it('should throw error when name is missing', async () => {
            const request = {
                username: 'testuser',
                password: 'password123',
                roles: ['admin']
            };
            await expect(client.createUser(request)).rejects.toThrow('Name is required');
        });
        it('should throw error when username is missing', async () => {
            const request = {
                name: 'Test User',
                password: 'password123',
                roles: ['admin']
            };
            await expect(client.createUser(request)).rejects.toThrow('Username is required');
        });
        it('should throw error when password is missing', async () => {
            const request = {
                name: 'Test User',
                username: 'testuser',
                roles: ['admin']
            };
            await expect(client.createUser(request)).rejects.toThrow('Password is required');
        });
        it('should throw error when roles is not an array', async () => {
            const request = {
                name: 'Test User',
                username: 'testuser',
                password: 'password123',
                roles: 'admin'
            };
            await expect(client.createUser(request)).rejects.toThrow('Roles must be an array');
        });
        it('should use basic auth for initial request', async () => {
            await client.createUser({
                name: 'Test User',
                username: 'testuser',
                password: 'password123',
                roles: ['admin']
            });
            const metadataCall = mockCreateUser.mock.calls[0][1];
            expect(metadataCall.get).toBeDefined();
            expect(metadataCall.get('authorization')).toContain('Basic YWRtaW46Y2hhbmdlaXQ='); // base64 of 'admin:changeit'
        });
    });
    describe('deleteUser', () => {
        it('should delete user successfully', async () => {
            const request = {
                userId: 'user-123'
            };
            const response = await client.deleteUser(request);
            expect(response).toBeDefined();
            expect(response.success).toBe(true);
        });
        it('should throw error when request is null', async () => {
            await expect(client.deleteUser(null)).rejects.toThrow('DeleteUserRequest cannot be null or undefined');
        });
        it('should throw error when userId is missing', async () => {
            const request = {};
            await expect(client.deleteUser(request)).rejects.toThrow('User ID is required');
        });
    });
    describe('changePassword', () => {
        it('should change password successfully', async () => {
            const request = {
                userId: 'user-123',
                currentPassword: 'oldpassword',
                newPassword: 'newpassword'
            };
            const response = await client.changePassword(request);
            expect(response).toBeDefined();
            expect(response.success).toBe(true);
        });
        it('should throw error when request is null', async () => {
            await expect(client.changePassword(null)).rejects.toThrow('ChangePasswordRequest cannot be null or undefined');
        });
        it('should throw error when userId is missing', async () => {
            const request = {
                currentPassword: 'old',
                newPassword: 'new'
            };
            await expect(client.changePassword(request)).rejects.toThrow('User ID is required');
        });
        it('should throw error when currentPassword is missing', async () => {
            const request = {
                userId: 'user-123',
                newPassword: 'new'
            };
            await expect(client.changePassword(request)).rejects.toThrow('Current password is required');
        });
        it('should throw error when newPassword is missing', async () => {
            const request = {
                userId: 'user-123',
                currentPassword: 'old'
            };
            await expect(client.changePassword(request)).rejects.toThrow('New password is required');
        });
    });
    describe('setUserBoundaryPermissions', () => {
        it('replaces a boundary grant', async () => {
            const response = await client.setUserBoundaryPermissions({
                userId: 'user-123',
                boundary: 'orders',
                permissions: ['READ', 'APPEND']
            });
            expect(mockSetUserBoundaryPermissions.mock.calls[0][0]).toEqual({
                user_id: 'user-123',
                boundary: 'orders',
                permissions: ['READ', 'APPEND']
            });
            expect(response.user.boundaryPermissions).toEqual([{
                    boundary: 'orders',
                    permissions: ['READ', 'APPEND']
                }]);
        });
        it('accepts an empty permission list to remove a grant', async () => {
            await client.setUserBoundaryPermissions({
                userId: 'user-123',
                boundary: 'orders',
                permissions: []
            });
            const lastCall = mockSetUserBoundaryPermissions.mock.calls[mockSetUserBoundaryPermissions.mock.calls.length - 1];
            expect(lastCall[0].permissions).toEqual([]);
        });
        it('validates the boundary and permission list', async () => {
            await expect(client.setUserBoundaryPermissions({
                userId: 'user-123',
                boundary: '',
                permissions: []
            })).rejects.toThrow('Boundary is required');
            await expect(client.setUserBoundaryPermissions({
                userId: 'user-123',
                boundary: 'orders',
                permissions: null
            })).rejects.toThrow('Permissions must be an array');
        });
    });
    describe('listUsers', () => {
        it('should list users successfully', async () => {
            const response = await client.listUsers();
            expect(response).toBeDefined();
            expect(response.users).toBeDefined();
            expect(response.users).toHaveLength(1);
            expect(response.users[0].userId).toBe(mockUser.userId);
            expect(response.users[0].name).toBe(mockUser.name);
            expect(response.users[0].username).toBe(mockUser.username);
            expect(response.users[0].roles).toEqual(mockUser.roles);
        });
        it('should handle empty request object', async () => {
            const response = await client.listUsers({});
            expect(response).toBeDefined();
            expect(response.users).toBeDefined();
        });
    });
    describe('validateCredentials', () => {
        it('should validate credentials successfully', async () => {
            const request = {
                username: 'testuser',
                password: 'password123'
            };
            const response = await client.validateCredentials(request);
            expect(response).toBeDefined();
            expect(response.success).toBe(true);
            expect(response.user).toBeDefined();
            expect(response.user?.userId).toBe(mockUser.userId);
            expect(response.user?.username).toBe(mockUser.username);
        });
        it('should throw error when request is null', async () => {
            await expect(client.validateCredentials(null)).rejects.toThrow('ValidateCredentialsRequest cannot be null or undefined');
        });
        it('should throw error when username is missing', async () => {
            const request = {
                password: 'password123'
            };
            await expect(client.validateCredentials(request)).rejects.toThrow('Username is required');
        });
        it('should throw error when password is missing', async () => {
            const request = {
                username: 'testuser'
            };
            await expect(client.validateCredentials(request)).rejects.toThrow('Password is required');
        });
        it('should handle unsuccessful validation', async () => {
            mockValidateCredentials.mockImplementationOnce((request, metadata, callback) => {
                const mockCall = {
                    on: jest.fn((event, handler) => {
                        if (event === 'metadata') {
                            handler(new grpc.Metadata());
                        }
                    })
                };
                callback(null, {
                    success: false,
                    user: null
                });
                return mockCall;
            });
            const response = await client.validateCredentials({
                username: 'wronguser',
                password: 'wrongpassword'
            });
            expect(response.success).toBe(false);
            expect(response.user).toBeUndefined();
        });
    });
    describe('getUserCount', () => {
        it('should get user count successfully', async () => {
            const response = await client.getUserCount();
            expect(response).toBeDefined();
            expect(response.count).toBe(5);
        });
        it('should handle empty request object', async () => {
            const response = await client.getUserCount({});
            expect(response).toBeDefined();
            expect(typeof response.count).toBe('number');
        });
    });
    describe('getEventCount', () => {
        it('should get event count successfully', async () => {
            const request = {
                boundary: 'test-boundary'
            };
            const response = await client.getEventCount(request);
            expect(response).toBeDefined();
            expect(response.count).toBe(100);
        });
        it('should throw error when request is null', async () => {
            await expect(client.getEventCount(null)).rejects.toThrow('GetEventCountRequest cannot be null or undefined');
        });
        it('should throw error when boundary is missing', async () => {
            const request = {};
            await expect(client.getEventCount(request)).rejects.toThrow('Boundary is required');
        });
    });
    describe('token caching', () => {
        it('should cache token from createUser response', async () => {
            mockCreateUser.mockImplementationOnce((request, metadata, callback) => {
                const responseMetadata = {
                    get: jest.fn((key) => {
                        if (key === 'x-auth-token') {
                            return ['create-user-token'];
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
                    user: {
                        user_id: mockUser.userId,
                        name: mockUser.name,
                        username: mockUser.username,
                        roles: mockUser.roles,
                        created_at: { seconds: '1704067200', nanos: 0 },
                        updated_at: { seconds: '1704067200', nanos: 0 }
                    }
                });
                return mockCall;
            });
            await client.createUser({
                name: 'Test User',
                username: 'testuser',
                password: 'password123',
                roles: ['admin']
            });
            // Verify next call uses cached token
            mockCreateUser.mockImplementationOnce((request, metadata, callback) => {
                expect(metadata.get('x-auth-token')).toContain('create-user-token');
                callback(null, {
                    user: {
                        user_id: mockUser.userId,
                        name: mockUser.name,
                        username: mockUser.username,
                        roles: mockUser.roles,
                        created_at: { seconds: '1704067200', nanos: 0 },
                        updated_at: { seconds: '1704067200', nanos: 0 }
                    }
                });
            });
            await client.createUser({
                name: 'Test User 2',
                username: 'testuser2',
                password: 'password123',
                roles: ['admin']
            });
        });
        it('should use cached token for listUsers', async () => {
            // First, establish a cached token by calling createUser
            mockCreateUser.mockImplementationOnce((request, metadata, callback) => {
                const responseMetadata = {
                    get: jest.fn((key) => {
                        if (key === 'x-auth-token') {
                            return ['cached-token'];
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
                    user: {
                        user_id: mockUser.userId,
                        name: mockUser.name,
                        username: mockUser.username,
                        roles: mockUser.roles,
                        created_at: { seconds: '1704067200', nanos: 0 },
                        updated_at: { seconds: '1704067200', nanos: 0 }
                    }
                });
                return mockCall;
            });
            await client.createUser({
                name: 'Test User',
                username: 'testuser',
                password: 'password123',
                roles: ['admin']
            });
            // Now test listUsers with cached token
            mockListUsers.mockImplementationOnce((request, metadata, callback) => {
                expect(metadata.get('x-auth-token')).toContain('cached-token');
                callback(null, {
                    users: [
                        {
                            user_id: mockUser.userId,
                            name: mockUser.name,
                            username: mockUser.username,
                            roles: mockUser.roles,
                            created_at: { seconds: '1704067200', nanos: 0 },
                            updated_at: { seconds: '1704067200', nanos: 0 }
                        }
                    ]
                });
            });
            await client.listUsers();
        });
    });
    describe('healthCheck', () => {
        it('should return true for successful connection', async () => {
            const isHealthy = await client.healthCheck();
            expect(isHealthy).toBe(true);
        });
        it('should call getUserCount for health check', async () => {
            await client.healthCheck();
            expect(mockGetUserCount).toHaveBeenCalled();
        });
        it('should return false when getUserCount fails', async () => {
            mockGetUserCount.mockImplementationOnce((request, metadata, callback) => {
                callback(new Error('Connection failed'), null);
            });
            const isHealthy = await client.healthCheck();
            expect(isHealthy).toBe(false);
        });
    });
    describe('close', () => {
        it('should close client connection', () => {
            expect(() => client.close()).not.toThrow();
        });
        it('should handle multiple close calls', () => {
            client.close();
            expect(() => client.close()).not.toThrow();
        });
        it('should throw error when calling methods after close', async () => {
            client.close();
            await expect(client.listUsers()).rejects.toThrow('Client has been disposed');
        });
    });
    describe('disposed state', () => {
        it('should throw error when calling createUser after dispose', async () => {
            client.close();
            await expect(client.createUser({
                name: 'Test',
                username: 'test',
                password: 'test',
                roles: []
            })).rejects.toThrow('Client has been disposed');
        });
        it('should throw error when calling deleteUser after dispose', async () => {
            client.close();
            await expect(client.deleteUser({ userId: '123' })).rejects.toThrow('Client has been disposed');
        });
        it('should throw error when calling changePassword after dispose', async () => {
            client.close();
            await expect(client.changePassword({
                userId: '123',
                currentPassword: 'old',
                newPassword: 'new'
            })).rejects.toThrow('Client has been disposed');
        });
        it('should throw error when calling validateCredentials after dispose', async () => {
            client.close();
            await expect(client.validateCredentials({
                username: 'test',
                password: 'test'
            })).rejects.toThrow('Client has been disposed');
        });
        it('should throw error when calling getUserCount after dispose', async () => {
            client.close();
            await expect(client.getUserCount()).rejects.toThrow('Client has been disposed');
        });
        it('should throw error when calling getEventCount after dispose', async () => {
            client.close();
            await expect(client.getEventCount({ boundary: 'test' })).rejects.toThrow('Client has been disposed');
        });
        it('should throw error when calling healthCheck after dispose', async () => {
            client.close();
            await expect(client.healthCheck()).rejects.toThrow('Client has been disposed');
        });
    });
});
//# sourceMappingURL=admin-client.test.js.map