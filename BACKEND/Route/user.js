const { handleCreateUser, handleReadAllUser, handleReadUserById, handleDeleteUserById, handleUpdateUserById } = require('../CONTROLLER/user');


const router = require('express').Router();


router.post('/createuser',handleCreateUser)
router.get('/users',handleReadAllUser)
router.get('/user/:id',handleReadUserById)
router.delete('/user/:id',handleDeleteUserById)
router.put('/user/:id',handleUpdateUserById)


module.exports = router;