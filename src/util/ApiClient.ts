import axios from 'axios';

type IAPIRequestParams = {
  params: {},
}

export default class APIClient {
  endpoint: string = '';

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get(url: string, options: IAPIRequestParams) {
    return axios.get(this.endpoint + url, {params: options.params});
  }

  post(url: string, options: IAPIRequestParams) {
    console.log(url);
    console.log(options);
    return axios.post(this.endpoint + url, options.params);
  }
}
