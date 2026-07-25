// package: orisun
// file: eventstore.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class Position extends jspb.Message { 
    getCommitPosition(): number;
    setCommitPosition(value: number): Position;
    getPreparePosition(): number;
    setPreparePosition(value: number): Position;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Position.AsObject;
    static toObject(includeInstance: boolean, msg: Position): Position.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Position, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Position;
    static deserializeBinaryFromReader(message: Position, reader: jspb.BinaryReader): Position;
}

export namespace Position {
    export type AsObject = {
        commitPosition: number,
        preparePosition: number,
    }
}

export class Tag extends jspb.Message { 
    getKey(): string;
    setKey(value: string): Tag;
    getValue(): string;
    setValue(value: string): Tag;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Tag.AsObject;
    static toObject(includeInstance: boolean, msg: Tag): Tag.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Tag, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Tag;
    static deserializeBinaryFromReader(message: Tag, reader: jspb.BinaryReader): Tag;
}

export namespace Tag {
    export type AsObject = {
        key: string,
        value: string,
    }
}

export class Criterion extends jspb.Message { 
    clearTagsList(): void;
    getTagsList(): Array<Tag>;
    setTagsList(value: Array<Tag>): Criterion;
    addTags(value?: Tag, index?: number): Tag;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Criterion.AsObject;
    static toObject(includeInstance: boolean, msg: Criterion): Criterion.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Criterion, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Criterion;
    static deserializeBinaryFromReader(message: Criterion, reader: jspb.BinaryReader): Criterion;
}

export namespace Criterion {
    export type AsObject = {
        tagsList: Array<Tag.AsObject>,
    }
}

export class Query extends jspb.Message { 
    clearCriteriaList(): void;
    getCriteriaList(): Array<Criterion>;
    setCriteriaList(value: Array<Criterion>): Query;
    addCriteria(value?: Criterion, index?: number): Criterion;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Query.AsObject;
    static toObject(includeInstance: boolean, msg: Query): Query.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Query, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Query;
    static deserializeBinaryFromReader(message: Query, reader: jspb.BinaryReader): Query;
}

export namespace Query {
    export type AsObject = {
        criteriaList: Array<Criterion.AsObject>,
    }
}

export class EventToSave extends jspb.Message { 
    getEventId(): string;
    setEventId(value: string): EventToSave;
    getEventType(): string;
    setEventType(value: string): EventToSave;
    getData(): string;
    setData(value: string): EventToSave;
    getMetadata(): string;
    setMetadata(value: string): EventToSave;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EventToSave.AsObject;
    static toObject(includeInstance: boolean, msg: EventToSave): EventToSave.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EventToSave, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EventToSave;
    static deserializeBinaryFromReader(message: EventToSave, reader: jspb.BinaryReader): EventToSave;
}

export namespace EventToSave {
    export type AsObject = {
        eventId: string,
        eventType: string,
        data: string,
        metadata: string,
    }
}

export class Event extends jspb.Message { 
    getEventId(): string;
    setEventId(value: string): Event;
    getEventType(): string;
    setEventType(value: string): Event;
    getData(): string;
    setData(value: string): Event;
    getMetadata(): string;
    setMetadata(value: string): Event;

    hasPosition(): boolean;
    clearPosition(): void;
    getPosition(): Position | undefined;
    setPosition(value?: Position): Event;

    hasDateCreated(): boolean;
    clearDateCreated(): void;
    getDateCreated(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setDateCreated(value?: google_protobuf_timestamp_pb.Timestamp): Event;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Event.AsObject;
    static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Event;
    static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event;
}

export namespace Event {
    export type AsObject = {
        eventId: string,
        eventType: string,
        data: string,
        metadata: string,
        position?: Position.AsObject,
        dateCreated?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    }
}

export class WriteResult extends jspb.Message { 

    hasLogPosition(): boolean;
    clearLogPosition(): void;
    getLogPosition(): Position | undefined;
    setLogPosition(value?: Position): WriteResult;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WriteResult.AsObject;
    static toObject(includeInstance: boolean, msg: WriteResult): WriteResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WriteResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WriteResult;
    static deserializeBinaryFromReader(message: WriteResult, reader: jspb.BinaryReader): WriteResult;
}

export namespace WriteResult {
    export type AsObject = {
        logPosition?: Position.AsObject,
    }
}

export class SaveQuery extends jspb.Message { 

    hasExpectedPosition(): boolean;
    clearExpectedPosition(): void;
    getExpectedPosition(): Position | undefined;
    setExpectedPosition(value?: Position): SaveQuery;

    hasSubsetquery(): boolean;
    clearSubsetquery(): void;
    getSubsetquery(): Query | undefined;
    setSubsetquery(value?: Query): SaveQuery;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SaveQuery.AsObject;
    static toObject(includeInstance: boolean, msg: SaveQuery): SaveQuery.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SaveQuery, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SaveQuery;
    static deserializeBinaryFromReader(message: SaveQuery, reader: jspb.BinaryReader): SaveQuery;
}

export namespace SaveQuery {
    export type AsObject = {
        expectedPosition?: Position.AsObject,
        subsetquery?: Query.AsObject,
    }
}

export class SaveEventsRequest extends jspb.Message { 
    getBoundary(): string;
    setBoundary(value: string): SaveEventsRequest;

    hasQuery(): boolean;
    clearQuery(): void;
    getQuery(): SaveQuery | undefined;
    setQuery(value?: SaveQuery): SaveEventsRequest;
    clearEventsList(): void;
    getEventsList(): Array<EventToSave>;
    setEventsList(value: Array<EventToSave>): SaveEventsRequest;
    addEvents(value?: EventToSave, index?: number): EventToSave;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SaveEventsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SaveEventsRequest): SaveEventsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SaveEventsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SaveEventsRequest;
    static deserializeBinaryFromReader(message: SaveEventsRequest, reader: jspb.BinaryReader): SaveEventsRequest;
}

export namespace SaveEventsRequest {
    export type AsObject = {
        boundary: string,
        query?: SaveQuery.AsObject,
        eventsList: Array<EventToSave.AsObject>,
    }
}

export class GetEventsRequest extends jspb.Message { 

    hasQuery(): boolean;
    clearQuery(): void;
    getQuery(): Query | undefined;
    setQuery(value?: Query): GetEventsRequest;

    hasFromPosition(): boolean;
    clearFromPosition(): void;
    getFromPosition(): Position | undefined;
    setFromPosition(value?: Position): GetEventsRequest;
    getCount(): number;
    setCount(value: number): GetEventsRequest;
    getDirection(): Direction;
    setDirection(value: Direction): GetEventsRequest;
    getBoundary(): string;
    setBoundary(value: string): GetEventsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetEventsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetEventsRequest): GetEventsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetEventsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetEventsRequest;
    static deserializeBinaryFromReader(message: GetEventsRequest, reader: jspb.BinaryReader): GetEventsRequest;
}

export namespace GetEventsRequest {
    export type AsObject = {
        query?: Query.AsObject,
        fromPosition?: Position.AsObject,
        count: number,
        direction: Direction,
        boundary: string,
    }
}

export class GetEventsResponse extends jspb.Message { 
    clearEventsList(): void;
    getEventsList(): Array<Event>;
    setEventsList(value: Array<Event>): GetEventsResponse;
    addEvents(value?: Event, index?: number): Event;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetEventsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetEventsResponse): GetEventsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetEventsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetEventsResponse;
    static deserializeBinaryFromReader(message: GetEventsResponse, reader: jspb.BinaryReader): GetEventsResponse;
}

export namespace GetEventsResponse {
    export type AsObject = {
        eventsList: Array<Event.AsObject>,
    }
}

export class CatchUpSubscribeToEventStoreRequest extends jspb.Message { 

    hasAfterPosition(): boolean;
    clearAfterPosition(): void;
    getAfterPosition(): Position | undefined;
    setAfterPosition(value?: Position): CatchUpSubscribeToEventStoreRequest;

    hasQuery(): boolean;
    clearQuery(): void;
    getQuery(): Query | undefined;
    setQuery(value?: Query): CatchUpSubscribeToEventStoreRequest;
    getSubscriberName(): string;
    setSubscriberName(value: string): CatchUpSubscribeToEventStoreRequest;
    getBoundary(): string;
    setBoundary(value: string): CatchUpSubscribeToEventStoreRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CatchUpSubscribeToEventStoreRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CatchUpSubscribeToEventStoreRequest): CatchUpSubscribeToEventStoreRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CatchUpSubscribeToEventStoreRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CatchUpSubscribeToEventStoreRequest;
    static deserializeBinaryFromReader(message: CatchUpSubscribeToEventStoreRequest, reader: jspb.BinaryReader): CatchUpSubscribeToEventStoreRequest;
}

export namespace CatchUpSubscribeToEventStoreRequest {
    export type AsObject = {
        afterPosition?: Position.AsObject,
        query?: Query.AsObject,
        subscriberName: string,
        boundary: string,
    }
}

export class PingRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PingRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PingRequest): PingRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PingRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PingRequest;
    static deserializeBinaryFromReader(message: PingRequest, reader: jspb.BinaryReader): PingRequest;
}

export namespace PingRequest {
    export type AsObject = {
    }
}

export class PingResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PingResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PingResponse): PingResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PingResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PingResponse;
    static deserializeBinaryFromReader(message: PingResponse, reader: jspb.BinaryReader): PingResponse;
}

export namespace PingResponse {
    export type AsObject = {
    }
}

export class GetServerInfoRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetServerInfoRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetServerInfoRequest): GetServerInfoRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetServerInfoRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetServerInfoRequest;
    static deserializeBinaryFromReader(message: GetServerInfoRequest, reader: jspb.BinaryReader): GetServerInfoRequest;
}

export namespace GetServerInfoRequest {
    export type AsObject = {
    }
}

export class GetServerInfoResponse extends jspb.Message { 
    getVersion(): string;
    setVersion(value: string): GetServerInfoResponse;
    getGitCommit(): string;
    setGitCommit(value: string): GetServerInfoResponse;
    getBuildTime(): string;
    setBuildTime(value: string): GetServerInfoResponse;
    getBackend(): StorageBackend;
    setBackend(value: StorageBackend): GetServerInfoResponse;
    getNodeId(): string;
    setNodeId(value: string): GetServerInfoResponse;
    clearCapabilitiesList(): void;
    getCapabilitiesList(): Array<ServerCapability>;
    setCapabilitiesList(value: Array<ServerCapability>): GetServerInfoResponse;
    addCapabilities(value: ServerCapability, index?: number): ServerCapability;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetServerInfoResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetServerInfoResponse): GetServerInfoResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetServerInfoResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetServerInfoResponse;
    static deserializeBinaryFromReader(message: GetServerInfoResponse, reader: jspb.BinaryReader): GetServerInfoResponse;
}

export namespace GetServerInfoResponse {
    export type AsObject = {
        version: string,
        gitCommit: string,
        buildTime: string,
        backend: StorageBackend,
        nodeId: string,
        capabilitiesList: Array<ServerCapability>,
    }
}

export class GetLatestByCriteriaRequest extends jspb.Message { 
    getBoundary(): string;
    setBoundary(value: string): GetLatestByCriteriaRequest;
    clearCriteriaList(): void;
    getCriteriaList(): Array<Criterion>;
    setCriteriaList(value: Array<Criterion>): GetLatestByCriteriaRequest;
    addCriteria(value?: Criterion, index?: number): Criterion;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetLatestByCriteriaRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetLatestByCriteriaRequest): GetLatestByCriteriaRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetLatestByCriteriaRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetLatestByCriteriaRequest;
    static deserializeBinaryFromReader(message: GetLatestByCriteriaRequest, reader: jspb.BinaryReader): GetLatestByCriteriaRequest;
}

export namespace GetLatestByCriteriaRequest {
    export type AsObject = {
        boundary: string,
        criteriaList: Array<Criterion.AsObject>,
    }
}

export class LatestCriterionResult extends jspb.Message { 

    hasCriterion(): boolean;
    clearCriterion(): void;
    getCriterion(): Criterion | undefined;
    setCriterion(value?: Criterion): LatestCriterionResult;

    hasEvent(): boolean;
    clearEvent(): void;
    getEvent(): Event | undefined;
    setEvent(value?: Event): LatestCriterionResult;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LatestCriterionResult.AsObject;
    static toObject(includeInstance: boolean, msg: LatestCriterionResult): LatestCriterionResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LatestCriterionResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LatestCriterionResult;
    static deserializeBinaryFromReader(message: LatestCriterionResult, reader: jspb.BinaryReader): LatestCriterionResult;
}

export namespace LatestCriterionResult {
    export type AsObject = {
        criterion?: Criterion.AsObject,
        event?: Event.AsObject,
    }
}

export class GetLatestByCriteriaResponse extends jspb.Message { 
    clearResultsList(): void;
    getResultsList(): Array<LatestCriterionResult>;
    setResultsList(value: Array<LatestCriterionResult>): GetLatestByCriteriaResponse;
    addResults(value?: LatestCriterionResult, index?: number): LatestCriterionResult;

    hasContextPosition(): boolean;
    clearContextPosition(): void;
    getContextPosition(): Position | undefined;
    setContextPosition(value?: Position): GetLatestByCriteriaResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetLatestByCriteriaResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetLatestByCriteriaResponse): GetLatestByCriteriaResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetLatestByCriteriaResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetLatestByCriteriaResponse;
    static deserializeBinaryFromReader(message: GetLatestByCriteriaResponse, reader: jspb.BinaryReader): GetLatestByCriteriaResponse;
}

export namespace GetLatestByCriteriaResponse {
    export type AsObject = {
        resultsList: Array<LatestCriterionResult.AsObject>,
        contextPosition?: Position.AsObject,
    }
}

export class IndexField extends jspb.Message { 
    getJsonKey(): string;
    setJsonKey(value: string): IndexField;
    getValueType(): ValueType;
    setValueType(value: ValueType): IndexField;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IndexField.AsObject;
    static toObject(includeInstance: boolean, msg: IndexField): IndexField.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: IndexField, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IndexField;
    static deserializeBinaryFromReader(message: IndexField, reader: jspb.BinaryReader): IndexField;
}

export namespace IndexField {
    export type AsObject = {
        jsonKey: string,
        valueType: ValueType,
    }
}

export class IndexCondition extends jspb.Message { 
    getKey(): string;
    setKey(value: string): IndexCondition;
    getOperator(): string;
    setOperator(value: string): IndexCondition;
    getValue(): string;
    setValue(value: string): IndexCondition;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IndexCondition.AsObject;
    static toObject(includeInstance: boolean, msg: IndexCondition): IndexCondition.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: IndexCondition, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IndexCondition;
    static deserializeBinaryFromReader(message: IndexCondition, reader: jspb.BinaryReader): IndexCondition;
}

export namespace IndexCondition {
    export type AsObject = {
        key: string,
        operator: string,
        value: string,
    }
}

export class CreateIndexRequest extends jspb.Message { 
    getBoundary(): string;
    setBoundary(value: string): CreateIndexRequest;
    getName(): string;
    setName(value: string): CreateIndexRequest;
    clearFieldsList(): void;
    getFieldsList(): Array<IndexField>;
    setFieldsList(value: Array<IndexField>): CreateIndexRequest;
    addFields(value?: IndexField, index?: number): IndexField;
    clearConditionsList(): void;
    getConditionsList(): Array<IndexCondition>;
    setConditionsList(value: Array<IndexCondition>): CreateIndexRequest;
    addConditions(value?: IndexCondition, index?: number): IndexCondition;
    getConditionCombinator(): ConditionCombinator;
    setConditionCombinator(value: ConditionCombinator): CreateIndexRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateIndexRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateIndexRequest): CreateIndexRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateIndexRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateIndexRequest;
    static deserializeBinaryFromReader(message: CreateIndexRequest, reader: jspb.BinaryReader): CreateIndexRequest;
}

export namespace CreateIndexRequest {
    export type AsObject = {
        boundary: string,
        name: string,
        fieldsList: Array<IndexField.AsObject>,
        conditionsList: Array<IndexCondition.AsObject>,
        conditionCombinator: ConditionCombinator,
    }
}

export class CreateIndexResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateIndexResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateIndexResponse): CreateIndexResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateIndexResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateIndexResponse;
    static deserializeBinaryFromReader(message: CreateIndexResponse, reader: jspb.BinaryReader): CreateIndexResponse;
}

export namespace CreateIndexResponse {
    export type AsObject = {
    }
}

export class DropIndexRequest extends jspb.Message { 
    getBoundary(): string;
    setBoundary(value: string): DropIndexRequest;
    getName(): string;
    setName(value: string): DropIndexRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DropIndexRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DropIndexRequest): DropIndexRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DropIndexRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DropIndexRequest;
    static deserializeBinaryFromReader(message: DropIndexRequest, reader: jspb.BinaryReader): DropIndexRequest;
}

export namespace DropIndexRequest {
    export type AsObject = {
        boundary: string,
        name: string,
    }
}

export class DropIndexResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DropIndexResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DropIndexResponse): DropIndexResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DropIndexResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DropIndexResponse;
    static deserializeBinaryFromReader(message: DropIndexResponse, reader: jspb.BinaryReader): DropIndexResponse;
}

export namespace DropIndexResponse {
    export type AsObject = {
    }
}

export enum Direction {
    ASC = 0,
    DESC = 1,
}

export enum StorageBackend {
    STORAGE_BACKEND_UNSPECIFIED = 0,
    STORAGE_BACKEND_POSTGRES = 1,
    STORAGE_BACKEND_SQLITE = 2,
    STORAGE_BACKEND_FOUNDATIONDB = 3,
}

export enum ServerCapability {
    SERVER_CAPABILITY_UNSPECIFIED = 0,
    SERVER_CAPABILITY_COMMAND_CONTEXT_CONSISTENCY = 1,
    SERVER_CAPABILITY_CATCH_UP_SUBSCRIPTIONS = 2,
    SERVER_CAPABILITY_INDEX_MANAGEMENT = 3,
    SERVER_CAPABILITY_BOUNDARY_CATALOG = 4,
    SERVER_CAPABILITY_GRPC_HEALTH = 5,
}

export enum ValueType {
    TEXT = 0,
    NUMERIC = 1,
    BOOLEAN = 2,
    TIMESTAMPTZ = 3,
}

export enum ConditionCombinator {
    AND = 0,
    OR = 1,
}
