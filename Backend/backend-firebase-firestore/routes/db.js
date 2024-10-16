const express =  require ("express");
const router = express.Router();
const {addEmployee, deleteEmployee, getEmployees, updateEmployee  }  =  require('../controllers/db')

router.post('/addEmployee' , addEmployee ,addEmployee )

router.delete('/deleteEmployee/:id' , deleteEmployee)

router.get('/getEmployees/', getEmployees)

router.put('/updateEmployee/:id', updateEmployee);


module.exports =  router ;
