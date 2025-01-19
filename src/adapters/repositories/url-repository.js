// src/adapters/repositories/url-repository.js
const { Pool } = require('pg');
const URL = require('../../entities/url');
const UrlRepository = require('../../interfaces/url-repository');

class PostgresUrlRepository extends UrlRepository {
  constructor() {
    super();
    this.pool = new Pool({
      connectionString:
        'postgres://vito2:vito4312@localhost:5432/urlshortening',
    });
  }

  async save(url) {
    const { longUrl, shortUrl } = url;
    const result = await this.pool.query(
      'INSERT INTO urls (longUrl, shortUrl) VALUES ($1, $2) RETURNING *',
      [longUrl, shortUrl]
    );
    return new URL(
      result.rows[0].id,
      result.rows[0].longUrl,
      result.rows[0].shortUrl
    );
  }

  async findByShortUrl(shortUrl) {
    const result = await this.pool.query(
      'SELECT * FROM urls WHERE shortUrl = $1',
      [shortUrl]
    );
    if (result.rows.length > 0) {
      return new URL(
        result.rows[0].id,
        result.rows[0].longUrl,
        result.rows[0].shortUrl
      );
    }
    return null;
  }
}

module.exports = PostgresUrlRepository;
