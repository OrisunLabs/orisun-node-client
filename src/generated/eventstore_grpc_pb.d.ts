// package: orisun
// file: eventstore.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as eventstore_pb from "./eventstore_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

interface IEventStoreService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    saveEvents: IEventStoreService_ISaveEvents;
    getEvents: IEventStoreService_IGetEvents;
    getLatestByCriteria: IEventStoreService_IGetLatestByCriteria;
    catchUpSubscribeToEvents: IEventStoreService_ICatchUpSubscribeToEvents;
    ping: IEventStoreService_IPing;
    getServerInfo: IEventStoreService_IGetServerInfo;
    createIndex: IEventStoreService_ICreateIndex;
    dropIndex: IEventStoreService_IDropIndex;
}

interface IEventStoreService_ISaveEvents extends grpc.MethodDefinition<eventstore_pb.SaveEventsRequest, eventstore_pb.WriteResult> {
    path: "/orisun.EventStore/SaveEvents";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<eventstore_pb.SaveEventsRequest>;
    requestDeserialize: grpc.deserialize<eventstore_pb.SaveEventsRequest>;
    responseSerialize: grpc.serialize<eventstore_pb.WriteResult>;
    responseDeserialize: grpc.deserialize<eventstore_pb.WriteResult>;
}
interface IEventStoreService_IGetEvents extends grpc.MethodDefinition<eventstore_pb.GetEventsRequest, eventstore_pb.GetEventsResponse> {
    path: "/orisun.EventStore/GetEvents";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<eventstore_pb.GetEventsRequest>;
    requestDeserialize: grpc.deserialize<eventstore_pb.GetEventsRequest>;
    responseSerialize: grpc.serialize<eventstore_pb.GetEventsResponse>;
    responseDeserialize: grpc.deserialize<eventstore_pb.GetEventsResponse>;
}
interface IEventStoreService_IGetLatestByCriteria extends grpc.MethodDefinition<eventstore_pb.GetLatestByCriteriaRequest, eventstore_pb.GetLatestByCriteriaResponse> {
    path: "/orisun.EventStore/GetLatestByCriteria";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<eventstore_pb.GetLatestByCriteriaRequest>;
    requestDeserialize: grpc.deserialize<eventstore_pb.GetLatestByCriteriaRequest>;
    responseSerialize: grpc.serialize<eventstore_pb.GetLatestByCriteriaResponse>;
    responseDeserialize: grpc.deserialize<eventstore_pb.GetLatestByCriteriaResponse>;
}
interface IEventStoreService_ICatchUpSubscribeToEvents extends grpc.MethodDefinition<eventstore_pb.CatchUpSubscribeToEventStoreRequest, eventstore_pb.Event> {
    path: "/orisun.EventStore/CatchUpSubscribeToEvents";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<eventstore_pb.CatchUpSubscribeToEventStoreRequest>;
    requestDeserialize: grpc.deserialize<eventstore_pb.CatchUpSubscribeToEventStoreRequest>;
    responseSerialize: grpc.serialize<eventstore_pb.Event>;
    responseDeserialize: grpc.deserialize<eventstore_pb.Event>;
}
interface IEventStoreService_IPing extends grpc.MethodDefinition<eventstore_pb.PingRequest, eventstore_pb.PingResponse> {
    path: "/orisun.EventStore/Ping";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<eventstore_pb.PingRequest>;
    requestDeserialize: grpc.deserialize<eventstore_pb.PingRequest>;
    responseSerialize: grpc.serialize<eventstore_pb.PingResponse>;
    responseDeserialize: grpc.deserialize<eventstore_pb.PingResponse>;
}
interface IEventStoreService_IGetServerInfo extends grpc.MethodDefinition<eventstore_pb.GetServerInfoRequest, eventstore_pb.GetServerInfoResponse> {
    path: "/orisun.EventStore/GetServerInfo";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<eventstore_pb.GetServerInfoRequest>;
    requestDeserialize: grpc.deserialize<eventstore_pb.GetServerInfoRequest>;
    responseSerialize: grpc.serialize<eventstore_pb.GetServerInfoResponse>;
    responseDeserialize: grpc.deserialize<eventstore_pb.GetServerInfoResponse>;
}
interface IEventStoreService_ICreateIndex extends grpc.MethodDefinition<eventstore_pb.CreateIndexRequest, eventstore_pb.CreateIndexResponse> {
    path: "/orisun.EventStore/CreateIndex";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<eventstore_pb.CreateIndexRequest>;
    requestDeserialize: grpc.deserialize<eventstore_pb.CreateIndexRequest>;
    responseSerialize: grpc.serialize<eventstore_pb.CreateIndexResponse>;
    responseDeserialize: grpc.deserialize<eventstore_pb.CreateIndexResponse>;
}
interface IEventStoreService_IDropIndex extends grpc.MethodDefinition<eventstore_pb.DropIndexRequest, eventstore_pb.DropIndexResponse> {
    path: "/orisun.EventStore/DropIndex";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<eventstore_pb.DropIndexRequest>;
    requestDeserialize: grpc.deserialize<eventstore_pb.DropIndexRequest>;
    responseSerialize: grpc.serialize<eventstore_pb.DropIndexResponse>;
    responseDeserialize: grpc.deserialize<eventstore_pb.DropIndexResponse>;
}

export const EventStoreService: IEventStoreService;

export interface IEventStoreServer extends grpc.UntypedServiceImplementation {
    saveEvents: grpc.handleUnaryCall<eventstore_pb.SaveEventsRequest, eventstore_pb.WriteResult>;
    getEvents: grpc.handleUnaryCall<eventstore_pb.GetEventsRequest, eventstore_pb.GetEventsResponse>;
    getLatestByCriteria: grpc.handleUnaryCall<eventstore_pb.GetLatestByCriteriaRequest, eventstore_pb.GetLatestByCriteriaResponse>;
    catchUpSubscribeToEvents: grpc.handleServerStreamingCall<eventstore_pb.CatchUpSubscribeToEventStoreRequest, eventstore_pb.Event>;
    ping: grpc.handleUnaryCall<eventstore_pb.PingRequest, eventstore_pb.PingResponse>;
    getServerInfo: grpc.handleUnaryCall<eventstore_pb.GetServerInfoRequest, eventstore_pb.GetServerInfoResponse>;
    createIndex: grpc.handleUnaryCall<eventstore_pb.CreateIndexRequest, eventstore_pb.CreateIndexResponse>;
    dropIndex: grpc.handleUnaryCall<eventstore_pb.DropIndexRequest, eventstore_pb.DropIndexResponse>;
}

export interface IEventStoreClient {
    saveEvents(request: eventstore_pb.SaveEventsRequest, callback: (error: grpc.ServiceError | null, response: eventstore_pb.WriteResult) => void): grpc.ClientUnaryCall;
    saveEvents(request: eventstore_pb.SaveEventsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: eventstore_pb.WriteResult) => void): grpc.ClientUnaryCall;
    saveEvents(request: eventstore_pb.SaveEventsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: eventstore_pb.WriteResult) => void): grpc.ClientUnaryCall;
    getEvents(request: eventstore_pb.GetEventsRequest, callback: (error: grpc.ServiceError | null, response: eventstore_pb.GetEventsResponse) => void): grpc.ClientUnaryCall;
    getEvents(request: eventstore_pb.GetEventsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: eventstore_pb.GetEventsResponse) => void): grpc.ClientUnaryCall;
    getEvents(request: eventstore_pb.GetEventsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: eventstore_pb.GetEventsResponse) => void): grpc.ClientUnaryCall;
    getLatestByCriteria(request: eventstore_pb.GetLatestByCriteriaRequest, callback: (error: grpc.ServiceError | null, response: eventstore_pb.GetLatestByCriteriaResponse) => void): grpc.ClientUnaryCall;
    getLatestByCriteria(request: eventstore_pb.GetLatestByCriteriaRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: eventstore_pb.GetLatestByCriteriaResponse) => void): grpc.ClientUnaryCall;
    getLatestByCriteria(request: eventstore_pb.GetLatestByCriteriaRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: eventstore_pb.GetLatestByCriteriaResponse) => void): grpc.ClientUnaryCall;
    catchUpSubscribeToEvents(request: eventstore_pb.CatchUpSubscribeToEventStoreRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<eventstore_pb.Event>;
    catchUpSubscribeToEvents(request: eventstore_pb.CatchUpSubscribeToEventStoreRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<eventstore_pb.Event>;
    ping(request: eventstore_pb.PingRequest, callback: (error: grpc.ServiceError | null, response: eventstore_pb.PingResponse) => void): grpc.ClientUnaryCall;
    ping(request: eventstore_pb.PingRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: eventstore_pb.PingResponse) => void): grpc.ClientUnaryCall;
    ping(request: eventstore_pb.PingRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: eventstore_pb.PingResponse) => void): grpc.ClientUnaryCall;
    getServerInfo(request: eventstore_pb.GetServerInfoRequest, callback: (error: grpc.ServiceError | null, response: eventstore_pb.GetServerInfoResponse) => void): grpc.ClientUnaryCall;
    getServerInfo(request: eventstore_pb.GetServerInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: eventstore_pb.GetServerInfoResponse) => void): grpc.ClientUnaryCall;
    getServerInfo(request: eventstore_pb.GetServerInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: eventstore_pb.GetServerInfoResponse) => void): grpc.ClientUnaryCall;
    createIndex(request: eventstore_pb.CreateIndexRequest, callback: (error: grpc.ServiceError | null, response: eventstore_pb.CreateIndexResponse) => void): grpc.ClientUnaryCall;
    createIndex(request: eventstore_pb.CreateIndexRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: eventstore_pb.CreateIndexResponse) => void): grpc.ClientUnaryCall;
    createIndex(request: eventstore_pb.CreateIndexRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: eventstore_pb.CreateIndexResponse) => void): grpc.ClientUnaryCall;
    dropIndex(request: eventstore_pb.DropIndexRequest, callback: (error: grpc.ServiceError | null, response: eventstore_pb.DropIndexResponse) => void): grpc.ClientUnaryCall;
    dropIndex(request: eventstore_pb.DropIndexRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: eventstore_pb.DropIndexResponse) => void): grpc.ClientUnaryCall;
    dropIndex(request: eventstore_pb.DropIndexRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: eventstore_pb.DropIndexResponse) => void): grpc.ClientUnaryCall;
}

export class EventStoreClient extends grpc.Client implements IEventStoreClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public saveEvents(request: eventstore_pb.SaveEventsRequest, callback: (error: grpc.ServiceError | null, response: eventstore_pb.WriteResult) => void): grpc.ClientUnaryCall;
    public saveEvents(request: eventstore_pb.SaveEventsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: eventstore_pb.WriteResult) => void): grpc.ClientUnaryCall;
    public saveEvents(request: eventstore_pb.SaveEventsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: eventstore_pb.WriteResult) => void): grpc.ClientUnaryCall;
    public getEvents(request: eventstore_pb.GetEventsRequest, callback: (error: grpc.ServiceError | null, response: eventstore_pb.GetEventsResponse) => void): grpc.ClientUnaryCall;
    public getEvents(request: eventstore_pb.GetEventsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: eventstore_pb.GetEventsResponse) => void): grpc.ClientUnaryCall;
    public getEvents(request: eventstore_pb.GetEventsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: eventstore_pb.GetEventsResponse) => void): grpc.ClientUnaryCall;
    public getLatestByCriteria(request: eventstore_pb.GetLatestByCriteriaRequest, callback: (error: grpc.ServiceError | null, response: eventstore_pb.GetLatestByCriteriaResponse) => void): grpc.ClientUnaryCall;
    public getLatestByCriteria(request: eventstore_pb.GetLatestByCriteriaRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: eventstore_pb.GetLatestByCriteriaResponse) => void): grpc.ClientUnaryCall;
    public getLatestByCriteria(request: eventstore_pb.GetLatestByCriteriaRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: eventstore_pb.GetLatestByCriteriaResponse) => void): grpc.ClientUnaryCall;
    public catchUpSubscribeToEvents(request: eventstore_pb.CatchUpSubscribeToEventStoreRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<eventstore_pb.Event>;
    public catchUpSubscribeToEvents(request: eventstore_pb.CatchUpSubscribeToEventStoreRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<eventstore_pb.Event>;
    public ping(request: eventstore_pb.PingRequest, callback: (error: grpc.ServiceError | null, response: eventstore_pb.PingResponse) => void): grpc.ClientUnaryCall;
    public ping(request: eventstore_pb.PingRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: eventstore_pb.PingResponse) => void): grpc.ClientUnaryCall;
    public ping(request: eventstore_pb.PingRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: eventstore_pb.PingResponse) => void): grpc.ClientUnaryCall;
    public getServerInfo(request: eventstore_pb.GetServerInfoRequest, callback: (error: grpc.ServiceError | null, response: eventstore_pb.GetServerInfoResponse) => void): grpc.ClientUnaryCall;
    public getServerInfo(request: eventstore_pb.GetServerInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: eventstore_pb.GetServerInfoResponse) => void): grpc.ClientUnaryCall;
    public getServerInfo(request: eventstore_pb.GetServerInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: eventstore_pb.GetServerInfoResponse) => void): grpc.ClientUnaryCall;
    public createIndex(request: eventstore_pb.CreateIndexRequest, callback: (error: grpc.ServiceError | null, response: eventstore_pb.CreateIndexResponse) => void): grpc.ClientUnaryCall;
    public createIndex(request: eventstore_pb.CreateIndexRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: eventstore_pb.CreateIndexResponse) => void): grpc.ClientUnaryCall;
    public createIndex(request: eventstore_pb.CreateIndexRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: eventstore_pb.CreateIndexResponse) => void): grpc.ClientUnaryCall;
    public dropIndex(request: eventstore_pb.DropIndexRequest, callback: (error: grpc.ServiceError | null, response: eventstore_pb.DropIndexResponse) => void): grpc.ClientUnaryCall;
    public dropIndex(request: eventstore_pb.DropIndexRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: eventstore_pb.DropIndexResponse) => void): grpc.ClientUnaryCall;
    public dropIndex(request: eventstore_pb.DropIndexRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: eventstore_pb.DropIndexResponse) => void): grpc.ClientUnaryCall;
}
