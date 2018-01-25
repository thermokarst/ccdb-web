import { isEmpty } from '@ember/utils';
import { get } from '@ember/object';
import BaseAuthorizer from 'ember-simple-auth/authorizers/base';

export default BaseAuthorizer.extend({
  authorize(data, block) {
    const accessToken = get(data, 'data.attributes.auth-token');
    if (!isEmpty(accessToken)) {
      block('Authorization', `Token ${accessToken}`);
    }
  }
});
