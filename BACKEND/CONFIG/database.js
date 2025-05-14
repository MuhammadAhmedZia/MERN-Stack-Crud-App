const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/MERN-CRUD-OPERATION')
.then(() => console.log('Database Connected'))
.catch(error =>console.log('Database Failed', error));

module.exports = mongoose;
