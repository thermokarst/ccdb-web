import Ember from 'ember';
import BaseAuthorizer from 'ember-simple-auth/authorizers/base';

const { isEmpty } = Ember;

export default BaseAuthorizer.extend({
  authorize(data, block) {
    const accessToken = data['token'];
    if (!isEmpty(accessToken)) {
      block('Authorization', `Token ${accessToken}`);
    }
  }
});
