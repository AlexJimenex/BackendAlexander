const mongoose = require('mongoose')
 mongoose.connect("mongodb+srv://33sansan:yosoysexy87@gems-db.mviwu.mongodb.net/gems?retryWrites=true&w=majority",{
     useCreateIndex:true,
     useNewUrlParser:true,
     useFindAndModify:false,
     useUnifiedTopology: true
 }
 ).then(db => console.log('db is connected'))
 .catch(err=> console.error(err))