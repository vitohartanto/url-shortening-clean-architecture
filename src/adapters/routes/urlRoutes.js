// src/adapters/routes/url-routes.js
const express = require('express');
const UrlController = require('../controllers/url-controller');
const PostgresUrlRepository = require('../repositories/url-repository');

const router = express.Router();
const urlRepository = new PostgresUrlRepository();
const urlController = new UrlController(urlRepository);

router.post('/shorten', urlController.shorten.bind(urlController));
router.get('/:shortUrl', urlController.redirect.bind(urlController));

module.exports = router;
