import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return serialized || '';
  },

  serialize(date) {
    if (date !== '') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    } else {
      return null;
    }
  }
});
