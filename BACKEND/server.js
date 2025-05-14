const express = require('express');
const app = express();
const cors = require('cors');
const UserRoute = require('./Route/user.js')
require('./CONFIG/database.js')
app.use(express.json());
app.use(cors())

app.use(UserRoute);

app.listen(4000,() => {
    console.log('server started');
    
})
