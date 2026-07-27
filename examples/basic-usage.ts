import {EventStoreClient, Event, WriteResult, Query} from '../src';

async function basicUsageExample() {
    // Create a client instance with keep-alive options and load balancing
    const client = new EventStoreClient({
        // Option 1: Single host and port
        host: 'localhost',
        port: 5005,

        // Option 2: Multiple hosts for load balancing
        // host: 'eventstore1.example.com,eventstore2.example.com,eventstore3.example.com',
        // port: 5005,

        // Option 3: DNS-based load balancing
        // target: 'dns:///eventstore.example.com:5005',

        username: 'admin',
        password: 'changeit',

        // Load balancing policy
        loadBalancingPolicy: 'round_robin', // or 'pick_first'


        // Logging configuration
        enableLogging: true, // Enable logging (set to false in production if you want to minimize output)
        logger: console, // Use the default console logger (you can provide a custom logger)
    });

    try {
        console.log('Connecting to Orisun Event Store...');

        // Perform health check to verify connection
        console.log('Performing health check...');
        const isHealthy = await client.healthCheck();
        if (isHealthy) {
            console.log('Health check passed - connection is healthy');
        } else {
            console.log('Health check failed - but continuing with operations...');
        }

        // Orisun uses Command Context Consistency (CCC): instead of pre-defined
        // streams, a command defines its context by querying events on their
        // data content. A criterion tag {key, value} matches events whose data
        // JSONB has that key/value (data->>'key' = 'value'), so put the fields
        // later commands and subscriptions query on inside each event's data.
        const userId = `user-${Date.now()}`;

        const events = [
            {
                eventId: crypto.randomUUID(),
                eventType: 'UserCreated',
                data: {
                    userId,
                    email: 'john.doe@example.com',
                    name: 'John Doe'
                },
                metadata: {
                    source: 'user-service',
                    version: '1.0'
                }
            },
            {
                eventId: crypto.randomUUID(),
                eventType: 'UserEmailUpdated',
                data: {
                    userId,
                    oldEmail: 'john.doe@example.com',
                    newEmail: 'john.doe@newdomain.com'
                },
                metadata: {
                    source: 'user-service',
                    version: '1.0'
                }
            }
        ];

        // The context for this command is "all events whose data.userId matches".
        const userQuery: Query = {
            criteria: [{tags: [{key: 'userId', value: userId}]}]
        };

        // Save events. expectedPosition {-1, -1} asserts the context is empty
        // (no prior events match the query) — CCC optimistic concurrency.
        console.log(`Saving events for ${userId}...`);
        const writeResult: WriteResult = await client.saveEvents({
            boundary: 'orisun_test_2',
            query: {
                expectedPosition: {
                    commitPosition: -1,
                    preparePosition: -1
                },
                subsetQuery: userQuery
            },
            events: events
        });
        console.log('Events saved successfully!');
        console.log('Commit position:', writeResult.logPosition.commitPosition);
        console.log('Prepare position:', writeResult.logPosition.preparePosition);

        // Read the events back by querying on the same tags.
        console.log(`Reading events for ${userId}...`);
        const retrievedEvents = await client.getEvents({
            boundary: 'orisun_test_2',
            query: userQuery,
            direction: 'ASC'
        });

        console.log(`Retrieved ${retrievedEvents.length} events:`);
        retrievedEvents.forEach((event, index) => {
            console.log(`Event ${index + 1}:`, {
                eventId: event.eventId,
                eventType: event.eventType,
                data: event.data,
                position: event.position,
                dateCreated: event.dateCreated
            });
        });

        // Subscribe to events matching the query (this will run indefinitely)
        console.log(`\nSubscribing to events for ${userId}...`);
        const subscription = client.subscribeToEvents(
            {
                query: userQuery,
                subscriberName: 'example-subscriber',
                boundary: 'orisun_test_2'
            },
            async (event: Event) => {
                console.log('Received event:', {
                    eventId: event.eventId,
                    eventType: event.eventType,
                    data: event.data,
                    position: event.position
                });
            },
            (error: Error) => {
                console.error('Subscription error:', error);
            }
        );

        // Let the subscription run for a few seconds
        setTimeout(() => {
            console.log('Closing subscription...');
            subscription.cancel();
            client.close();
            console.log('Example completed!');
        }, 5000);

    } catch (error) {
        console.error('Error:', error);
        client.close();
    }
}

// Run the example
if (require.main === module) {
    basicUsageExample().catch(console.error);
}

export {basicUsageExample};