require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');

const app = express();

// cors
app.use(cors({ origin: '*' }));

const clientDirPath = path.join(__dirname, '/../client/dist');
const clientIndexHtml = path.join(clientDirPath, 'index.html');

app.get('/*.js', (req, res, next) => {
  const pathToGzipFile = `${req.url}.gz`;
  try {
    if (fs.existsSync(path.join(clientDirPath, pathToGzipFile))) {
      req.url += '.gz';
      res.set('Content-Encoding', 'gzip');
      res.set('Content-Type', 'text/javascript');
    }
  } catch (err) {
    console.error(err);
  }
  next();
});

// Routing
app.use(morgan('dev'));

// body interpreters
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serving static files
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/*', (req, res) => {
  res.sendFile(clientIndexHtml);
});

// run the app
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`listening on http://localhost:${PORT}`));
