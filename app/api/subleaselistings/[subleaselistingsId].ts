// pages/api/sublease/[subleaseId].js
'use client';
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Your MongoDB connection string
const options = {};

async function connectToDatabase(uri) {
  const client = new MongoClient(uri, options);
  await client.connect();
  return client;
}

export default async function handler(req, res) {
  const {
    query: { subleaseId },
  } = req;

  const client = await connectToDatabase(uri);
  const db = client.db("test"); // Replace with your database name
  const sublease = await db.collection("SubleaseListing").findOne({ _id: subleaseId });

  if (!sublease) {
    res.status(404).json({ message: "Sublease listing not found" });
  } else {
    res.status(200).json(sublease);
  }

  client.close();
}
