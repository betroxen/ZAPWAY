
const { admin } = require('./backend/config/config.js');
const { Databases, ID, Permission, Role } = require('node-appwrite');

const dbId = 'zap-dev';
const reviewsCollectId = 'reviews';

async function setupDatabase() {
    const database = new Databases(admin);
    try {
        console.log(`Checking for collection '${reviewsCollectId}'...`);
        await database.getCollection(dbId, reviewsCollectId);
        console.log(`Collection '${reviewsCollectId}' already exists. Skipping creation.`);
    } catch (e) {
        if (e.code === 404) {
            console.log(`Collection not found. Creating collection '${reviewsCollectId}'...`);
            await database.createCollection(dbId, reviewsCollectId, reviewsCollectId, [
                Permission.read(Role.any()),
                Permission.create(Role.users()),
                Permission.update(Role.team('admins')),
                Permission.delete(Role.team('admins')),
            ]);

            console.log('Collection created. Creating attributes...');

            await Promise.all([
                database.createStringAttribute(dbId, reviewsCollectId, 'casinoId', 255, true),
                database.createStringAttribute(dbId, reviewsCollectId, 'userId', 255, true),
                database.createStringAttribute(dbId, reviewsCollectId, 'username', 255, true),
                database.createIntegerAttribute(dbId, reviewsCollectId, 'rating', true),
                database.createStringAttribute(dbId, reviewsCollectId, 'text', 10000, true)
            ]);
            
            console.log('Attributes created. Creating indexes...');

            await Promise.all([
                database.createIndex(dbId, reviewsCollectId, 'casinoId_index', 'key', ['casinoId'], ['ASC']),
                database.createIndex(dbId, reviewsCollectId, 'userId_index', 'key', ['userId'], ['ASC'])
            ]);
            
            console.log('Database setup complete.');

        } else {
            console.error('Error checking collection:', e);
        }
    }
}

setupDatabase();
