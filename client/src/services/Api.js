import fetch from 'isomorphic-fetch';
import config from '../../config/app.config';

const apiOptions = {
  baseUrl: config.apiPath,
  makeRequest: fetch,
};

class Api {
  constructor({ baseUrl, makeRequest }) {
    this.baseUrl = baseUrl;
    this.makeRequest = makeRequest;
  }

  async getRequest(url) {
    const normalizedUrl = this.baseUrl + url.trim();
    const response = await this.makeRequest(normalizedUrl);
    const json = await response.json();
    return json;
  }

  async postRequest(url, options) {
    const normalizedUrl = this.baseUrl + url.trim();
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json, application/xml, text/play, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      ...options,
    };

    const response = await this.makeRequest(normalizedUrl, requestOptions);
    const json = await response.json();
    return json;
  }
}

export default new Api(apiOptions);
