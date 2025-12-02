const express = require('express');
const router = express.Router();

const {
    Login
} = require('../models/login');


router.post('/login', Login);

module.exports = {
    router
}