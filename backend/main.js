const express = require('express');
const app = express();
const PORT = 3000;

// get request
app.get('/', (req, res) => {
  const data = {
    test: "hello"
  }
  res.json(data);
});

// start backend
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
