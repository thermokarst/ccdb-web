import Ember from 'ember';

const { Controller, inject: { service } } = Ember;

export default Controller.extend({
  session: service(),
  flashMessages: service(),

  actions: {
    authenticate() {
      this.transitionToRoute('loading').then(() => {
        let { identification, password } = this.getProperties('identification', 'password');
        this.get('session').authenticate('authenticator:application', identification, password).catch((reason) => {
          this.transitionToRoute('login').then(() => {
            this.get('flashMessages').danger(reason.non_field_errors || reason);
          });
        });
      });
    },
  },
});
