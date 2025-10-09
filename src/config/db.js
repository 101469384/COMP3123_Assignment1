const mongoose = require('mongoose');

async function connectDB(uri) {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, { autoIndex: true });
    const status = await mongoose.connection.db.command({ connectionStatus: 1 });
    console.log('Auth info =>', status.authInfo);
    console.log('✅ MongoDB connected');
}

module.exports = connectDB;
