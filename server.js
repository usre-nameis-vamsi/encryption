// server.js
'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { encrypt, decrypt } = require('./crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Encrypt and Decrypt</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
    <div>
      <h1>ENCRYPTION and DECRYPTION</h1>
    <form action="/encrypt" method="post">
      <input type="text" name="text" placeholder="Enter Text to Encrypt" required>
      <button type="submit"><a>Encrypt</a></button>
    </form>
    <form action="/decrypt" method="post">
      <input type="text" name="text" placeholder="Enter Text to Decrypt" required>
      <button type="submit"><a>Decrypt</a></button>
    </form>
      </div>
    </body>
    </html>
  `);
});

app.post('/encrypt', (req, res) => {
  const { text } = req.body;
  const encryptedText = encrypt(text);
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Encrypted Text</title>
      <link rel="stylesheet" href="/encrypt_decrypt.css">
    </head>
    <body>
        <div>
        <h1>Encrypted Text : <a>${encryptedText}</a></h1>
        </div>
    </body>
    </html>
    `);
});

app.post('/decrypt', (req, res) => {
  const { text } = req.body;
  const decryptedText = decrypt(text);
  res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Encrypted Text</title>
      <link rel="stylesheet" href="/encrypt_decrypt.css">
    </head>
    <body>
        <div>
        <h1>Decrypted Text : <a>${decryptedText}</a></h1>
        </div>
    </body>
    </html>`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
