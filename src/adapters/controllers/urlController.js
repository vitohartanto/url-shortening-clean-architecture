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
    const url = await this.shortenUrl.execute(longUrl);
    res.json(url);
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
