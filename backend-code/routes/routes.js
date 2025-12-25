const express = require('express')
const { signup, login, data, deleteAllUsers,Sudentroute, studentdata, studentcount, studentfee, studentsdelete, Addteacher, teachercount, teacherdata, teacherdelete, searchstudent, addclass, classcount, classdata, classdelete} = require('../controller/controller.js');


const router = express.Router()

router.post('/signup',signup);
router.post('/login',login)
router.post('/students',Sudentroute)
router.post('/addteacher',Addteacher)
router.post('/addclass',addclass)
router.get('/data', data)
router.get('/studentdata',studentdata)
router.get('/teacherdata',teacherdata)
router.get('/studentcount',studentcount)
router.get('/teachercount',teachercount)
router.get('/classcount',classcount)
router.get('/classdata',classdata)
router.delete('/delete',deleteAllUsers)
router.put('/studentdata/:id',studentfee)
router.delete('/studentdata/:id',studentsdelete)
router.delete('/teacherdelete/:id',teacherdelete)
router.delete('/classdelete/:id',classdelete)
router.get('/search',searchstudent)

module.exports = {router}