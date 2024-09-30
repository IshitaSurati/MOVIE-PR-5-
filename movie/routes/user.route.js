const express = require('express');
const { signup, login, deleteUser, getAllUsers } = require('../controllers/user.controller');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.delete('/delete/:id', deleteUser);
router.get('/', getAllUsers);

module.exports = router;
