// GENERATED CODE -- DO NOT EDIT!

'use strict';
var admin_pb = require('./admin_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var eventstore_pb = require('./eventstore_pb.js');

function serialize_orisun_ChangePasswordRequest(arg) {
  if (!(arg instanceof admin_pb.ChangePasswordRequest)) {
    throw new Error('Expected argument of type orisun.ChangePasswordRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_ChangePasswordRequest(buffer_arg) {
  return admin_pb.ChangePasswordRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_ChangePasswordResponse(arg) {
  if (!(arg instanceof admin_pb.ChangePasswordResponse)) {
    throw new Error('Expected argument of type orisun.ChangePasswordResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_ChangePasswordResponse(buffer_arg) {
  return admin_pb.ChangePasswordResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_CreateBoundaryRequest(arg) {
  if (!(arg instanceof admin_pb.CreateBoundaryRequest)) {
    throw new Error('Expected argument of type orisun.CreateBoundaryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_CreateBoundaryRequest(buffer_arg) {
  return admin_pb.CreateBoundaryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_CreateBoundaryResponse(arg) {
  if (!(arg instanceof admin_pb.CreateBoundaryResponse)) {
    throw new Error('Expected argument of type orisun.CreateBoundaryResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_CreateBoundaryResponse(buffer_arg) {
  return admin_pb.CreateBoundaryResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_CreateUserRequest(arg) {
  if (!(arg instanceof admin_pb.CreateUserRequest)) {
    throw new Error('Expected argument of type orisun.CreateUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_CreateUserRequest(buffer_arg) {
  return admin_pb.CreateUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_CreateUserResponse(arg) {
  if (!(arg instanceof admin_pb.CreateUserResponse)) {
    throw new Error('Expected argument of type orisun.CreateUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_CreateUserResponse(buffer_arg) {
  return admin_pb.CreateUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_DeleteUserRequest(arg) {
  if (!(arg instanceof admin_pb.DeleteUserRequest)) {
    throw new Error('Expected argument of type orisun.DeleteUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_DeleteUserRequest(buffer_arg) {
  return admin_pb.DeleteUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_DeleteUserResponse(arg) {
  if (!(arg instanceof admin_pb.DeleteUserResponse)) {
    throw new Error('Expected argument of type orisun.DeleteUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_DeleteUserResponse(buffer_arg) {
  return admin_pb.DeleteUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_GetBoundaryRequest(arg) {
  if (!(arg instanceof admin_pb.GetBoundaryRequest)) {
    throw new Error('Expected argument of type orisun.GetBoundaryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_GetBoundaryRequest(buffer_arg) {
  return admin_pb.GetBoundaryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_GetBoundaryResponse(arg) {
  if (!(arg instanceof admin_pb.GetBoundaryResponse)) {
    throw new Error('Expected argument of type orisun.GetBoundaryResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_GetBoundaryResponse(buffer_arg) {
  return admin_pb.GetBoundaryResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_GetEventCountRequest(arg) {
  if (!(arg instanceof admin_pb.GetEventCountRequest)) {
    throw new Error('Expected argument of type orisun.GetEventCountRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_GetEventCountRequest(buffer_arg) {
  return admin_pb.GetEventCountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_GetEventCountResponse(arg) {
  if (!(arg instanceof admin_pb.GetEventCountResponse)) {
    throw new Error('Expected argument of type orisun.GetEventCountResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_GetEventCountResponse(buffer_arg) {
  return admin_pb.GetEventCountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_GetUserCountRequest(arg) {
  if (!(arg instanceof admin_pb.GetUserCountRequest)) {
    throw new Error('Expected argument of type orisun.GetUserCountRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_GetUserCountRequest(buffer_arg) {
  return admin_pb.GetUserCountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_GetUserCountResponse(arg) {
  if (!(arg instanceof admin_pb.GetUserCountResponse)) {
    throw new Error('Expected argument of type orisun.GetUserCountResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_GetUserCountResponse(buffer_arg) {
  return admin_pb.GetUserCountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_ListBoundariesRequest(arg) {
  if (!(arg instanceof admin_pb.ListBoundariesRequest)) {
    throw new Error('Expected argument of type orisun.ListBoundariesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_ListBoundariesRequest(buffer_arg) {
  return admin_pb.ListBoundariesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_ListBoundariesResponse(arg) {
  if (!(arg instanceof admin_pb.ListBoundariesResponse)) {
    throw new Error('Expected argument of type orisun.ListBoundariesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_ListBoundariesResponse(buffer_arg) {
  return admin_pb.ListBoundariesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_ListUsersRequest(arg) {
  if (!(arg instanceof admin_pb.ListUsersRequest)) {
    throw new Error('Expected argument of type orisun.ListUsersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_ListUsersRequest(buffer_arg) {
  return admin_pb.ListUsersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_ListUsersResponse(arg) {
  if (!(arg instanceof admin_pb.ListUsersResponse)) {
    throw new Error('Expected argument of type orisun.ListUsersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_ListUsersResponse(buffer_arg) {
  return admin_pb.ListUsersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_SetUserBoundaryPermissionsRequest(arg) {
  if (!(arg instanceof admin_pb.SetUserBoundaryPermissionsRequest)) {
    throw new Error('Expected argument of type orisun.SetUserBoundaryPermissionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_SetUserBoundaryPermissionsRequest(buffer_arg) {
  return admin_pb.SetUserBoundaryPermissionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_SetUserBoundaryPermissionsResponse(arg) {
  if (!(arg instanceof admin_pb.SetUserBoundaryPermissionsResponse)) {
    throw new Error('Expected argument of type orisun.SetUserBoundaryPermissionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_SetUserBoundaryPermissionsResponse(buffer_arg) {
  return admin_pb.SetUserBoundaryPermissionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_ValidateCredentialsRequest(arg) {
  if (!(arg instanceof admin_pb.ValidateCredentialsRequest)) {
    throw new Error('Expected argument of type orisun.ValidateCredentialsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_ValidateCredentialsRequest(buffer_arg) {
  return admin_pb.ValidateCredentialsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_ValidateCredentialsResponse(arg) {
  if (!(arg instanceof admin_pb.ValidateCredentialsResponse)) {
    throw new Error('Expected argument of type orisun.ValidateCredentialsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_ValidateCredentialsResponse(buffer_arg) {
  return admin_pb.ValidateCredentialsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Admin service provides user management and administrative operations
var AdminService = exports['orisun.Admin'] = {
  // Boundary Management
createBoundary: {
    path: '/orisun.Admin/CreateBoundary',
    requestStream: false,
    responseStream: false,
    requestType: admin_pb.CreateBoundaryRequest,
    responseType: admin_pb.CreateBoundaryResponse,
    requestSerialize: serialize_orisun_CreateBoundaryRequest,
    requestDeserialize: deserialize_orisun_CreateBoundaryRequest,
    responseSerialize: serialize_orisun_CreateBoundaryResponse,
    responseDeserialize: deserialize_orisun_CreateBoundaryResponse,
  },
  listBoundaries: {
    path: '/orisun.Admin/ListBoundaries',
    requestStream: false,
    responseStream: false,
    requestType: admin_pb.ListBoundariesRequest,
    responseType: admin_pb.ListBoundariesResponse,
    requestSerialize: serialize_orisun_ListBoundariesRequest,
    requestDeserialize: deserialize_orisun_ListBoundariesRequest,
    responseSerialize: serialize_orisun_ListBoundariesResponse,
    responseDeserialize: deserialize_orisun_ListBoundariesResponse,
  },
  getBoundary: {
    path: '/orisun.Admin/GetBoundary',
    requestStream: false,
    responseStream: false,
    requestType: admin_pb.GetBoundaryRequest,
    responseType: admin_pb.GetBoundaryResponse,
    requestSerialize: serialize_orisun_GetBoundaryRequest,
    requestDeserialize: deserialize_orisun_GetBoundaryRequest,
    responseSerialize: serialize_orisun_GetBoundaryResponse,
    responseDeserialize: deserialize_orisun_GetBoundaryResponse,
  },
  // User Management
createUser: {
    path: '/orisun.Admin/CreateUser',
    requestStream: false,
    responseStream: false,
    requestType: admin_pb.CreateUserRequest,
    responseType: admin_pb.CreateUserResponse,
    requestSerialize: serialize_orisun_CreateUserRequest,
    requestDeserialize: deserialize_orisun_CreateUserRequest,
    responseSerialize: serialize_orisun_CreateUserResponse,
    responseDeserialize: deserialize_orisun_CreateUserResponse,
  },
  deleteUser: {
    path: '/orisun.Admin/DeleteUser',
    requestStream: false,
    responseStream: false,
    requestType: admin_pb.DeleteUserRequest,
    responseType: admin_pb.DeleteUserResponse,
    requestSerialize: serialize_orisun_DeleteUserRequest,
    requestDeserialize: deserialize_orisun_DeleteUserRequest,
    responseSerialize: serialize_orisun_DeleteUserResponse,
    responseDeserialize: deserialize_orisun_DeleteUserResponse,
  },
  changePassword: {
    path: '/orisun.Admin/ChangePassword',
    requestStream: false,
    responseStream: false,
    requestType: admin_pb.ChangePasswordRequest,
    responseType: admin_pb.ChangePasswordResponse,
    requestSerialize: serialize_orisun_ChangePasswordRequest,
    requestDeserialize: deserialize_orisun_ChangePasswordRequest,
    responseSerialize: serialize_orisun_ChangePasswordResponse,
    responseDeserialize: deserialize_orisun_ChangePasswordResponse,
  },
  setUserBoundaryPermissions: {
    path: '/orisun.Admin/SetUserBoundaryPermissions',
    requestStream: false,
    responseStream: false,
    requestType: admin_pb.SetUserBoundaryPermissionsRequest,
    responseType: admin_pb.SetUserBoundaryPermissionsResponse,
    requestSerialize: serialize_orisun_SetUserBoundaryPermissionsRequest,
    requestDeserialize: deserialize_orisun_SetUserBoundaryPermissionsRequest,
    responseSerialize: serialize_orisun_SetUserBoundaryPermissionsResponse,
    responseDeserialize: deserialize_orisun_SetUserBoundaryPermissionsResponse,
  },
  listUsers: {
    path: '/orisun.Admin/ListUsers',
    requestStream: false,
    responseStream: false,
    requestType: admin_pb.ListUsersRequest,
    responseType: admin_pb.ListUsersResponse,
    requestSerialize: serialize_orisun_ListUsersRequest,
    requestDeserialize: deserialize_orisun_ListUsersRequest,
    responseSerialize: serialize_orisun_ListUsersResponse,
    responseDeserialize: deserialize_orisun_ListUsersResponse,
  },
  // Authentication
validateCredentials: {
    path: '/orisun.Admin/ValidateCredentials',
    requestStream: false,
    responseStream: false,
    requestType: admin_pb.ValidateCredentialsRequest,
    responseType: admin_pb.ValidateCredentialsResponse,
    requestSerialize: serialize_orisun_ValidateCredentialsRequest,
    requestDeserialize: deserialize_orisun_ValidateCredentialsRequest,
    responseSerialize: serialize_orisun_ValidateCredentialsResponse,
    responseDeserialize: deserialize_orisun_ValidateCredentialsResponse,
  },
  // Statistics
getUserCount: {
    path: '/orisun.Admin/GetUserCount',
    requestStream: false,
    responseStream: false,
    requestType: admin_pb.GetUserCountRequest,
    responseType: admin_pb.GetUserCountResponse,
    requestSerialize: serialize_orisun_GetUserCountRequest,
    requestDeserialize: deserialize_orisun_GetUserCountRequest,
    responseSerialize: serialize_orisun_GetUserCountResponse,
    responseDeserialize: deserialize_orisun_GetUserCountResponse,
  },
  getEventCount: {
    path: '/orisun.Admin/GetEventCount',
    requestStream: false,
    responseStream: false,
    requestType: admin_pb.GetEventCountRequest,
    responseType: admin_pb.GetEventCountResponse,
    requestSerialize: serialize_orisun_GetEventCountRequest,
    requestDeserialize: deserialize_orisun_GetEventCountRequest,
    responseSerialize: serialize_orisun_GetEventCountResponse,
    responseDeserialize: deserialize_orisun_GetEventCountResponse,
  },
};

