import fetch from 'isomorphic-fetch';
import config from '../../config/app.config';
import { STATUS_ERROR } from '../constants/index';

const apiOptions = {
  baseUrl: config.apiPath,
  makeRequest: fetch,
};

class Api {
  constructor({ baseUrl, makeRequest }) {
    this.baseUrl = baseUrl;
    this.makeRequest = makeRequest;

    this.serverErrorResponse = {
      response: { message: 'Server error. Please try again.', status: STATUS_ERROR },
    };
  }

  async getRequest(url) {
    const normalizedUrl = this.baseUrl + url.trim();
    try {
      const response = await this.makeRequest(normalizedUrl);
      const json = await response.json();
      if (!json.response) {
        throw new Error('Invalid API response');
      }
      return json;
    } catch (e) {
      return this.serverErrorResponse;
    }
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

    try {
      const response = await this.makeRequest(normalizedUrl, requestOptions);
      const json = await response.json();
      if (!json.response) {
        throw new Error('Invalid API response');
      }
      return json;
    } catch (e) {
      return this.serverErrorResponse;
    }
  }
}

export default new Api(apiOptions);
