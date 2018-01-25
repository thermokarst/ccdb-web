import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Component.extend({
  // ARGS
  model: null,

  // COMPUTED
  meta: alias('model.meta'),
  links: alias('meta.links'),

  currentPage: alias('meta.pagination.page'),
  totalRecords: alias('meta.pagination.count'),

  firstLink: alias('links.first'),
  lastLink: alias('links.last'),
  nextLink: alias('links.next'),
  prevLink: alias('links.prev'),

  _getPage(link) {
    link = this.get(link);
    if (link === null) {
      return null;
    }
    const url = new URL(link);
    return parseInt(url.searchParams.get('page'));
  },

  _notEqual(a, b) {
    return this.get(a) !== this.get(b);
  },

  first: computed('firstLink', function() { return this._getPage('firstLink'); }),
  last: computed('lastLink', function() { return this._getPage('lastLink'); }),
  next: computed('nextLink', function() { return this._getPage('nextLink'); }),
  prev: computed('prevLink', function() { return this._getPage('prevLink'); }),

  notOnFirst: computed('first', 'currentPage', function() { return this._notEqual('first', 'currentPage'); }),
  notOnLast: computed('last', 'currentPage', function() { return this._notEqual('last', 'currentPage'); }),
});
