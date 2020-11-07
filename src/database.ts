import mongoose from 'mongoose';

const mongoURL = process.env.MONGODB_ATLAS || 'mongodb://localhost/test';

//Initialize database
mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then((db) => console.log('Database is connected'))
    .catch((err) => console.log(err));
