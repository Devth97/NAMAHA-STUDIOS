import { test } from 'node:test';
import assert from 'node:assert/strict';
import { flowerPose, flowerDock } from '../public/ixora.js';

const start = {x:800,y:500};
const end = {x:120,y:40};
test('click feedback flies to its dock and clamps at the endpoints', () => {
  assert.deepEqual(flowerPose(0,start,end), {x:800,y:500,size:28,rotation:-22});
  const landed=flowerPose(1,start,end);
  assert.equal(landed.x,end.x); assert.equal(landed.y,end.y); assert.equal(landed.size,22);
  assert.deepEqual(flowerPose(0,start,end),flowerPose(-1,start,end));
  assert.deepEqual(landed,flowerPose(2,start,end));
  assert.notDeepEqual(flowerPose(.5,start,end),landed);
});

test('the loading dock is to the right of the logo and clear of the next control', () => {
  assert.deepEqual(flowerDock({right:170,top:10,height:44},390,240),{x:190,y:32});
  assert.equal(flowerDock({right:170,top:10,height:44},320,205).x,189);
});
