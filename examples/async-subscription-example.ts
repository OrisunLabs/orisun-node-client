import { EventStoreClient, Event } from '../src';

async function main() {
  // Create client
  const client = new EventStoreClient({
    host: 'localhost',
    port: 5005,
    enableLogging: true
  });

  try {
    console.log('🔗 Connecting to EventStore...');
    
    // Perform health check
    const isHealthy = await client.healthCheck();
    if (!isHealthy) {
      throw new Error('EventStore connection failed');
    }
    console.log('✅ Connected to EventStore successfully');

    // Example 1: Using the new async subscription method
    console.log('\n📡 Starting async subscription with for await...');
    
    // Orisun subscriptions filter by event data content, not by stream. Pass a
    // `query` with criteria to narrow the feed; omit it to receive every event
    // in the boundary, as this example does.
    const subscriptionPromise = client.subscribeToEvents(
      {
        subscriberName: 'async-example-subscriber',
        boundary: 'demo-tenant'
      },
      async (event: Event) => {
        console.log(`📨 Received event: ${event.eventType} (ID: ${event.eventId})`);
        console.log(`   Position: ${event.position.commitPosition}/${event.position.preparePosition}`);
        console.log(`   Data:`, event.data);
        
        // Simulate some async processing
        await new Promise(resolve => setTimeout(resolve, 100));
        console.log(`✅ Processed event: ${event.eventId}`);
      },
      (error: Error) => {
        console.error('❌ Subscription error:', error.message);
      }
    );

    // Let the subscription run for a few seconds
    setTimeout(() => {
      console.log('\n🛑 Stopping subscription...');
      // In a real scenario, you might want to implement a cancellation mechanism
    }, 5000);

    // Wait for subscription to complete (or timeout)
    await Promise.race([
      subscriptionPromise,
      new Promise(resolve => setTimeout(resolve, 6000))
    ]);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    console.log('\n🔌 Closing connection...');
    client.close();
    console.log('✅ Connection closed');
  }
}

// Example 2: Unfiltered vs content-filtered subscriptions
async function comparisonExample() {
  const client = new EventStoreClient({
    host: 'localhost',
    port: 5005,
    enableLogging: false
  });

  console.log('\n🔄 Comparison: Unfiltered vs Content-Filtered Subscriptions\n');

  // Unfiltered: every event in the boundary.
  console.log('📜 Unfiltered (whole boundary):');
  const allSubscription = client.subscribeToEvents(
    {
      subscriberName: 'all-events-subscriber',
      boundary: 'demo-tenant'
    },
    async (event: Event) => {
      console.log(`  📨 All: ${event.eventType}`);
    },
    (error: Error) => {
      console.error(`  ❌ All error: ${error.message}`);
    }
  );

  // Filtered: only events whose data matches the query criteria.
  console.log('✨ Filtered (data.orderId = order-42):');
  const orderSubscription = client.subscribeToEvents(
    {
      subscriberName: 'order-42-subscriber',
      boundary: 'demo-tenant',
      query: {
        criteria: [{tags: [{key: 'orderId', value: 'order-42'}]}]
      }
    },
    async (event: Event) => {
      console.log(`  📨 Order: ${event.eventType}`);
      await new Promise(resolve => setTimeout(resolve, 50));
      console.log(`  ✅ Processed ${event.eventType}`);
    },
    (error: Error) => {
      console.error(`  ❌ Order error: ${error.message}`);
    }
  );

  // Let both run briefly, then tear down.
  await new Promise(resolve => setTimeout(resolve, 3000));
  allSubscription.cancel();
  orderSubscription.cancel();
  client.close();
}

// Run the examples
if (require.main === module) {
  main().catch(console.error);
  
  // Uncomment to run comparison example
  // setTimeout(() => comparisonExample().catch(console.error), 7000);
}

export { main, comparisonExample };