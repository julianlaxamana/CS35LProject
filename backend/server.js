const app = require('./app')
const db = require('./config/database')
const firestore = require('firebase/firestore');

require('./config/scheduler')

app.listen(5000, () => {
    console.log('Server running on port 5000')
})