const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();

// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB URI (you should move credentials to an environment variable for security)
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://sai:sai@cluster0.sjhocvq.mongodb.net/';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the schema for messages
const messageSchema = new mongoose.Schema({
  from: String,
  body: String,
  categories: [String],
  phoneNumber: String,
});

// Create models for each collection
const WhatsappSublet = mongoose.model('WhatsappSublet', messageSchema, 'whatsappsublets');
const WhatsappItem = mongoose.model('WhatsappItem', messageSchema, 'whatsappitems');

// Helper function to categorize messages
const categorizeMessage = (body) => {
  const categories = [];
  const availableSubleaseKeywords = ['room available', 'sublease available', 'accommodation available', 'available for', 'accommodation','subleasing', 'room for rent'];
  const lookingForSubleaseKeywords = ['looking for accommodation', 'looking for', 'need a'];
  const furnitureKeywords = {
    'chair': 'Chair',
    'table': 'Table',
    'fan': 'Fan',
    'ac': 'AC',
    'bed': 'Bed',
    'mattress': 'Mattress',
    'tv': 'TV',
    'monitor': 'Monitor',
    'couch': 'Couch'
  };

  const bodyLowerCase = body.toLowerCase();

  // Check for available sublease keywords
  availableSubleaseKeywords.forEach(keyword => {
    if (bodyLowerCase.includes(keyword)) {
      categories.push('Available Subleases');
      return;
    }
  });

  // Check for looking for sublease keywords
  lookingForSubleaseKeywords.forEach(keyword => {
    if (bodyLowerCase.includes(keyword)) {
      categories.push('Looking for Subleases');
      return;
    }
  });

  // Check for furniture keywords
  for (const keyword in furnitureKeywords) {
    if (bodyLowerCase.includes(keyword)) {
      categories.push(furnitureKeywords[keyword]);
    }
  }

  // Default category if no specific keywords are found
  if (categories.length === 0) {
    categories.push('Other');
  }

  return categories;
};

// Extract phone number from the message body
const extractPhoneNumber = (text) => {
  const phoneRegex = /(\+?\d{1,4}[\s-]?)?(?:\(\d{1,3}\)[\s-]?)?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{4,}/g;
  const matches = text.match(phoneRegex);
  return matches ? matches[matches.length - 1] : null;
};

// Mask phone numbers in the message body
const maskPhoneNumbers = (text) => {
  const phoneRegex = /(\+?\d{1,4}[\s-]?)?(?:\(\d{1,3}\)[\s-]?)?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{4,}/g;
  return text.replace(phoneRegex, (match) => {
    const isPrice = /\b\d{1,3}(,\d{3})*(\.\d{1,2})?\b/.test(match);
    return isPrice ? match : '[REDACTED]';
  });
};

// Route to handle incoming POST requests
app.post('/webhook', async (req, res) => {
  const { From, Body } = req.body;
  const phoneNumber = extractPhoneNumber(Body);
  const maskedBody = maskPhoneNumbers(Body);
  const categories = categorizeMessage(maskedBody);

  // Determine the appropriate model based on categories
  let MessageModel = WhatsappItem;
  if (categories.includes('Available Subleases') || categories.includes('Looking for Subleases')) {
    MessageModel = WhatsappSublet;
  }

  // Create and save the message document
  const message = new MessageModel({
    from: From,
    body: maskedBody,
    categories,
    phoneNumber,
  });

  try {
    await message.save();
    console.log(`Message saved in ${MessageModel.collection.collectionName}`);
    res.status(200).send('Message received');
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Listen on the configured port
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
