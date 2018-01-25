import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';
import RSVP from 'rsvp';
const { keys } = Object;
const { isArray } = Array;

export default Mixin.create({
  validationSave(changesets, postSave) {
    let promises = [], changes = [], saves = [], isValid = true;

    let modelChangeset = changesets['model'];

    // first, delete anything that needs to be removed
    for (const model of changesets['delete']) {
      promises.push(model.destroyRecord());
    }

    // second, handle changes on parent model (this is important if new)
    modelChangeset.validate().then(() => {
      if (modelChangeset.get('isValid')) {
        return modelChangeset.save();
      }
    }).then(() => {
      for (const hasMany of keys(changesets['hasMany'])) {
        for (const { changeset } of changesets['hasMany'][hasMany]) {
          promises.push(changeset.validate());
          changes.push(changeset);
        }
      }
      return RSVP.all(promises);
    }).then(() => {  // don't need the promises, just that they are done.
      for (let changeset of changes) {
        if (get(changeset, 'isValid')) {
          let saver = changeset.save().catch((error) => {
            /* eslint-disable no-console */
            console.log(error);
            /* eslint-enable no-console */
            // TODO: do something with server-side non-attr errors
          });
          saves.push(saver);
        } else {
          isValid = false;
        }
      }
      return RSVP.all(saves);
    }).then(() => {
      if (isValid) { return postSave(); }
    });
  },

  validationCancel(changesets, postCancel) {
    delete changesets['delete'];
    for (const key of keys(changesets)) {
      if (key === 'new') {
        for (const model of changesets[key]) {
          model.destroyRecord();
        }
      } else if (isArray(changesets[key])) {  // hasMany
        for (const { changeset } of changesets[key]) {
          changeset.rollback();
        }
      } else {  // single
        const changeset = changesets[key];
        changeset.rollback();
      }
    }

    return postCancel();
  },
});
