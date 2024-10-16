const express = require ('express');
const app = express() ;
const cors = require('cors');
const dbRoutes =  require("./routes/db") ;


  
app.use(express.json()) ;
app.use(cors());
app.use('/api' , dbRoutes)                
app.listen(5001,  ()=>{
    console.log('Server is running on port  http://localhost:5001')

})

