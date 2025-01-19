// src/usecases/redirect-url.js
class RedirectUrl {
  constructor(urlRepository) {
    this.urlRepository = urlRepository;
  }

  async execute(shortUrl) {
    const url = await this.urlRepository.findByShortUrl(shortUrl);
    if (url) {
      return url.longUrl;
    }
    return null;
  }
}

module.exports = RedirectUrl;
