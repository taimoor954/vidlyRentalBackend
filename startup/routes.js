const express = require('express');
const rentalRoute = require('../routes/rental');
const movieRoute = require('../routes/movie');
const customerRoute = require('../routes/customer');
const genreRoute = require('../routes/genre')
const RegisterUsersRoute = require('../routes/Register')
const authRoute = require('../routes/auth');
const errorMiddleware = require('../middleware/error');
const returnRoute = require('../routes/return');
module.exports= function(app)
{
    app.use(express.json());
    app.use('/api/Rental', rentalRoute);
    app.use('/api/Customer', customerRoute);
    app.use('/api/Movies', movieRoute );
    app.use('/api/Genre', genreRoute);
    app.use('/api/RegisterUsers', RegisterUsersRoute );
    app.use('/api/auth', authRoute);
    app.use('/api/return', returnRoute);
    app.use(errorMiddleware)
}
    