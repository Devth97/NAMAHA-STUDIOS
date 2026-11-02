import { test } from 'node:test';
import assert from 'node:assert/strict';
import { flowerPose } from '../public/ixora.js';

const start = {x:800,y:500};
const end = {x:120,y:40};
test('flower follows scroll and lands exactly on the logo, in both directions', () => {
  assert.deepEqual(flowerPose(0,start,end), {x:800,y:500,size:54,rotation:-22});
  const landed=flowerPose(1,start,end);
  assert.equal(landed.x,end.x); assert.equal(landed.y,end.y); assert.equal(landed.size,16);
  assert.deepEqual(flowerPose(0,start,end),flowerPose(-1,start,end));
  assert.deepEqual(landed,flowerPose(2,start,end));
  assert.notDeepEqual(flowerPose(.5,start,end),landed);
});
