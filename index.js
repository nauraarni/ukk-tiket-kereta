const express = require('express');
const userRoutes = require('./routes/userRoutes');
const pelangganRoutes = require('./routes/pelangganRoutes');
const petugasRoutes = require('./routes/petugasRoutes');
const keretaRoutes =  require('./routes/keretaRoutes');
const gerbongRoutes = require('./routes/gerbongRoutes');
const kursiRoutes = require('./routes/kursiRoutes');
const jadwalRoutes = require('./routes/jadwalRoutes');
const pembelianRoutes = require('./routes/pembelianRoutes');

const app = express();
app.use(express.json()); // Middleware untuk parsing JSON

// Endpoint untuk user
app.use('/api/users', userRoutes);
app.use('/api/pelanggans', pelangganRoutes);
app.use('/api/petugas', petugasRoutes);
app.use('/api/kereta', keretaRoutes);
app.use('/api/gerbong', gerbongRoutes);
app.use('/api/kursi', kursiRoutes);
app.use('/api/jadwal', jadwalRoutes);
app.use('/api/pembelian', pembelianRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});