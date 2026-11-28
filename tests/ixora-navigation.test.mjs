import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resumeIxora, ixoraTiming } from '../public/ixora.js';
const anchor = {x:600,y:400};
test('a page load longer than the animation still resumes a visible bud flight', () => {
  for (const phone of [false,true]) {
    const resumed = resumeIxora({at:1000,anchor},4000,phone);
    assert.deepEqual(resumed.anchor,anchor);
    assert.equal(resumed.age,ixoraTiming(phone).delay);
    assert.ok(ixoraTiming(phone).total-resumed.age>1000);
  }
});
test('a fast navigation preserves its original animation position', () => {
  assert.deepEqual(resumeIxora({at:1000,anchor},1100,false),{anchor,age:100});
});
test('old, future and malformed click records do not replay', () => {
  for (const recent of [null,{at:1000,anchor},{at:13000,anchor},{at:11900,anchor:{x:NaN,y:4}},{at:'invalid',anchor}]) {
    assert.equal(resumeIxora(recent,12000,false),null);
  }
});
