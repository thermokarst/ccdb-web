import config from '../config/environment';

export default function() {
  this.passthrough(`${config.APP.API_HOST}/api/auth/login/`);
}
