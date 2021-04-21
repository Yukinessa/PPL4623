const express = require('express');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.get('/', (req, res) =>
  res.status(200).json({
    message: 'hello world',
  })
);

app.listen(PORT, () => console.log(`[LOG] you're app runnin on port ${PORT}`));
