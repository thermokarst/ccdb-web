import Ember from 'ember';
import BaseAuthorizer from 'ember-simple-auth/authorizers/base';

const { isEmpty, get } = Ember;

export default BaseAuthorizer.extend({
  authorize(data, block) {
    const accessToken = get(data, 'data.attributes.auth-token');
    if (!isEmpty(accessToken)) {
      block('Authorization', `Token ${accessToken}`);
    }
  }
});
