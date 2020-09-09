import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'http://localhost:3000/api'
});

instance.defaults.headers.common['Accept'] = 'application/json';

export default instance;