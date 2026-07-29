// package: orisun
// file: admin.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as eventstore_pb from "./eventstore_pb";

export class BoundaryPermissionGrant extends jspb.Message {
    getBoundary(): string;
    setBoundary(value: string): BoundaryPermissionGrant;
    clearPermissionsList(): void;
    getPermissionsList(): Array<string>;
    setPermissionsList(value: Array<string>): BoundaryPermissionGrant;
    addPermissions(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BoundaryPermissionGrant.AsObject;
    static toObject(includeInstance: boolean, msg: BoundaryPermissionGrant): BoundaryPermissionGrant.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BoundaryPermissionGrant, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BoundaryPermissionGrant;
    static deserializeBinaryFromReader(message: BoundaryPermissionGrant, reader: jspb.BinaryReader): BoundaryPermissionGrant;
}

export namespace BoundaryPermissionGrant {
    export type AsObject = {
        boundary: string,
        permissionsList: Array<string>,
    }
}

export class AdminUser extends jspb.Message {
    getUserId(): string;
    setUserId(value: string): AdminUser;
    getName(): string;
    setName(value: string): AdminUser;
    getUsername(): string;
    setUsername(value: string): AdminUser;
    clearRolesList(): void;
    getRolesList(): Array<string>;
    setRolesList(value: Array<string>): AdminUser;
    addRoles(value: string, index?: number): string;

    hasCreatedAt(): boolean;
    clearCreatedAt(): void;
    getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): AdminUser;

    hasUpdatedAt(): boolean;
    clearUpdatedAt(): void;
    getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): AdminUser;
    clearBoundaryPermissionsList(): void;
    getBoundaryPermissionsList(): Array<BoundaryPermissionGrant>;
    setBoundaryPermissionsList(value: Array<BoundaryPermissionGrant>): AdminUser;
    addBoundaryPermissions(value?: BoundaryPermissionGrant, index?: number): BoundaryPermissionGrant;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AdminUser.AsObject;
    static toObject(includeInstance: boolean, msg: AdminUser): AdminUser.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AdminUser, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AdminUser;
    static deserializeBinaryFromReader(message: AdminUser, reader: jspb.BinaryReader): AdminUser;
}

export namespace AdminUser {
    export type AsObject = {
        userId: string,
        name: string,
        username: string,
        rolesList: Array<string>,
        createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        boundaryPermissionsList: Array<BoundaryPermissionGrant.AsObject>,
    }
}

export class CreateUserRequest extends jspb.Message {
    getName(): string;
    setName(value: string): CreateUserRequest;
    getUsername(): string;
    setUsername(value: string): CreateUserRequest;
    getPassword(): string;
    setPassword(value: string): CreateUserRequest;
    clearRolesList(): void;
    getRolesList(): Array<string>;
    setRolesList(value: Array<string>): CreateUserRequest;
    addRoles(value: string, index?: number): string;
    clearBoundaryPermissionsList(): void;
    getBoundaryPermissionsList(): Array<BoundaryPermissionGrant>;
    setBoundaryPermissionsList(value: Array<BoundaryPermissionGrant>): CreateUserRequest;
    addBoundaryPermissions(value?: BoundaryPermissionGrant, index?: number): BoundaryPermissionGrant;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateUserRequest): CreateUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateUserRequest;
    static deserializeBinaryFromReader(message: CreateUserRequest, reader: jspb.BinaryReader): CreateUserRequest;
}

export namespace CreateUserRequest {
    export type AsObject = {
        name: string,
        username: string,
        password: string,
        rolesList: Array<string>,
        boundaryPermissionsList: Array<BoundaryPermissionGrant.AsObject>,
    }
}

export class CreateUserResponse extends jspb.Message {

    hasUser(): boolean;
    clearUser(): void;
    getUser(): AdminUser | undefined;
    setUser(value?: AdminUser): CreateUserResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateUserResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateUserResponse): CreateUserResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateUserResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateUserResponse;
    static deserializeBinaryFromReader(message: CreateUserResponse, reader: jspb.BinaryReader): CreateUserResponse;
}

export namespace CreateUserResponse {
    export type AsObject = {
        user?: AdminUser.AsObject,
    }
}

export class DeleteUserRequest extends jspb.Message {
    getUserId(): string;
    setUserId(value: string): DeleteUserRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteUserRequest): DeleteUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteUserRequest;
    static deserializeBinaryFromReader(message: DeleteUserRequest, reader: jspb.BinaryReader): DeleteUserRequest;
}

export namespace DeleteUserRequest {
    export type AsObject = {
        userId: string,
    }
}

export class DeleteUserResponse extends jspb.Message {
    getSuccess(): boolean;
    setSuccess(value: boolean): DeleteUserResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteUserResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteUserResponse): DeleteUserResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteUserResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteUserResponse;
    static deserializeBinaryFromReader(message: DeleteUserResponse, reader: jspb.BinaryReader): DeleteUserResponse;
}

export namespace DeleteUserResponse {
    export type AsObject = {
        success: boolean,
    }
}

export class ChangePasswordRequest extends jspb.Message {
    getUserId(): string;
    setUserId(value: string): ChangePasswordRequest;
    getCurrentPassword(): string;
    setCurrentPassword(value: string): ChangePasswordRequest;
    getNewPassword(): string;
    setNewPassword(value: string): ChangePasswordRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChangePasswordRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ChangePasswordRequest): ChangePasswordRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChangePasswordRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChangePasswordRequest;
    static deserializeBinaryFromReader(message: ChangePasswordRequest, reader: jspb.BinaryReader): ChangePasswordRequest;
}

export namespace ChangePasswordRequest {
    export type AsObject = {
        userId: string,
        currentPassword: string,
        newPassword: string,
    }
}

export class ChangePasswordResponse extends jspb.Message {
    getSuccess(): boolean;
    setSuccess(value: boolean): ChangePasswordResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChangePasswordResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ChangePasswordResponse): ChangePasswordResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChangePasswordResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChangePasswordResponse;
    static deserializeBinaryFromReader(message: ChangePasswordResponse, reader: jspb.BinaryReader): ChangePasswordResponse;
}

export namespace ChangePasswordResponse {
    export type AsObject = {
        success: boolean,
    }
}

export class SetUserBoundaryPermissionsRequest extends jspb.Message {
    getUserId(): string;
    setUserId(value: string): SetUserBoundaryPermissionsRequest;
    getBoundary(): string;
    setBoundary(value: string): SetUserBoundaryPermissionsRequest;
    clearPermissionsList(): void;
    getPermissionsList(): Array<string>;
    setPermissionsList(value: Array<string>): SetUserBoundaryPermissionsRequest;
    addPermissions(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetUserBoundaryPermissionsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SetUserBoundaryPermissionsRequest): SetUserBoundaryPermissionsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetUserBoundaryPermissionsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetUserBoundaryPermissionsRequest;
    static deserializeBinaryFromReader(message: SetUserBoundaryPermissionsRequest, reader: jspb.BinaryReader): SetUserBoundaryPermissionsRequest;
}

export namespace SetUserBoundaryPermissionsRequest {
    export type AsObject = {
        userId: string,
        boundary: string,
        permissionsList: Array<string>,
    }
}

export class SetUserBoundaryPermissionsResponse extends jspb.Message {

    hasUser(): boolean;
    clearUser(): void;
    getUser(): AdminUser | undefined;
    setUser(value?: AdminUser): SetUserBoundaryPermissionsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetUserBoundaryPermissionsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SetUserBoundaryPermissionsResponse): SetUserBoundaryPermissionsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetUserBoundaryPermissionsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetUserBoundaryPermissionsResponse;
    static deserializeBinaryFromReader(message: SetUserBoundaryPermissionsResponse, reader: jspb.BinaryReader): SetUserBoundaryPermissionsResponse;
}

export namespace SetUserBoundaryPermissionsResponse {
    export type AsObject = {
        user?: AdminUser.AsObject,
    }
}

export class ListUsersRequest extends jspb.Message {

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListUsersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListUsersRequest): ListUsersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListUsersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListUsersRequest;
    static deserializeBinaryFromReader(message: ListUsersRequest, reader: jspb.BinaryReader): ListUsersRequest;
}

export namespace ListUsersRequest {
    export type AsObject = {
    }
}

export class ListUsersResponse extends jspb.Message {
    clearUsersList(): void;
    getUsersList(): Array<AdminUser>;
    setUsersList(value: Array<AdminUser>): ListUsersResponse;
    addUsers(value?: AdminUser, index?: number): AdminUser;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListUsersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListUsersResponse): ListUsersResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListUsersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListUsersResponse;
    static deserializeBinaryFromReader(message: ListUsersResponse, reader: jspb.BinaryReader): ListUsersResponse;
}

export namespace ListUsersResponse {
    export type AsObject = {
        usersList: Array<AdminUser.AsObject>,
    }
}

export class ValidateCredentialsRequest extends jspb.Message {
    getUsername(): string;
    setUsername(value: string): ValidateCredentialsRequest;
    getPassword(): string;
    setPassword(value: string): ValidateCredentialsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidateCredentialsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ValidateCredentialsRequest): ValidateCredentialsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidateCredentialsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidateCredentialsRequest;
    static deserializeBinaryFromReader(message: ValidateCredentialsRequest, reader: jspb.BinaryReader): ValidateCredentialsRequest;
}

export namespace ValidateCredentialsRequest {
    export type AsObject = {
        username: string,
        password: string,
    }
}

export class ValidateCredentialsResponse extends jspb.Message {
    getSuccess(): boolean;
    setSuccess(value: boolean): ValidateCredentialsResponse;

    hasUser(): boolean;
    clearUser(): void;
    getUser(): AdminUser | undefined;
    setUser(value?: AdminUser): ValidateCredentialsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidateCredentialsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ValidateCredentialsResponse): ValidateCredentialsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidateCredentialsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidateCredentialsResponse;
    static deserializeBinaryFromReader(message: ValidateCredentialsResponse, reader: jspb.BinaryReader): ValidateCredentialsResponse;
}

export namespace ValidateCredentialsResponse {
    export type AsObject = {
        success: boolean,
        user?: AdminUser.AsObject,
    }
}

export class GetUserCountRequest extends jspb.Message {

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserCountRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserCountRequest): GetUserCountRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserCountRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserCountRequest;
    static deserializeBinaryFromReader(message: GetUserCountRequest, reader: jspb.BinaryReader): GetUserCountRequest;
}

export namespace GetUserCountRequest {
    export type AsObject = {
    }
}

export class GetUserCountResponse extends jspb.Message {
    getCount(): number;
    setCount(value: number): GetUserCountResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserCountResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserCountResponse): GetUserCountResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserCountResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserCountResponse;
    static deserializeBinaryFromReader(message: GetUserCountResponse, reader: jspb.BinaryReader): GetUserCountResponse;
}

export namespace GetUserCountResponse {
    export type AsObject = {
        count: number,
    }
}

export class GetEventCountRequest extends jspb.Message {
    getBoundary(): string;
    setBoundary(value: string): GetEventCountRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetEventCountRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetEventCountRequest): GetEventCountRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetEventCountRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetEventCountRequest;
    static deserializeBinaryFromReader(message: GetEventCountRequest, reader: jspb.BinaryReader): GetEventCountRequest;
}

export namespace GetEventCountRequest {
    export type AsObject = {
        boundary: string,
    }
}

export class GetEventCountResponse extends jspb.Message {
    getCount(): number;
    setCount(value: number): GetEventCountResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetEventCountResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetEventCountResponse): GetEventCountResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetEventCountResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetEventCountResponse;
    static deserializeBinaryFromReader(message: GetEventCountResponse, reader: jspb.BinaryReader): GetEventCountResponse;
}

export namespace GetEventCountResponse {
    export type AsObject = {
        count: number,
    }
}

export class BoundaryPlacementInput extends jspb.Message {
    getBackend(): string;
    setBackend(value: string): BoundaryPlacementInput;
    getNamespace(): string;
    setNamespace(value: string): BoundaryPlacementInput;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BoundaryPlacementInput.AsObject;
    static toObject(includeInstance: boolean, msg: BoundaryPlacementInput): BoundaryPlacementInput.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BoundaryPlacementInput, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BoundaryPlacementInput;
    static deserializeBinaryFromReader(message: BoundaryPlacementInput, reader: jspb.BinaryReader): BoundaryPlacementInput;
}

export namespace BoundaryPlacementInput {
    export type AsObject = {
        backend: string,
        namespace: string,
    }
}

export class BoundaryInfo extends jspb.Message {
    getName(): string;
    setName(value: string): BoundaryInfo;
    getDescription(): string;
    setDescription(value: string): BoundaryInfo;

    hasPlacement(): boolean;
    clearPlacement(): void;
    getPlacement(): BoundaryPlacementInput | undefined;
    setPlacement(value?: BoundaryPlacementInput): BoundaryInfo;
    getStatus(): BoundaryLifecycleStatus;
    setStatus(value: BoundaryLifecycleStatus): BoundaryInfo;
    getExistedBeforeCatalog(): boolean;
    setExistedBeforeCatalog(value: boolean): BoundaryInfo;
    getLastError(): string;
    setLastError(value: string): BoundaryInfo;

    hasDefinitionPosition(): boolean;
    clearDefinitionPosition(): void;
    getDefinitionPosition(): eventstore_pb.Position | undefined;
    setDefinitionPosition(value?: eventstore_pb.Position): BoundaryInfo;

    hasStatusPosition(): boolean;
    clearStatusPosition(): void;
    getStatusPosition(): eventstore_pb.Position | undefined;
    setStatusPosition(value?: eventstore_pb.Position): BoundaryInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BoundaryInfo.AsObject;
    static toObject(includeInstance: boolean, msg: BoundaryInfo): BoundaryInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BoundaryInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BoundaryInfo;
    static deserializeBinaryFromReader(message: BoundaryInfo, reader: jspb.BinaryReader): BoundaryInfo;
}

export namespace BoundaryInfo {
    export type AsObject = {
        name: string,
        description: string,
        placement?: BoundaryPlacementInput.AsObject,
        status: BoundaryLifecycleStatus,
        existedBeforeCatalog: boolean,
        lastError: string,
        definitionPosition?: eventstore_pb.Position.AsObject,
        statusPosition?: eventstore_pb.Position.AsObject,
    }
}

export class CreateBoundaryRequest extends jspb.Message {
    getName(): string;
    setName(value: string): CreateBoundaryRequest;
    getDescription(): string;
    setDescription(value: string): CreateBoundaryRequest;

    hasPlacement(): boolean;
    clearPlacement(): void;
    getPlacement(): BoundaryPlacementInput | undefined;
    setPlacement(value?: BoundaryPlacementInput): CreateBoundaryRequest;
    getExistedBeforeCatalog(): boolean;
    setExistedBeforeCatalog(value: boolean): CreateBoundaryRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateBoundaryRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateBoundaryRequest): CreateBoundaryRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateBoundaryRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateBoundaryRequest;
    static deserializeBinaryFromReader(message: CreateBoundaryRequest, reader: jspb.BinaryReader): CreateBoundaryRequest;
}

export namespace CreateBoundaryRequest {
    export type AsObject = {
        name: string,
        description: string,
        placement?: BoundaryPlacementInput.AsObject,
        existedBeforeCatalog: boolean,
    }
}

export class CreateBoundaryResponse extends jspb.Message {

    hasBoundary(): boolean;
    clearBoundary(): void;
    getBoundary(): BoundaryInfo | undefined;
    setBoundary(value?: BoundaryInfo): CreateBoundaryResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateBoundaryResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateBoundaryResponse): CreateBoundaryResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateBoundaryResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateBoundaryResponse;
    static deserializeBinaryFromReader(message: CreateBoundaryResponse, reader: jspb.BinaryReader): CreateBoundaryResponse;
}

export namespace CreateBoundaryResponse {
    export type AsObject = {
        boundary?: BoundaryInfo.AsObject,
    }
}

export class ListBoundariesRequest extends jspb.Message {

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListBoundariesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListBoundariesRequest): ListBoundariesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListBoundariesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListBoundariesRequest;
    static deserializeBinaryFromReader(message: ListBoundariesRequest, reader: jspb.BinaryReader): ListBoundariesRequest;
}

export namespace ListBoundariesRequest {
    export type AsObject = {
    }
}

export class ListBoundariesResponse extends jspb.Message {
    clearBoundariesList(): void;
    getBoundariesList(): Array<BoundaryInfo>;
    setBoundariesList(value: Array<BoundaryInfo>): ListBoundariesResponse;
    addBoundaries(value?: BoundaryInfo, index?: number): BoundaryInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListBoundariesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListBoundariesResponse): ListBoundariesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListBoundariesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListBoundariesResponse;
    static deserializeBinaryFromReader(message: ListBoundariesResponse, reader: jspb.BinaryReader): ListBoundariesResponse;
}

export namespace ListBoundariesResponse {
    export type AsObject = {
        boundariesList: Array<BoundaryInfo.AsObject>,
    }
}

export class GetBoundaryRequest extends jspb.Message {
    getName(): string;
    setName(value: string): GetBoundaryRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBoundaryRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetBoundaryRequest): GetBoundaryRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBoundaryRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBoundaryRequest;
    static deserializeBinaryFromReader(message: GetBoundaryRequest, reader: jspb.BinaryReader): GetBoundaryRequest;
}

export namespace GetBoundaryRequest {
    export type AsObject = {
        name: string,
    }
}

export class GetBoundaryResponse extends jspb.Message {

    hasBoundary(): boolean;
    clearBoundary(): void;
    getBoundary(): BoundaryInfo | undefined;
    setBoundary(value?: BoundaryInfo): GetBoundaryResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBoundaryResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetBoundaryResponse): GetBoundaryResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBoundaryResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBoundaryResponse;
    static deserializeBinaryFromReader(message: GetBoundaryResponse, reader: jspb.BinaryReader): GetBoundaryResponse;
}

export namespace GetBoundaryResponse {
    export type AsObject = {
        boundary?: BoundaryInfo.AsObject,
    }
}

export enum BoundaryLifecycleStatus {
    BOUNDARY_LIFECYCLE_STATUS_UNSPECIFIED = 0,
    BOUNDARY_LIFECYCLE_STATUS_PROVISIONING = 1,
    BOUNDARY_LIFECYCLE_STATUS_ACTIVE = 2,
    BOUNDARY_LIFECYCLE_STATUS_FAILED = 3,
}
