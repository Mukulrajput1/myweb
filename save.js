const fs = require('fs');

// Read the PDF file and encode it as base64
const pdfData = fs.readFileSync('./mukulresume.pdf', { encoding: 'base64' });


const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://127.0.0.1:27017';

// Database Name
const dbName = 'myweb';

// Create a MongoDB client
const client = new MongoClient(url);

async function savePdfToMongo() {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Select a database
    const db = client.db(dbName);

    // Select a collection
    const collection = db.collection('pdfs');

    // Create a document with the PDF data as a base64 string
    const pdfDocument = {
      name: 'resume.pdf',
      content: pdfData,
    };

    // Insert the document into the collection
    const result = await collection.insertOne(pdfDocument);

    console.log('PDF saved with ID:', result.insertedId);
  } finally {
    // Close the MongoDB client
    client.close();
  }
}

// Call the function to save the PDF to MongoDB as a base64 string
savePdfToMongo();
