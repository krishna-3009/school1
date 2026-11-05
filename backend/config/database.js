import mongoose from 'mongoose';
import { atlasUri } from '../utils/atlasUri.js';

let retryTimer;
let stopping = false;

async function connectAttempt() {
  try {
    await mongoose.connect(atlasUri(), {
      dbName: process.env.MONGODB_DATABASE || 'school',
      serverSelectionTimeoutMS: 8000,
      maxPoolSize: 8,
      autoIndex: false,
    });
    console.log('MongoDB connected.');
  } catch {
    console.error(
      'MongoDB connection failed. Check the local Atlas env values and Atlas network access. Retrying shortly.'
    );
    if (!stopping) {
      retryTimer = setTimeout(connectAttempt, 10_000);
      retryTimer.unref();
    }
  }
}

export function connectToDatabase() {
  stopping = false;
  return connectAttempt();
}

export async function disconnectFromDatabase() {
  stopping = true;
  clearTimeout(retryTimer);
  await mongoose.disconnect();
}
