require('dotenv').config();
console.log('Using MONGODB_URI =>', process.env.MONGODB_URI);
const connectDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
    } catch (err) {
        console.error('DB connection failed', err);
        process.exit(1);
    }
})();
