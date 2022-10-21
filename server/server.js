const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

if (process.env.NODE_ENV) {
  app.use('/', express.static(path.join(__dirname, '../dist')));
  //   app.get('/', (req, res) => {
  //     return res.status(200).sendFile(path.join(__dirname, './index.html'));
  //   });
}

//start app on port
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
