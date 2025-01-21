const express = require('express');
const userRoutes = require('./routes/userRoutes');
const pelangganRoutes = require('./routes/pelangganRoutes');

const app = express();
app.use(express.json()); // Middleware untuk parsing JSON

// Endpoint untuk user
app.use('/api/users', userRoutes);
app.use('/api/pelanggans', pelangganRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});