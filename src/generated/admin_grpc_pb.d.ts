// package: orisun
// file: admin.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as admin_pb from "./admin_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as eventstore_pb from "./eventstore_pb";

interface IAdminService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createBoundary: IAdminService_ICreateBoundary;
    listBoundaries: IAdminService_IListBoundaries;
    getBoundary: IAdminService_IGetBoundary;
    createUser: IAdminService_ICreateUser;
    deleteUser: IAdminService_IDeleteUser;
    changePassword: IAdminService_IChangePassword;
    setUserBoundaryPermissions: IAdminService_ISetUserBoundaryPermissions;
    listUsers: IAdminService_IListUsers;
    validateCredentials: IAdminService_IValidateCredentials;
    getUserCount: IAdminService_IGetUserCount;
    getEventCount: IAdminService_IGetEventCount;
}

interface IAdminService_ICreateBoundary extends grpc.MethodDefinition<admin_pb.CreateBoundaryRequest, admin_pb.CreateBoundaryResponse> {
    path: "/orisun.Admin/CreateBoundary";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<admin_pb.CreateBoundaryRequest>;
    requestDeserialize: grpc.deserialize<admin_pb.CreateBoundaryRequest>;
    responseSerialize: grpc.serialize<admin_pb.CreateBoundaryResponse>;
    responseDeserialize: grpc.deserialize<admin_pb.CreateBoundaryResponse>;
}
interface IAdminService_IListBoundaries extends grpc.MethodDefinition<admin_pb.ListBoundariesRequest, admin_pb.ListBoundariesResponse> {
    path: "/orisun.Admin/ListBoundaries";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<admin_pb.ListBoundariesRequest>;
    requestDeserialize: grpc.deserialize<admin_pb.ListBoundariesRequest>;
    responseSerialize: grpc.serialize<admin_pb.ListBoundariesResponse>;
    responseDeserialize: grpc.deserialize<admin_pb.ListBoundariesResponse>;
}
interface IAdminService_IGetBoundary extends grpc.MethodDefinition<admin_pb.GetBoundaryRequest, admin_pb.GetBoundaryResponse> {
    path: "/orisun.Admin/GetBoundary";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<admin_pb.GetBoundaryRequest>;
    requestDeserialize: grpc.deserialize<admin_pb.GetBoundaryRequest>;
    responseSerialize: grpc.serialize<admin_pb.GetBoundaryResponse>;
    responseDeserialize: grpc.deserialize<admin_pb.GetBoundaryResponse>;
}
interface IAdminService_ICreateUser extends grpc.MethodDefinition<admin_pb.CreateUserRequest, admin_pb.CreateUserResponse> {
    path: "/orisun.Admin/CreateUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<admin_pb.CreateUserRequest>;
    requestDeserialize: grpc.deserialize<admin_pb.CreateUserRequest>;
    responseSerialize: grpc.serialize<admin_pb.CreateUserResponse>;
    responseDeserialize: grpc.deserialize<admin_pb.CreateUserResponse>;
}
interface IAdminService_IDeleteUser extends grpc.MethodDefinition<admin_pb.DeleteUserRequest, admin_pb.DeleteUserResponse> {
    path: "/orisun.Admin/DeleteUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<admin_pb.DeleteUserRequest>;
    requestDeserialize: grpc.deserialize<admin_pb.DeleteUserRequest>;
    responseSerialize: grpc.serialize<admin_pb.DeleteUserResponse>;
    responseDeserialize: grpc.deserialize<admin_pb.DeleteUserResponse>;
}
interface IAdminService_IChangePassword extends grpc.MethodDefinition<admin_pb.ChangePasswordRequest, admin_pb.ChangePasswordResponse> {
    path: "/orisun.Admin/ChangePassword";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<admin_pb.ChangePasswordRequest>;
    requestDeserialize: grpc.deserialize<admin_pb.ChangePasswordRequest>;
    responseSerialize: grpc.serialize<admin_pb.ChangePasswordResponse>;
    responseDeserialize: grpc.deserialize<admin_pb.ChangePasswordResponse>;
}
interface IAdminService_ISetUserBoundaryPermissions extends grpc.MethodDefinition<admin_pb.SetUserBoundaryPermissionsRequest, admin_pb.SetUserBoundaryPermissionsResponse> {
    path: "/orisun.Admin/SetUserBoundaryPermissions";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<admin_pb.SetUserBoundaryPermissionsRequest>;
    requestDeserialize: grpc.deserialize<admin_pb.SetUserBoundaryPermissionsRequest>;
    responseSerialize: grpc.serialize<admin_pb.SetUserBoundaryPermissionsResponse>;
    responseDeserialize: grpc.deserialize<admin_pb.SetUserBoundaryPermissionsResponse>;
}
interface IAdminService_IListUsers extends grpc.MethodDefinition<admin_pb.ListUsersRequest, admin_pb.ListUsersResponse> {
    path: "/orisun.Admin/ListUsers";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<admin_pb.ListUsersRequest>;
    requestDeserialize: grpc.deserialize<admin_pb.ListUsersRequest>;
    responseSerialize: grpc.serialize<admin_pb.ListUsersResponse>;
    responseDeserialize: grpc.deserialize<admin_pb.ListUsersResponse>;
}
interface IAdminService_IValidateCredentials extends grpc.MethodDefinition<admin_pb.ValidateCredentialsRequest, admin_pb.ValidateCredentialsResponse> {
    path: "/orisun.Admin/ValidateCredentials";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<admin_pb.ValidateCredentialsRequest>;
    requestDeserialize: grpc.deserialize<admin_pb.ValidateCredentialsRequest>;
    responseSerialize: grpc.serialize<admin_pb.ValidateCredentialsResponse>;
    responseDeserialize: grpc.deserialize<admin_pb.ValidateCredentialsResponse>;
}
interface IAdminService_IGetUserCount extends grpc.MethodDefinition<admin_pb.GetUserCountRequest, admin_pb.GetUserCountResponse> {
    path: "/orisun.Admin/GetUserCount";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<admin_pb.GetUserCountRequest>;
    requestDeserialize: grpc.deserialize<admin_pb.GetUserCountRequest>;
    responseSerialize: grpc.serialize<admin_pb.GetUserCountResponse>;
    responseDeserialize: grpc.deserialize<admin_pb.GetUserCountResponse>;
}
interface IAdminService_IGetEventCount extends grpc.MethodDefinition<admin_pb.GetEventCountRequest, admin_pb.GetEventCountResponse> {
    path: "/orisun.Admin/GetEventCount";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<admin_pb.GetEventCountRequest>;
    requestDeserialize: grpc.deserialize<admin_pb.GetEventCountRequest>;
    responseSerialize: grpc.serialize<admin_pb.GetEventCountResponse>;
    responseDeserialize: grpc.deserialize<admin_pb.GetEventCountResponse>;
}

export const AdminService: IAdminService;

export interface IAdminServer extends grpc.UntypedServiceImplementation {
    createBoundary: grpc.handleUnaryCall<admin_pb.CreateBoundaryRequest, admin_pb.CreateBoundaryResponse>;
    listBoundaries: grpc.handleUnaryCall<admin_pb.ListBoundariesRequest, admin_pb.ListBoundariesResponse>;
    getBoundary: grpc.handleUnaryCall<admin_pb.GetBoundaryRequest, admin_pb.GetBoundaryResponse>;
    createUser: grpc.handleUnaryCall<admin_pb.CreateUserRequest, admin_pb.CreateUserResponse>;
    deleteUser: grpc.handleUnaryCall<admin_pb.DeleteUserRequest, admin_pb.DeleteUserResponse>;
    changePassword: grpc.handleUnaryCall<admin_pb.ChangePasswordRequest, admin_pb.ChangePasswordResponse>;
    setUserBoundaryPermissions: grpc.handleUnaryCall<admin_pb.SetUserBoundaryPermissionsRequest, admin_pb.SetUserBoundaryPermissionsResponse>;
    listUsers: grpc.handleUnaryCall<admin_pb.ListUsersRequest, admin_pb.ListUsersResponse>;
    validateCredentials: grpc.handleUnaryCall<admin_pb.ValidateCredentialsRequest, admin_pb.ValidateCredentialsResponse>;
    getUserCount: grpc.handleUnaryCall<admin_pb.GetUserCountRequest, admin_pb.GetUserCountResponse>;
    getEventCount: grpc.handleUnaryCall<admin_pb.GetEventCountRequest, admin_pb.GetEventCountResponse>;
}

export interface IAdminClient {
    createBoundary(request: admin_pb.CreateBoundaryRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.CreateBoundaryResponse) => void): grpc.ClientUnaryCall;
    createBoundary(request: admin_pb.CreateBoundaryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.CreateBoundaryResponse) => void): grpc.ClientUnaryCall;
    createBoundary(request: admin_pb.CreateBoundaryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.CreateBoundaryResponse) => void): grpc.ClientUnaryCall;
    listBoundaries(request: admin_pb.ListBoundariesRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.ListBoundariesResponse) => void): grpc.ClientUnaryCall;
    listBoundaries(request: admin_pb.ListBoundariesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.ListBoundariesResponse) => void): grpc.ClientUnaryCall;
    listBoundaries(request: admin_pb.ListBoundariesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.ListBoundariesResponse) => void): grpc.ClientUnaryCall;
    getBoundary(request: admin_pb.GetBoundaryRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.GetBoundaryResponse) => void): grpc.ClientUnaryCall;
    getBoundary(request: admin_pb.GetBoundaryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.GetBoundaryResponse) => void): grpc.ClientUnaryCall;
    getBoundary(request: admin_pb.GetBoundaryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.GetBoundaryResponse) => void): grpc.ClientUnaryCall;
    createUser(request: admin_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.CreateUserResponse) => void): grpc.ClientUnaryCall;
    createUser(request: admin_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.CreateUserResponse) => void): grpc.ClientUnaryCall;
    createUser(request: admin_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.CreateUserResponse) => void): grpc.ClientUnaryCall;
    deleteUser(request: admin_pb.DeleteUserRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.DeleteUserResponse) => void): grpc.ClientUnaryCall;
    deleteUser(request: admin_pb.DeleteUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.DeleteUserResponse) => void): grpc.ClientUnaryCall;
    deleteUser(request: admin_pb.DeleteUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.DeleteUserResponse) => void): grpc.ClientUnaryCall;
    changePassword(request: admin_pb.ChangePasswordRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.ChangePasswordResponse) => void): grpc.ClientUnaryCall;
    changePassword(request: admin_pb.ChangePasswordRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.ChangePasswordResponse) => void): grpc.ClientUnaryCall;
    changePassword(request: admin_pb.ChangePasswordRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.ChangePasswordResponse) => void): grpc.ClientUnaryCall;
    setUserBoundaryPermissions(request: admin_pb.SetUserBoundaryPermissionsRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.SetUserBoundaryPermissionsResponse) => void): grpc.ClientUnaryCall;
    setUserBoundaryPermissions(request: admin_pb.SetUserBoundaryPermissionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.SetUserBoundaryPermissionsResponse) => void): grpc.ClientUnaryCall;
    setUserBoundaryPermissions(request: admin_pb.SetUserBoundaryPermissionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.SetUserBoundaryPermissionsResponse) => void): grpc.ClientUnaryCall;
    listUsers(request: admin_pb.ListUsersRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.ListUsersResponse) => void): grpc.ClientUnaryCall;
    listUsers(request: admin_pb.ListUsersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.ListUsersResponse) => void): grpc.ClientUnaryCall;
    listUsers(request: admin_pb.ListUsersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.ListUsersResponse) => void): grpc.ClientUnaryCall;
    validateCredentials(request: admin_pb.ValidateCredentialsRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.ValidateCredentialsResponse) => void): grpc.ClientUnaryCall;
    validateCredentials(request: admin_pb.ValidateCredentialsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.ValidateCredentialsResponse) => void): grpc.ClientUnaryCall;
    validateCredentials(request: admin_pb.ValidateCredentialsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.ValidateCredentialsResponse) => void): grpc.ClientUnaryCall;
    getUserCount(request: admin_pb.GetUserCountRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.GetUserCountResponse) => void): grpc.ClientUnaryCall;
    getUserCount(request: admin_pb.GetUserCountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.GetUserCountResponse) => void): grpc.ClientUnaryCall;
    getUserCount(request: admin_pb.GetUserCountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.GetUserCountResponse) => void): grpc.ClientUnaryCall;
    getEventCount(request: admin_pb.GetEventCountRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.GetEventCountResponse) => void): grpc.ClientUnaryCall;
    getEventCount(request: admin_pb.GetEventCountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.GetEventCountResponse) => void): grpc.ClientUnaryCall;
    getEventCount(request: admin_pb.GetEventCountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.GetEventCountResponse) => void): grpc.ClientUnaryCall;
}

export class AdminClient extends grpc.Client implements IAdminClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public createBoundary(request: admin_pb.CreateBoundaryRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.CreateBoundaryResponse) => void): grpc.ClientUnaryCall;
    public createBoundary(request: admin_pb.CreateBoundaryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.CreateBoundaryResponse) => void): grpc.ClientUnaryCall;
    public createBoundary(request: admin_pb.CreateBoundaryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.CreateBoundaryResponse) => void): grpc.ClientUnaryCall;
    public listBoundaries(request: admin_pb.ListBoundariesRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.ListBoundariesResponse) => void): grpc.ClientUnaryCall;
    public listBoundaries(request: admin_pb.ListBoundariesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.ListBoundariesResponse) => void): grpc.ClientUnaryCall;
    public listBoundaries(request: admin_pb.ListBoundariesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.ListBoundariesResponse) => void): grpc.ClientUnaryCall;
    public getBoundary(request: admin_pb.GetBoundaryRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.GetBoundaryResponse) => void): grpc.ClientUnaryCall;
    public getBoundary(request: admin_pb.GetBoundaryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.GetBoundaryResponse) => void): grpc.ClientUnaryCall;
    public getBoundary(request: admin_pb.GetBoundaryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.GetBoundaryResponse) => void): grpc.ClientUnaryCall;
    public createUser(request: admin_pb.CreateUserRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.CreateUserResponse) => void): grpc.ClientUnaryCall;
    public createUser(request: admin_pb.CreateUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.CreateUserResponse) => void): grpc.ClientUnaryCall;
    public createUser(request: admin_pb.CreateUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.CreateUserResponse) => void): grpc.ClientUnaryCall;
    public deleteUser(request: admin_pb.DeleteUserRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.DeleteUserResponse) => void): grpc.ClientUnaryCall;
    public deleteUser(request: admin_pb.DeleteUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.DeleteUserResponse) => void): grpc.ClientUnaryCall;
    public deleteUser(request: admin_pb.DeleteUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.DeleteUserResponse) => void): grpc.ClientUnaryCall;
    public changePassword(request: admin_pb.ChangePasswordRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.ChangePasswordResponse) => void): grpc.ClientUnaryCall;
    public changePassword(request: admin_pb.ChangePasswordRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.ChangePasswordResponse) => void): grpc.ClientUnaryCall;
    public changePassword(request: admin_pb.ChangePasswordRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.ChangePasswordResponse) => void): grpc.ClientUnaryCall;
    public setUserBoundaryPermissions(request: admin_pb.SetUserBoundaryPermissionsRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.SetUserBoundaryPermissionsResponse) => void): grpc.ClientUnaryCall;
    public setUserBoundaryPermissions(request: admin_pb.SetUserBoundaryPermissionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.SetUserBoundaryPermissionsResponse) => void): grpc.ClientUnaryCall;
    public setUserBoundaryPermissions(request: admin_pb.SetUserBoundaryPermissionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.SetUserBoundaryPermissionsResponse) => void): grpc.ClientUnaryCall;
    public listUsers(request: admin_pb.ListUsersRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.ListUsersResponse) => void): grpc.ClientUnaryCall;
    public listUsers(request: admin_pb.ListUsersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.ListUsersResponse) => void): grpc.ClientUnaryCall;
    public listUsers(request: admin_pb.ListUsersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.ListUsersResponse) => void): grpc.ClientUnaryCall;
    public validateCredentials(request: admin_pb.ValidateCredentialsRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.ValidateCredentialsResponse) => void): grpc.ClientUnaryCall;
    public validateCredentials(request: admin_pb.ValidateCredentialsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.ValidateCredentialsResponse) => void): grpc.ClientUnaryCall;
    public validateCredentials(request: admin_pb.ValidateCredentialsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.ValidateCredentialsResponse) => void): grpc.ClientUnaryCall;
    public getUserCount(request: admin_pb.GetUserCountRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.GetUserCountResponse) => void): grpc.ClientUnaryCall;
    public getUserCount(request: admin_pb.GetUserCountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.GetUserCountResponse) => void): grpc.ClientUnaryCall;
    public getUserCount(request: admin_pb.GetUserCountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.GetUserCountResponse) => void): grpc.ClientUnaryCall;
    public getEventCount(request: admin_pb.GetEventCountRequest, callback: (error: grpc.ServiceError | null, response: admin_pb.GetEventCountResponse) => void): grpc.ClientUnaryCall;
    public getEventCount(request: admin_pb.GetEventCountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: admin_pb.GetEventCountResponse) => void): grpc.ClientUnaryCall;
    public getEventCount(request: admin_pb.GetEventCountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: admin_pb.GetEventCountResponse) => void): grpc.ClientUnaryCall;
}
