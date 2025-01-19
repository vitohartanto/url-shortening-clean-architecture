// src/usecases/shorten-url.js
const URL = require('../entities/url');
const { nanoid } = require('nanoid');

class ShortenUrl {
  constructor(urlRepository) {
    this.urlRepository = urlRepository;
  }

  async execute(longUrl) {
    const shortUrl = nanoid(8); // generates a random 8-character string
    const url = new URL(null, longUrl, shortUrl);
    return this.urlRepository.save(url);
  }
}

module.exports = ShortenUrl;
