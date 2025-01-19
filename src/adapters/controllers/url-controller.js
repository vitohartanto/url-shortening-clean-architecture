// src/adapters/controllers/url-controller.js
const ShortenUrl = require('../../usecases/shorten-url');
const RedirectUrl = require('../../usecases/redirect-url');

class UrlController {
  constructor(urlRepository) {
    this.shortenUrl = new ShortenUrl(urlRepository);
    this.redirectUrl = new RedirectUrl(urlRepository);
  }

  async shorten(req, res) {
    const { longUrl } = req.body;

    try {
      const result = await this.shortenUrl.execute(longUrl);

      // Kirim response JSON lengkap
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async redirect(req, res) {
    const { shortUrl } = req.params;
    const longUrl = await this.redirectUrl.execute(shortUrl);
    if (longUrl) {
      res.redirect(longUrl);
    } else {
      res.status(404).send('Not Found');
    }
  }
}

module.exports = UrlController;
