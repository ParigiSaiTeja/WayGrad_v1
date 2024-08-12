// pages/api/universities.js

import fs from 'fs';
import path from 'path';

// Utility function to load universities from a file
const loadUniversities = () => {
  const filePath = path.join(process.cwd(), 'universitylist.txt');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const universities = fileContent.split('\n').map(line => line.trim()).filter(line => line);
  return universities.map(uni => ({ value: uni, label: uni }));
}

// API route handler
export default function handler(req, res) {
  try {
    const universities = loadUniversities();
    res.status(200).json(universities);
  } catch (error) {
    console.error('Error loading universities:', error);
    res.status(500).json({ error: 'Failed to load universities' });
  }
}
