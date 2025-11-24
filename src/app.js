const path = require("path");
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRoutes = require('./routes/user.routes');
const empRoutes  = require('./routes/employee.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use("/uploads", express.static("uploads"));



app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp',  empRoutes);

app.get('/', (req, res) => res.json({ status: 'OK' }));

app.use(errorHandler);

module.exports = app;
