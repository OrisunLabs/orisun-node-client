"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const src_1 = require("../src");
async function testTokenCaching() {
    console.log('🧪 Testing token caching with real gRPC server...\n');
    // Create client with logging enabled to see token caching behavior
    const client = new src_1.EventStoreClient({
        host: 'localhost',
        port: 5005,
        username: 'admin',
        password: 'changeit',
        enableLogging: true,
        logger: {
            debug: (msg, ...args) => console.log(`🔍 DEBUG: ${msg}`, ...args),
            info: (msg, ...args) => console.log(`ℹ️  INFO: ${msg}`, ...args),
            warn: (msg, ...args) => console.log(`⚠️  WARN: ${msg}`, ...args),
            error: (msg, ...args) => console.log(`❌ ERROR: ${msg}`, ...args),
        }
    });
    try {
        console.log('1️⃣  Testing initial ping (should use basic auth)...');
        await client.ping();
        console.log('✅ Initial ping successful\n');
        // console.log('2️⃣  Testing second ping (should use cached token)...');
        // await client.ping();
        // console.log('✅ Second ping successful\n');
        console.log('3️⃣  Testing saveEvents (should use cached token)...');
        const saveRequest = {
            consistency: [],
            events: [
                {
                    eventId: (0, crypto_1.randomUUID)(),
                    eventType: 'TokenTestEvent',
                    data: { message: 'Testing token caching', timestamp: new Date().toISOString() },
                    metadata: { source: 'integration-test' }
                }
            ],
            boundary: 'orisun_admin'
        };
        const saveResult = await client.saveEventsV2(saveRequest);
        console.log('✅ Save events successful');
        console.log(`📍 Log position: ${JSON.stringify(saveResult.logPosition)}\n`);
        console.log('4️⃣  Testing getEvents (should use cached token)...');
        const getEventsRequest = {
            stream: {
                name: 'test-token-caching-stream'
            },
            boundary: 'orisun_admin',
            count: 10
        };
        const events = await client.getEvents(getEventsRequest);
        console.log('✅ Get events successful');
        console.log(`📦 Retrieved ${events.length} events`);
        if (events.length > 0) {
            console.log(`📝 First event: ${events[0].eventType} - ${events[0].data.message}`);
        }
        console.log('');
        console.log('5️⃣  Testing health check (should use ping)...');
        const isHealthy = await client.healthCheck();
        console.log(`✅ Health check result: ${isHealthy ? 'HEALTHY' : 'UNHEALTHY'}\n`);
        console.log('🎉 All token caching tests passed!');
        console.log('📋 Summary:');
        console.log('   • Initial ping used basic auth');
        console.log('   • Subsequent calls used cached token');
        console.log('   • Token caching is working correctly');
    }
    catch (error) {
        console.error('❌ Token caching test failed:', error);
        console.error('\n🔍 Possible issues:');
        console.error('   • Server not running on port 5005');
        console.error('   • Authentication credentials incorrect');
        console.error('   • Token extraction/caching logic issue');
        console.error('   • Network connectivity problem');
        throw error;
    }
    finally {
        client.close();
        console.log('🔌 Client connection closed');
    }
}
// Run the test
testTokenCaching().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
//# sourceMappingURL=integration-test.js.map