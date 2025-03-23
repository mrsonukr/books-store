const express = require('express');
const cors = require('cors');
const app = express();
const bookRoutes = require('./routes/bookRoutes');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});