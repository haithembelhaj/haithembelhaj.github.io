// the data hash-Map
export let data = {};



/**
 * set k/v
 * @param key
 * @param value
 * @returns {*}
 */
export function set(key, value){

  if(key instanceof Object) {

    return data = Object.assign(data, key);
  }

  return data[key] = value;
}

/**
 * get data for key
 * @param key
 * @returns {*}
 */
export function get(key) {

  if(!key) {

    return data;
  }

  return data[key];
}

export function submit() {


}

/**
 * convinient default export
 */
export default {set, get, data};