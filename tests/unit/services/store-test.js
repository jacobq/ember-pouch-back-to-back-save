import { module, test } from 'qunit';
import {
  //pauseTest
} from 'ember-test-helpers';
import { setupTest } from 'ember-qunit';

module('Unit | Service | store', function(hooks) {
  setupTest(hooks);

  test('Can save an item', async function(assert) {
    const store = this.owner.lookup('service:store');
    const item = store.createRecord('item');
    await item.save();
    assert.ok(!item.get('dirtyType'), `Item shouldn't be dirty (just saved it)`);
  });

  test('Can save an item twice', async function(assert) {
    const store = this.owner.lookup('service:store');
    const item = store.createRecord('item');
    await item.save();
    await item.save();
    assert.ok(!item.get('dirtyType'), `Item shouldn't be dirty (just saved it)`);
  });

  test('Can save an item twice before waiting for the first to finish', async function(assert) {
    const store = this.owner.lookup('service:store');
    const item = store.createRecord('item');
    item.save();
  // debugger; //eslint-disable-line no-debugger
  // await pauseTest();
    await item.save();
    assert.ok(!item.get('dirtyType'), `Item shouldn't be dirty (just saved it)`);
  });
});
