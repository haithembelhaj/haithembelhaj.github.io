import 'whatwg-fetch';

/**
 * export fetch for awesomeness
 */
export default fetch;

/**
 * generic request
 * @param url
 * @param options
 * @returns {Function|any|*|Promise<U>|Promise.<TResult>|Thenable<U>|Promise}
 */
export function request(url, options = {}) {


  return fetch(url, options)
    .then((resp)=> {

      if(resp.status !== 200) {

        throw resp;
      }

      if(resp.headers.get('Content-Type') === 'application/json') {

        return resp.json();
      }

      return resp.text();
    });
}

/**
 * GET
 * @param url
 * @param options
 * @returns {Function|any|*|Promise.<U>|Promise.<TResult>|Thenable.<U>|Promise}
 */
export function get(url, options = {}) {

  options = Object.assign({method: 'GET'}, options);

  return request(url, options);
}

/**
 * POST
 * @param url
 * @param data
 * @param options
 * @returns {Function|any|*|Promise.<U>|Promise.<TResult>|Thenable.<U>|Promise}
 */
export function post(url, data, options = {}) {

  const csrfToken = window.viewData.global.csrfToken;

  options = Object.assign({
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': csrfToken
    },
    body: JSON.stringify(data)
  }, options);

  return request(url, options);
}