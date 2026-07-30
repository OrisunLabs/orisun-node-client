# Orisun Event Store - Node.js Client

A Node.js client library for interacting with the Orisun Event Store, providing a simple and intuitive API for event sourcing operations.

## Features

- **Event Storage**: Save events with Command Context Consistency
- **Event Retrieval**: Read events by content criteria and position
- **Latest Context Reads**: Fetch the latest event per criterion from one consistency snapshot
- **Event Subscriptions**: Subscribe to real-time event streams
- **Multi-tenancy**: Support for boundary-based tenant isolation
- **TypeScript Support**: Full TypeScript definitions included
- **gRPC Communication**: High-performance gRPC protocol
- **Authentication**: Built-in support for basic authentication
- **Load Balancing**: Support for multiple hosts and DNS-based load balancing
- **Resilience**: Built-in connection management and error handling
- **Logging**: Configurable logging for debugging and monitoring

## Installation

### Install from GitHub

Add to your `package.json`:

```json
{
  "dependencies": {
    "@orisun/eventstore-client": "github:OrisunLabs/orisun-node-client#master"
  }
}
```

Then run:

```bash
npm install
```

Or install directly:

```bash
npm install github:OrisunLabs/orisun-node-client#master
```

The client will be installed from the `clients/node` directory in the repository (as specified in the package.json `repository.directory` field).

### From npm (Coming Soon)

We're planning to publish to npm as `@orisun/eventstore-client` soon.

## Importing the Client

### TypeScript / ES6 Modules

```typescript
import { EventStoreClient } from '@orisun/eventstore-client';

// Or import specific types
import { EventStoreClient, Event, EventToSave } from '@orisun/eventstore-client';
```

### CommonJS / Node.js

```javascript
const { EventStoreClient } = require('@orisun/eventstore-client');

// Or using destructuring for multiple imports
const { EventStoreClient, Event, EventToSave } = require('@orisun/eventstore-client');
```

### Default Import (Alternative)

```typescript
import EventStoreClient from '@orisun/eventstore-client';
```

## Quick Start

```typescript
import { EventStoreClient } from '@orisun/eventstore-client';

// Create a client
const client = new EventStoreClient({
  // Connection options (choose one approach)
  
  // Option 1: Single server
  host: 'localhost',
  port: 5005,
  
  // Option 2: Multiple hosts for load balancing
  // host: 'eventstore1.example.com,eventstore2.example.com,eventstore3.example.com',
  // port: 5005,
  
  // Option 3: DNS-based load balancing
  // target: 'dns:///eventstore.example.com:5005',
  
  // Authentication
  username: 'admin',
  password: 'changeit',
  
  // Load balancing configuration
  loadBalancingPolicy: 'round_robin', // or 'pick_first'
  

  
  // Logging configuration
  enableLogging: true, // Enable or disable logging
  logger: console, // Custom logger (must implement debug, info, warn, error methods)
});

const accountOpenedId = '018f2d5e-2001-7000-8000-000000000001';
const accountRootCriteria = {
  tags: [
    { key: 'eventType', value: 'AccountOpened' },
    { key: 'accountOpenedId', value: accountOpenedId },
  ],
};
const accountHistoryQuery = {
  criteria: [
    accountRootCriteria,
    { tags: [{ key: 'scopes.accountOpenedId', value: accountOpenedId }] },
  ],
};

// Save events with Command Context Consistency
const write = await client.saveEvents({
  boundary: 'accounts',
  query: {
    expectedPosition: { commitPosition: -1, preparePosition: -1 },
    subsetQuery: { criteria: [accountRootCriteria] }
  },
  events: [{
    eventId: accountOpenedId,
    eventType: 'AccountOpened',
    data: { accountOpenedId, balance: 0 }
  }]
});

// Read events by criteria
const events = await client.getEvents({
  boundary: 'accounts',
  query: accountHistoryQuery,
  count: 100,
  direction: 'ASC'
});

// Read the latest event per criterion for carried-state command decisions
const latest = await client.getLatestByCriteria({
  boundary: 'accounts',
  criteria: accountHistoryQuery.criteria
});
const expectedPosition = latest.contextPosition;

// Subscribe to events
const subscription = client.subscribeToEvents(
  { subscriberName: 'account-projector', boundary: 'accounts' },
  (event) => console.log('Received:', event)
);
```

## Boundary management

Boundary definitions are commands recorded in the admin event log. The RPC
returns the boundary in `PROVISIONING`; the server provisions its durable
storage and publisher before emitting the activation event.

```typescript
import { AdminClient, BoundaryStatus } from '@orisun/eventstore-client';

const admin = new AdminClient({
  host: 'localhost',
  port: 5005,
  username: 'admin',
  password: 'changeit',
});

const {boundary: definition} = await admin.createBoundary({
  name: 'orders',
  description: 'Order lifecycle events',
  placement: { backend: 'postgres', namespace: 'public' },
});

const {boundary: existing} = await admin.createBoundary({
  name: 'legacy_orders',
  placement: { backend: 'postgres', namespace: 'legacy' },
  existedBeforeCatalog: true,
});

// Definition commands return PROVISIONING. Wait before using EventStore APIs.
let orders = definition;
while (orders.status === BoundaryStatus.PROVISIONING) {
  await new Promise(resolve => setTimeout(resolve, 100));
  ({boundary: orders} = await admin.getBoundary('orders'));
}
if (orders.status !== BoundaryStatus.ACTIVE) {
  throw new Error(`Boundary provisioning failed: ${orders.lastError}`);
}

const {boundaries} = await admin.listBoundaries();
```

`createBoundary` creates and migrates physical storage idempotently. Set
`existedBeforeCatalog: true` to record that the physical storage predates its
catalog entry. The operation appends a durable definition event; a duplicate
name returns `ALREADY_EXISTS`. Placement is backend-specific:

- PostgreSQL: `{ backend: 'postgres', namespace: '<schema>' }`
- SQLite: `{ backend: 'sqlite', namespace: '<boundary-name>' }`
- FoundationDB: `{ backend: 'foundationdb', namespace: '<ORISUN_FDB_ROOT>' }`

Failed provisioning is reported through `status === BoundaryStatus.FAILED` and
`lastError`. The server retries failed definitions independently.

## API Reference

### EventStoreClient

#### Constructor

```typescript
new EventStoreClient(options?: EventStoreClientOptions)
```

**Options:**
- `host` (string): Server hostname or comma-separated list of hosts for load balancing (default: 'localhost')
- `port` (number): Server port (default: 5005)
- `target` (string): Alternative to host:port. A fully qualified gRPC target string (e.g., 'dns:///eventstore.example.com:5005')
- `credentials` (grpc.ChannelCredentials): gRPC credentials (default: insecure)
- `username` (string): Authentication username (default: 'admin')
- `password` (string): Authentication password (default: 'changeit')
- `loadBalancingPolicy` (string): Load balancing strategy - 'round_robin' or 'pick_first' (default: 'round_robin')
- `channelOptions` (grpc.ChannelOptions): Additional `@grpc/grpc-js` channel options. The client already sets Orisun's high-throughput defaults: 100 MB send/receive message size and a 1 MB HTTP/2 flow-control window. Values in `channelOptions` override those defaults.
- `enableLogging` (boolean): Enable or disable logging (default: false)
- `logger` (object): Custom logger implementation
  - Must implement `debug`, `info`, `warn`, and `error` methods

### High-throughput writes

Use one `EventStoreClient` instance per target and let it reuse its single gRPC channel. The client caches Orisun auth tokens after the first authenticated response, so hot `saveEvents` calls should use the cached token path rather than repeatedly sending Basic credentials.

For burst imports or very high write volume, keep roughly 512-1024 `saveEvents` calls in flight instead of launching an unbounded number of concurrent RPCs. The server can process large bursts, but flooding one HTTP/2 connection with every pending write at once adds client-side scheduling and stream overhead.

```typescript
const maxInFlight = 1024;

async function saveBurst(requests: SaveEventsRequest[]) {
  let next = 0;

  async function worker() {
    while (next < requests.length) {
      const request = requests[next++];
      await client.saveEvents(request);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(maxInFlight, requests.length) }, worker)
  );
}
```

#### Methods

##### saveEvents(request: SaveEventsRequest): Promise<WriteResult>

Save events with Command Context Consistency.

```typescript
const result = await client.saveEvents({
  boundary: 'orders',
  query: {
    expectedPosition: { commitPosition: 12, preparePosition: 8 },
    subsetQuery: {
      criteria: [
        { tags: [{ key: 'customer_id', value: 'c-1' }] }
      ]
    }
  },
  events: [
    {
      eventId: 'order-456-shipped',
      eventType: 'OrderShipped',
      data: { order_id: 'order-456', customer_id: 'c-1', tracking_number: 'TRK123' },
      metadata: { source: 'shipping-service' }
    }
  ]
});
```

##### getEvents(request: GetEventsRequest): Promise<Event[]>

Retrieve events by boundary, criteria, and position.

```typescript
// Get events for one account
const allEvents = await client.getEvents({
  boundary: 'accounts',
  query: {
    criteria: [
      { tags: [
        { key: 'eventType', value: 'AccountOpened' },
        { key: 'accountOpenedId', value: '018f2d5e-2001-7000-8000-000000000001' },
      ] },
      { tags: [{ key: 'scopes.accountOpenedId', value: '018f2d5e-2001-7000-8000-000000000001' }] },
    ]
  },
  count: 100,
  direction: 'ASC'
});

// Page forward from a position
const recentEvents = await client.getEvents({
  boundary: 'accounts',
  fromPosition: { commitPosition: 100, preparePosition: 42 },
  count: 100,
  direction: 'ASC'
});
```

##### getLatestByCriteria(request: GetLatestByCriteriaRequest): Promise<GetLatestByCriteriaResponse>

Retrieve the latest event matching each criterion from one server-side snapshot. Use `contextPosition` as the next `SaveEvents.query.expectedPosition` with the same combined criteria.

```typescript
const latest = await client.getLatestByCriteria({
  boundary: 'accounts',
  criteria: [
    { tags: [
      { key: 'eventType', value: 'AccountOpened' },
      { key: 'accountOpenedId', value: '018f2d5e-2001-7000-8000-000000000001' },
    ] },
    { tags: [{ key: 'scopes.accountOpenedId', value: '018f2d5e-2001-7000-8000-000000000001' }] },
    { tags: [
      { key: 'eventType', value: 'AccountOpened' },
      { key: 'accountOpenedId', value: '018f2d5e-2002-7000-8000-000000000002' },
    ] },
    { tags: [{ key: 'scopes.accountOpenedId', value: '018f2d5e-2002-7000-8000-000000000002' }] }
  ]
});

const acct1Movement = latest.results[1].event;
const expectedPosition = latest.contextPosition;
```

##### subscribeToEvents(request: SubscribeRequest, onEvent: (event: Event) => void, onError?: (error: Error) => void): grpc.ClientReadableStream

Subscribe to catch-up and live events.

```typescript
const subscription = client.subscribeToEvents(
  {
    subscriberName: 'account-projector',
    boundary: 'accounts'
  },
  (event) => {
    console.log('New event:', event.eventType, event.data);
  },
  (error) => {
    console.error('Subscription error:', error);
  }
);

// Subscribe to all events from a specific position
const allStreamsSubscription = client.subscribeToEvents(
  {
    subscriberName: 'account-projector',
    afterPosition: { commitPosition: 1000, preparePosition: 1000 },
    boundary: 'accounts'
  },
  (event) => {
    console.log('Event:', event);
  }
);

// Cancel subscription
subscription.cancel();
```

##### healthCheck(): Promise<boolean>

Check if the client can connect to the event store.

```typescript
const isHealthy = await client.healthCheck();
if (!isHealthy) {
  console.error('Event store is not accessible');
}
```

##### close(): void

Close the client connection.

```typescript
client.close();
```

### Types

```typescript
interface Event {
  eventId: string;
  eventType: string;
  data: any;
  metadata?: Record<string, any>;
  position: Position;
  dateCreated: string;
}

interface EventToSave {
  eventId: string;
  eventType: string;
  data: any;
  metadata?: Record<string, any>;
}

interface Position {
  commitPosition: number;
  preparePosition: number;
}

interface Tag {
  key: string;
  value: string;
}

interface Criterion {
  tags: Tag[];
}

interface Query {
  criteria: Criterion[];
}

interface SaveEventsRequest {
  boundary: string;
  query: {
    expectedPosition: Position;
    subsetQuery?: Query;
  };
  events: EventToSave[];
}

interface GetEventsRequest {
  boundary: string;
  query?: Query;
  fromPosition?: Position;
  count?: number;
  direction?: 'ASC' | 'DESC';
}

interface GetLatestByCriteriaRequest {
  boundary: string;
  criteria: Criterion[];
}

interface SubscribeRequest {
  subscriberName: string;
  boundary: string;
  afterPosition?: Position;
  query?: Query;
}
```

## Examples

### Carried-State Command

```typescript
import { EventStoreClient, Query } from '@orisun/eventstore-client';

class AccountLedger {
  private client: EventStoreClient;
  private boundary = 'accounts';

  constructor() {
    this.client = new EventStoreClient({
      host: 'localhost',
      port: 5005,
      username: 'admin',
      password: 'changeit'
    });
  }

  private accountRootCriterion(accountOpenedId: string) {
    return {
      tags: [
        { key: 'eventType', value: 'AccountOpened' },
        { key: 'accountOpenedId', value: accountOpenedId },
      ],
    };
  }

  private accountQuery(accountOpenedId: string): Query {
    return {
      criteria: [
        this.accountRootCriterion(accountOpenedId),
        { tags: [{ key: 'scopes.accountOpenedId', value: accountOpenedId }] },
      ],
    };
  }

  async open(accountOpenedId: string) {
    const rootQuery = { criteria: [this.accountRootCriterion(accountOpenedId)] };
    await this.client.saveEvents({
      boundary: this.boundary,
      query: {
        expectedPosition: { commitPosition: -1, preparePosition: -1 },
        subsetQuery: rootQuery
      },
      events: [{
        eventId: accountOpenedId,
        eventType: 'AccountOpened',
        data: { accountOpenedId, balance: 0 }
      }]
    });
  }

  async debit(accountOpenedId: string, amount: number, moneyDebitedId: string) {
    const query = this.accountQuery(accountOpenedId);
    const latest = await this.client.getLatestByCriteria({
      boundary: this.boundary,
      criteria: query.criteria
    });

    const currentBalance = latest.results[1].event?.data.balanceAfter
      ?? latest.results[0].event?.data.balance
      ?? 0;
    if (currentBalance < amount) {
      throw new Error('Insufficient funds');
    }

    await this.client.saveEvents({
      boundary: this.boundary,
      query: {
        expectedPosition: latest.contextPosition,
        subsetQuery: query
      },
      events: [{
        eventId: moneyDebitedId,
        eventType: 'MoneyDebited',
        data: {
          moneyDebitedId,
          amount,
          balanceAfter: currentBalance - amount,
          'scopes.accountOpenedId': accountOpenedId
        }
      }]
    });
  }
}
```

### Event Processing with Subscriptions

```typescript
import { EventStoreClient, Event } from '@orisun/eventstore-client';

class EventProcessor {
  private client: EventStoreClient;

  constructor() {
    this.client = new EventStoreClient({
      host: 'localhost',
      port: 5005,
      username: 'admin',
      password: 'changeit'
    });
  }

  startProcessing(boundary: string) {
    // Subscribe to all events in the boundary
    this.client.subscribeToEvents(
      { subscriberName: 'projector', boundary },
      this.handleEvent.bind(this),
      this.handleError.bind(this)
    );
  }

  private async handleEvent(event: Event) {
    console.log(`Processing event: ${event.eventType}`);
    
    switch (event.eventType) {
      case 'UserCreated':
        await this.sendWelcomeEmail(event.data);
        break;
      case 'OrderPlaced':
        await this.processPayment(event.data);
        break;
      default:
        console.log(`Unknown event type: ${event.eventType}`);
    }
  }

  private handleError(error: Error) {
    console.error('Event processing error:', error);
    // Implement error handling
  }

  private async sendWelcomeEmail(userData: any) {
    // Email sending logic
    console.log(`Sending welcome email to ${userData.email}`);
  }

  private async processPayment(orderData: any) {
    // Payment processing logic
    console.log(`Processing payment for order ${orderData.orderId}`);
  }
}
```

## Error Handling

The client throws standard JavaScript errors for various failure scenarios:

```typescript
try {
  await client.saveEvents({
    boundary: 'accounts',
    query: {
      expectedPosition: { commitPosition: 12, preparePosition: 12 },
      subsetQuery: {
        criteria: [
          { tags: [
            { key: 'eventType', value: 'AccountOpened' },
            { key: 'accountOpenedId', value: '018f2d5e-2001-7000-8000-000000000001' },
          ] },
          { tags: [{ key: 'scopes.accountOpenedId', value: '018f2d5e-2001-7000-8000-000000000001' }] }
        ]
      }
    },
    events: [{
      eventId: '018f2d5e-2003-7000-8000-000000000003',
      eventType: 'MoneyDebited',
      data: {
        moneyDebitedId: '018f2d5e-2003-7000-8000-000000000003',
        amount: 50,
        balanceAfter: 10,
        'scopes.accountOpenedId': '018f2d5e-2001-7000-8000-000000000001'
      }
    }]
  });
} catch (error) {
  if (error.message.includes('AlreadyExists')) {
    console.error('Concurrency conflict - re-read the context and retry');
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Development

### Building

```bash
npm run build
```

### Running Examples

```bash
npm run example
```

### Testing

```bash
npm test
```

### Generating Protocol Buffers

If you need to regenerate the protocol buffer definitions:

```bash
npm run generate-proto
```

## License

MIT
