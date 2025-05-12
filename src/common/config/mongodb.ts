import mongoose from 'mongoose';
import { env } from '@/common/config/env'


export async function mongoDB() {
    const { MONGODB_URI } = env;
    const clientOptions = { serverApi: { version: "1" as const, strict: true, deprecationErrors: true } };
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(MONGODB_URI, clientOptions);
    await mongoose.connection.db?.admin().command({ ping: 1 });
}
