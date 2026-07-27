import { randomUUID } from 'crypto';
import { EventStoreClient, EventToSave, WriteResult, Query } from '../src';

/**
 * Integration example showing how to use the Node.js client
 * with a running Orisun Event Store server
 */
async function integrationExample() {
  const client = new EventStoreClient({
    // Connection options - choose one of the following approaches:
    
    // 1. Single server connection
    host: 'localhost',
    port: 5005,
    
    // 2. Multiple hosts for load balancing (uncomment to use)
    // host: 'eventstore1.example.com,eventstore2.example.com,eventstore3.example.com',
    // port: 5005,
    
    // 3. DNS-based load balancing (uncomment to use)
    // target: 'dns:///eventstore.example.com:5005',
    
    // Authentication
    username: 'admin',
    password: 'changeit',
    
    // Load balancing configuration
    loadBalancingPolicy: 'round_robin', // Distributes requests across all available servers
    // loadBalancingPolicy: 'pick_first', // Uses the first available server
    

    
    // Logging configuration
    enableLogging: true, // Enable logging (set to false in production if you want to minimize output)
    logger: console, // Use the default console logger (you can provide a custom logger)
  });

  try {
    console.log('🔌 Connecting to Orisun Event Store...');
    
    // Test connection
    const isConnected = await client.healthCheck();
    if (!isConnected) {
      console.error('❌ Failed to connect to event store');
      console.log('Make sure the Orisun Event Store server is running on localhost:5005');
      return;
    }
    console.log('✅ Connected successfully!');

    const boundary = 'orisun_test_1';
    const orderId = `order-${Date.now()}`;

    // The command context is "all events for this order". Orisun defines it by
    // querying event data (data.orderId), not by a stream name.
    const orderQuery: Query = {
      criteria: [{ tags: [{ key: 'orderId', value: orderId }] }]
    };

    // Create some events for an order processing scenario
    const orderEvents: EventToSave[] = [
      {
        eventId: randomUUID(),
        eventType: 'OrderCreated',
        data: {
          orderId,
          customerId: 'customer-123',
          items: [
            { productId: 'prod-1', quantity: 2, price: 29.99 },
            { productId: 'prod-2', quantity: 1, price: 49.99 }
          ],
          totalAmount: 109.97
        },
        metadata: {
          source: 'order-service',
          correlationId: `corr-${Date.now()}`,
          userId: 'user-456'
        }
      },
      {
        eventId: randomUUID(),
        eventType: 'PaymentProcessed',
        data: {
          orderId,
          paymentId: `payment-${Date.now()}`,
          amount: 109.97,
          method: 'credit_card',
          status: 'completed'
        },
        metadata: {
          source: 'payment-service',
          correlationId: `corr-${Date.now()}`
        }
      },
      {
        eventId: randomUUID(),
        eventType: 'OrderShipped',
        data: {
          orderId,
          trackingNumber: `TRK${Date.now()}`,
          carrier: 'FastShip',
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        metadata: {
          source: 'shipping-service',
          correlationId: `corr-${Date.now()}`
        }
      }
    ];

    // Save events for the order. expectedPosition {-1,-1} asserts no prior
    // events match orderQuery (fresh context) — CCC optimistic concurrency.
    console.log(`📝 Saving ${orderEvents.length} events for order: ${orderId}`);
    const writeResult: WriteResult = await client.saveEvents({
      boundary,
      query: {
        expectedPosition: { commitPosition: -1, preparePosition: -1 },
        subsetQuery: orderQuery
      },
      events: orderEvents
    });
    console.log('✅ Events saved successfully!');
    console.log('📍 Log position:', writeResult.logPosition);

    // Read the order's events back by querying on the same criteria.
    console.log('📖 Reading events for order...');
    const retrievedEvents = await client.getEvents({
      boundary,
      query: orderQuery,
      direction: 'ASC',
      count: 10
    });

    console.log(`📋 Retrieved ${retrievedEvents.length} events:`);
    retrievedEvents.forEach((event, index) => {
      console.log(`\n  Event ${index + 1}:`);
      console.log(`    ID: ${event.eventId}`);
      console.log(`    Type: ${event.eventType}`);
      console.log(`    Position: ${event.position.commitPosition}/${event.position.preparePosition}`);
      console.log(`    Data:`, JSON.stringify(event.data, null, 6));
      console.log(`    Metadata:`, JSON.stringify(event.metadata, null, 6));
    });

    // Subscribe to this order's events, resuming after the events just written
    // so the OrderDelivered event below triggers the handler.
    console.log('\n🔔 Setting up subscription to order events...');
    const subscription = client.subscribeToEvents(
      {
        subscriberName: 'integration-example',
        boundary,
        query: orderQuery,
        afterPosition: writeResult.logPosition
      },
      async (event) => {
        console.log(`\n📨 Received event via subscription:`);
        console.log(`    Type: ${event.eventType}`);
        console.log(`    Position: ${event.position.commitPosition}/${event.position.preparePosition}`);
        console.log(`    Data:`, JSON.stringify(event.data, null, 6));
      },
      (error) => {
        console.error('❌ Subscription error:', error);
      }
    );

    // Add one more event to trigger the subscription. expectedPosition is the
    // context position returned by the first save, asserting nothing else has
    // touched this order's context since.
    setTimeout(async () => {
      console.log('\n📝 Adding one more event to trigger subscription...');
      const additionalWriteResult: WriteResult = await client.saveEvents({
        boundary,
        query: {
          expectedPosition: writeResult.logPosition,
          subsetQuery: orderQuery
        },
        events: [{
          eventId: randomUUID(),
          eventType: 'OrderDelivered',
          data: {
            orderId,
            deliveredAt: new Date().toISOString(),
            signedBy: 'John Doe'
          },
          metadata: {
            source: 'delivery-service',
            correlationId: `corr-${Date.now()}`
          }
        }]
      });
      console.log('📍 Additional event log position:', additionalWriteResult.logPosition);
    }, 2000);

    // Let the subscription run for a few seconds
    setTimeout(() => {
      console.log('\n🔌 Closing subscription and connection...');
      subscription.cancel();
      client.close();
      console.log('✅ Integration example completed!');
    }, 5000);

  } catch (error) {
    console.error('❌ Error during integration example:', error);
    client.close();
  }
}

// Run the example if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
  integrationExample().catch(console.error);
}

export { integrationExample };