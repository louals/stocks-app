import mongoose, { mongo } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * We extend the global object to store a cached MongoDB connection.
 * This prevents Next.js (or any hot-reloading dev environment) from creating
 * a new connection on every file save or API request.
 * 
 * - `conn` → the active mongoose instance (if already connected)
 * - `promise` → stores the pending connection promise while connecting,
 *                so multiple requests don’t trigger duplicate connections
 */
declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

/**
 * `cached` will hold our stored global connection if it exists.
 * If it doesn’t, we initialize it manually.
 * This makes sure hot reload keeps reusing the same connection.
 */
let cached = global.mongooseCache;

if (!cached) {
  global.mongooseCache = { conn: null, promise: null };
  cached = global.mongooseCache;
}

export const ConnectToDB = async() => {
    if(!MONGODB_URI) throw new Error('MONGODB_URI must be set within .env')

    // If already connected, return the cached mongoose instance
    if(cached.conn) return cached.conn;

    // If a connection is currently being created, reuse its promise
    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {bufferCommands:false})
    }

    try {
         // Wait for connection and store it in cache
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise=null // reset promise if connection failed
        throw error
    }
    console.log("Connected to Database :",MONGODB_URI + process.env.NODE_ENV)
}
