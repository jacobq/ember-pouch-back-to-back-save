import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | store', function(hooks) {
  setupTest(hooks);

  test('Can save an item', function(assert) {
    const done = assert.async();
    const store = this.owner.lookup('service:store');
    const item = store.createRecord('item');
    item.save().then(() => {
      assert.ok(!item.get('dirtyType'), `Item shouldn't be dirty (just saved it)`);
      done();
    });
  });

  test('Can save an item twice', function(assert) {
    const done = assert.async();
    const store = this.owner.lookup('service:store');
    const item = store.createRecord('item');
    item.save().then(() => {
      item.save().then(() => {
        assert.ok(!item.get('dirtyType'), `Item shouldn't be dirty (just saved it)`);
        done();
      })
    })
  });

  test('Can save an item twice before waiting for the first to finish', function(assert) {
    const done = assert.async();
    const store = this.owner.lookup('service:store');
    const item = store.createRecord('item');
    console.log('1st save ----------'); //eslint-disable-line no-console
    item.save();
    console.log('2nd save ----------'); //eslint-disable-line no-console
    // The following will reject with "TypeError: Cannot read property 'id' of undefined"
    item.save().then(() => {
      // never gets here
      console.log('2nd save finished ----------', item); //eslint-disable-line no-console
      assert.ok(!item.get('dirtyType'), `Item shouldn't be dirty (just saved it)`);
      done();
    }).catch(e => {
/*
TypeError: Cannot read property 'id' of undefined
    at Class._setRecordId (http://localhost:7357/assets/vendor.js:94730:33)
    at Class.setRecordId (http://localhost:7357/assets/vendor.js:94711:12)
    at RecordDataWrapper.setRecordId (http://localhost:7357/assets/vendor.js:89713:18)
    at RecordData.didCommit (http://localhost:7357/assets/vendor.js:92342:29)
    at InternalModel.adapterDidCommit (http://localhost:7357/assets/vendor.js:89352:42)
    at Class.didSaveRecord (http://localhost:7357/assets/vendor.js:94664:21)
    at store._backburner.join (http://localhost:7357/assets/vendor.js:95668:15)
    at Backburner._run (http://localhost:7357/assets/vendor.js:28153:35)
    at Backburner._join (http://localhost:7357/assets/vendor.js:28131:29)
    at Backburner.join (http://localhost:7357/assets/vendor.js:27914:25)
*/
      assert.ok(false, e.stack);
      done();
    });
  });
});
