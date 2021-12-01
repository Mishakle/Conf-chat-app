require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({ message: err.message });
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Server started');
});
