import { test } from 'node:test';
import assert from 'node:assert/strict';
import { flowerPose, flowerDock } from '../public/ixora.js';

const start = {x:800,y:500};
const end = {x:120,y:40};
test('one bud follows an arc and aligns with the logo without spinning', () => {
  assert.deepEqual(flowerPose(0,start,end), {x:800,y:500,size:34,rotation:-8});
  const landed=flowerPose(1,start,end);
  assert.equal(landed.x,end.x); assert.equal(landed.y,end.y); assert.equal(landed.size,14);
  assert.equal(landed.rotation,0);
  assert.deepEqual(flowerPose(0,start,end),flowerPose(-1,start,end));
  assert.deepEqual(landed,flowerPose(2,start,end));
  assert.ok(flowerPose(.5,start,end).y < (start.y+end.y)/2);
});

test('flower docks at the bud inside the supplied symbol at every header size', () => {
  for (const width of [138,150,196]) {
    const rect={left:20,top:10,width,height:width*75/240};
    const dock=flowerDock(rect);
    assert.ok(dock.x>rect.left && dock.x<rect.left+width);
    assert.ok(Math.abs(dock.x-(20+width*29.6/240))<1e-9);
    assert.ok(Math.abs(dock.y-(10+width*55.4/240))<1e-9);
  }
});
