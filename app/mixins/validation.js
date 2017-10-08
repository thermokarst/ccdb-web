import Ember from 'ember';

const { Mixin, get } = Ember;
const { keys } = Object;

export default Mixin.create({
  validationSave(changeset, schema, postSave) {
    return changeset
      .cast(keys(schema))
      .validate()
      .then(() => {
        if (changeset.get('isValid')) {
          return changeset.save().then(postSave);
        }
      })
      .catch((error) => {
        /* eslint-disable no-console */
        console.log(error);
        /* eslint-enable no-console */
        get(this, 'model.errors').forEach(({ attribute, message }) => {
          changeset.pushErrors(attribute, message);
        });
      });
  },

  validationCancel(changeset, postCancel) {
      changeset.rollback();
      return postCancel();
  },
});
