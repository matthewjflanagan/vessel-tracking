const express = require('express');
const validator = require('validator');

const app = express();

app.use(express.json());

app.post('/api/validate', (req, res) => {
  const portid = req.body.portid;
  const mmsi = req.body.mmsi;

  // Validate the input values
  if (!validator.isInt(portid)) {
    return res.status(400).send({ error: 'Invalid port ID' });
  }
  if (!validator.isInt(mmsi)) {
    return res.status(400).send({ error: 'Invalid MMSI' });
  }

  // Sanitize the input values
  const sanitizedPortid = validator.escape(portid);
  const sanitizedMmsi = validator.escape(mmsi);

  // Make the API call with the sanitized values
  // ...

  res.send({ message: 'Input values are valid and have been sanitized' });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
