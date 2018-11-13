import PouchDB from 'pouchdb';
import { Adapter } from 'ember-pouch';

export default Adapter.extend({
  init() {
    this._super(...arguments);
    this.set('db', new PouchDB('_example_'));
  }
});
