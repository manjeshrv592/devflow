import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) return console.log('MISSING MONGODB_URI');

  if (isConnected) return console.log('MONGODB is already connected');

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'devflow',
    });

    isConnected = true;

    console.log('MongoDB is connected');
  } catch (error) {
    console.log(error);
  }
};
