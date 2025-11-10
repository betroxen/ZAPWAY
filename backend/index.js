
const express = require('express');
const { Client, Account, Databases, ID, Query } = require('node-appwrite');
const { appwrite, admin, getUserClient } = require('./config/config');
const casinos = require('./data/casinos'); // Import the new casino data

const app = express();
app.use(express.json());
// ... other app setup

// --- Database IDs ---
const dbId = 'zap-dev';
const userCollectId = 'users';
const settingsCollectId = 'settings';
const reviewsCollectId = 'reviews'; // New collection for reviews

// ... (Leveling system code)


// === CASINO & REVIEW ENDPOINTS ===

app.get('/api/casinos', (req, res) => {
    res.json(casinos);
});

app.get('/api/casinos/:id', (req, res) => {
    const casino = casinos.find(c => c.id === req.params.id);
    if (casino) {
        res.json(casino);
    } else {
        res.status(404).json({ message: 'Casino not found' });
    }
});

// Protected endpoint for submitting a review
app.post('/api/casinos/:id/reviews', async (req, res) => {
    const jwt = req.headers['x-appwrite-jwt'];
    if (!jwt) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    const { rating, text } = req.body;
    const casinoId = req.params.id;

    if (!rating || !text || !casinoId) {
        return res.status(400).json({ message: 'Missing rating, text, or casino ID' });
    }

    try {
        const account = new Account(getUserClient(jwt));
        const user = await account.get();

        const adminDatabase = new Databases(admin);
        const response = await adminDatabase.createDocument(
            dbId,
            reviewsCollectId,
            ID.unique(),
            {
                casinoId: casinoId,
                userId: user.$id,
                username: user.name,
                rating: parseInt(rating, 10),
                text: text,
            }
        );

        res.status(201).json({ message: 'Review submitted successfully', review: response });

    } catch (error) {
        res.status(500).json({ message: 'Failed to submit review', error: error.message });
    }
});


// ... (all other existing endpoints)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
