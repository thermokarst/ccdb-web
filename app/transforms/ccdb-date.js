import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return serialized || '';
  },

  serialize(date) {
    if (date !== '') {
      date = new Date(date);
      const day = date.getUTCDate();
      const month = date.getUTCMonth() + 1;
      const year = date.getUTCFullYear();
      return `${year}-${month}-${day}`;
    } else {
      return null;
    }
  }
});
