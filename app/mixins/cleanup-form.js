import Ember from 'ember';

const { Mixin, run: { once } } = Ember;

export default Mixin.create({
  actions: {
    willTransition(transition) {
      if (confirm('Any unsaved changes will be discarded.')) {
        let model = this.get('controller.model');
        let hasMany = this.get('controller.hasMany');

        hasMany.forEach((relationship) => {
          model.get(relationship).forEach((r) => {
            once(this, () => {
              if (r.get('isNew')) {
                r.deleteRecord();
              } else {
                r.rollbackAttributes();
              }
            }, this);
          });
        });

        if (model.get('isNew')) {
          model.deleteRecord();
        }
      } else {
        return false;
      }
    },
  },
});
