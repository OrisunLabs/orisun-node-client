// GENERATED CODE -- DO NOT EDIT!

'use strict';
var eventstore_pb = require('./eventstore_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_orisun_CatchUpSubscribeToEventStoreRequest(arg) {
  if (!(arg instanceof eventstore_pb.CatchUpSubscribeToEventStoreRequest)) {
    throw new Error('Expected argument of type orisun.CatchUpSubscribeToEventStoreRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_CatchUpSubscribeToEventStoreRequest(buffer_arg) {
  return eventstore_pb.CatchUpSubscribeToEventStoreRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_CreateIndexRequest(arg) {
  if (!(arg instanceof eventstore_pb.CreateIndexRequest)) {
    throw new Error('Expected argument of type orisun.CreateIndexRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_CreateIndexRequest(buffer_arg) {
  return eventstore_pb.CreateIndexRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_CreateIndexResponse(arg) {
  if (!(arg instanceof eventstore_pb.CreateIndexResponse)) {
    throw new Error('Expected argument of type orisun.CreateIndexResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_CreateIndexResponse(buffer_arg) {
  return eventstore_pb.CreateIndexResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_DropIndexRequest(arg) {
  if (!(arg instanceof eventstore_pb.DropIndexRequest)) {
    throw new Error('Expected argument of type orisun.DropIndexRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_DropIndexRequest(buffer_arg) {
  return eventstore_pb.DropIndexRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_DropIndexResponse(arg) {
  if (!(arg instanceof eventstore_pb.DropIndexResponse)) {
    throw new Error('Expected argument of type orisun.DropIndexResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_DropIndexResponse(buffer_arg) {
  return eventstore_pb.DropIndexResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_Event(arg) {
  if (!(arg instanceof eventstore_pb.Event)) {
    throw new Error('Expected argument of type orisun.Event');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_Event(buffer_arg) {
  return eventstore_pb.Event.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_GetEventsRequest(arg) {
  if (!(arg instanceof eventstore_pb.GetEventsRequest)) {
    throw new Error('Expected argument of type orisun.GetEventsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_GetEventsRequest(buffer_arg) {
  return eventstore_pb.GetEventsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_GetEventsResponse(arg) {
  if (!(arg instanceof eventstore_pb.GetEventsResponse)) {
    throw new Error('Expected argument of type orisun.GetEventsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_GetEventsResponse(buffer_arg) {
  return eventstore_pb.GetEventsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_GetIndexRequest(arg) {
  if (!(arg instanceof eventstore_pb.GetIndexRequest)) {
    throw new Error('Expected argument of type orisun.GetIndexRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_GetIndexRequest(buffer_arg) {
  return eventstore_pb.GetIndexRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_GetIndexResponse(arg) {
  if (!(arg instanceof eventstore_pb.GetIndexResponse)) {
    throw new Error('Expected argument of type orisun.GetIndexResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_GetIndexResponse(buffer_arg) {
  return eventstore_pb.GetIndexResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_GetLatestByCriteriaRequest(arg) {
  if (!(arg instanceof eventstore_pb.GetLatestByCriteriaRequest)) {
    throw new Error('Expected argument of type orisun.GetLatestByCriteriaRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_GetLatestByCriteriaRequest(buffer_arg) {
  return eventstore_pb.GetLatestByCriteriaRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_GetLatestByCriteriaResponse(arg) {
  if (!(arg instanceof eventstore_pb.GetLatestByCriteriaResponse)) {
    throw new Error('Expected argument of type orisun.GetLatestByCriteriaResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_GetLatestByCriteriaResponse(buffer_arg) {
  return eventstore_pb.GetLatestByCriteriaResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_GetServerInfoRequest(arg) {
  if (!(arg instanceof eventstore_pb.GetServerInfoRequest)) {
    throw new Error('Expected argument of type orisun.GetServerInfoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_GetServerInfoRequest(buffer_arg) {
  return eventstore_pb.GetServerInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_GetServerInfoResponse(arg) {
  if (!(arg instanceof eventstore_pb.GetServerInfoResponse)) {
    throw new Error('Expected argument of type orisun.GetServerInfoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_GetServerInfoResponse(buffer_arg) {
  return eventstore_pb.GetServerInfoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_ListIndexesRequest(arg) {
  if (!(arg instanceof eventstore_pb.ListIndexesRequest)) {
    throw new Error('Expected argument of type orisun.ListIndexesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_ListIndexesRequest(buffer_arg) {
  return eventstore_pb.ListIndexesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_ListIndexesResponse(arg) {
  if (!(arg instanceof eventstore_pb.ListIndexesResponse)) {
    throw new Error('Expected argument of type orisun.ListIndexesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_ListIndexesResponse(buffer_arg) {
  return eventstore_pb.ListIndexesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_PingRequest(arg) {
  if (!(arg instanceof eventstore_pb.PingRequest)) {
    throw new Error('Expected argument of type orisun.PingRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_PingRequest(buffer_arg) {
  return eventstore_pb.PingRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_PingResponse(arg) {
  if (!(arg instanceof eventstore_pb.PingResponse)) {
    throw new Error('Expected argument of type orisun.PingResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_PingResponse(buffer_arg) {
  return eventstore_pb.PingResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_SaveEventsRequest(arg) {
  if (!(arg instanceof eventstore_pb.SaveEventsRequest)) {
    throw new Error('Expected argument of type orisun.SaveEventsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_SaveEventsRequest(buffer_arg) {
  return eventstore_pb.SaveEventsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orisun_WriteResult(arg) {
  if (!(arg instanceof eventstore_pb.WriteResult)) {
    throw new Error('Expected argument of type orisun.WriteResult');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orisun_WriteResult(buffer_arg) {
  return eventstore_pb.WriteResult.deserializeBinary(new Uint8Array(buffer_arg));
}


var EventStoreService = exports['orisun.EventStore'] = {
  saveEvents: {
    path: '/orisun.EventStore/SaveEvents',
    requestStream: false,
    responseStream: false,
    requestType: eventstore_pb.SaveEventsRequest,
    responseType: eventstore_pb.WriteResult,
    requestSerialize: serialize_orisun_SaveEventsRequest,
    requestDeserialize: deserialize_orisun_SaveEventsRequest,
    responseSerialize: serialize_orisun_WriteResult,
    responseDeserialize: deserialize_orisun_WriteResult,
  },
  getEvents: {
    path: '/orisun.EventStore/GetEvents',
    requestStream: false,
    responseStream: false,
    requestType: eventstore_pb.GetEventsRequest,
    responseType: eventstore_pb.GetEventsResponse,
    requestSerialize: serialize_orisun_GetEventsRequest,
    requestDeserialize: deserialize_orisun_GetEventsRequest,
    responseSerialize: serialize_orisun_GetEventsResponse,
    responseDeserialize: deserialize_orisun_GetEventsResponse,
  },
  getLatestByCriteria: {
    path: '/orisun.EventStore/GetLatestByCriteria',
    requestStream: false,
    responseStream: false,
    requestType: eventstore_pb.GetLatestByCriteriaRequest,
    responseType: eventstore_pb.GetLatestByCriteriaResponse,
    requestSerialize: serialize_orisun_GetLatestByCriteriaRequest,
    requestDeserialize: deserialize_orisun_GetLatestByCriteriaRequest,
    responseSerialize: serialize_orisun_GetLatestByCriteriaResponse,
    responseDeserialize: deserialize_orisun_GetLatestByCriteriaResponse,
  },
  catchUpSubscribeToEvents: {
    path: '/orisun.EventStore/CatchUpSubscribeToEvents',
    requestStream: false,
    responseStream: true,
    requestType: eventstore_pb.CatchUpSubscribeToEventStoreRequest,
    responseType: eventstore_pb.Event,
    requestSerialize: serialize_orisun_CatchUpSubscribeToEventStoreRequest,
    requestDeserialize: deserialize_orisun_CatchUpSubscribeToEventStoreRequest,
    responseSerialize: serialize_orisun_Event,
    responseDeserialize: deserialize_orisun_Event,
  },
  ping: {
    path: '/orisun.EventStore/Ping',
    requestStream: false,
    responseStream: false,
    requestType: eventstore_pb.PingRequest,
    responseType: eventstore_pb.PingResponse,
    requestSerialize: serialize_orisun_PingRequest,
    requestDeserialize: deserialize_orisun_PingRequest,
    responseSerialize: serialize_orisun_PingResponse,
    responseDeserialize: deserialize_orisun_PingResponse,
  },
  getServerInfo: {
    path: '/orisun.EventStore/GetServerInfo',
    requestStream: false,
    responseStream: false,
    requestType: eventstore_pb.GetServerInfoRequest,
    responseType: eventstore_pb.GetServerInfoResponse,
    requestSerialize: serialize_orisun_GetServerInfoRequest,
    requestDeserialize: deserialize_orisun_GetServerInfoRequest,
    responseSerialize: serialize_orisun_GetServerInfoResponse,
    responseDeserialize: deserialize_orisun_GetServerInfoResponse,
  },
  createIndex: {
    path: '/orisun.EventStore/CreateIndex',
    requestStream: false,
    responseStream: false,
    requestType: eventstore_pb.CreateIndexRequest,
    responseType: eventstore_pb.CreateIndexResponse,
    requestSerialize: serialize_orisun_CreateIndexRequest,
    requestDeserialize: deserialize_orisun_CreateIndexRequest,
    responseSerialize: serialize_orisun_CreateIndexResponse,
    responseDeserialize: deserialize_orisun_CreateIndexResponse,
  },
  dropIndex: {
    path: '/orisun.EventStore/DropIndex',
    requestStream: false,
    responseStream: false,
    requestType: eventstore_pb.DropIndexRequest,
    responseType: eventstore_pb.DropIndexResponse,
    requestSerialize: serialize_orisun_DropIndexRequest,
    requestDeserialize: deserialize_orisun_DropIndexRequest,
    responseSerialize: serialize_orisun_DropIndexResponse,
    responseDeserialize: deserialize_orisun_DropIndexResponse,
  },
  listIndexes: {
    path: '/orisun.EventStore/ListIndexes',
    requestStream: false,
    responseStream: false,
    requestType: eventstore_pb.ListIndexesRequest,
    responseType: eventstore_pb.ListIndexesResponse,
    requestSerialize: serialize_orisun_ListIndexesRequest,
    requestDeserialize: deserialize_orisun_ListIndexesRequest,
    responseSerialize: serialize_orisun_ListIndexesResponse,
    responseDeserialize: deserialize_orisun_ListIndexesResponse,
  },
  getIndex: {
    path: '/orisun.EventStore/GetIndex',
    requestStream: false,
    responseStream: false,
    requestType: eventstore_pb.GetIndexRequest,
    responseType: eventstore_pb.GetIndexResponse,
    requestSerialize: serialize_orisun_GetIndexRequest,
    requestDeserialize: deserialize_orisun_GetIndexRequest,
    responseSerialize: serialize_orisun_GetIndexResponse,
    responseDeserialize: deserialize_orisun_GetIndexResponse,
  },
};

