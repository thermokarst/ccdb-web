import DS from 'ember-data';
import ENV from '../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const { JSONAPIAdapter } = DS;
const { APP: { API_HOST, API_NAMESPACE } } = ENV;

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  namespace: API_NAMESPACE,
  host: API_HOST,
  authorizer: 'authorizer:application',
});
