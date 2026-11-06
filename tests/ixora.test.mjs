import { test } from 'node:test';
import assert from 'node:assert/strict';
import { budPose, budDock } from '../public/ixora.js';

const start = {x:800,y:500};
const end = {x:120,y:40};
test('menu bud follows an arc and settles into the logo without spinning', () => {
  assert.deepEqual(budPose(0,start,end), {x:800,y:500,size:46,rotation:-18});
  const landed=budPose(1,start,end);
  assert.equal(landed.x,end.x); assert.equal(landed.y,end.y); assert.equal(landed.size,12);
  assert.equal(landed.rotation,0);
  assert.deepEqual(budPose(0,start,end),budPose(-1,start,end));
  assert.deepEqual(landed,budPose(2,start,end));
  assert.ok(budPose(.5,start,end).y < (start.y+end.y)/2);
});

test('bud lands inside the supplied symbol at every header size', () => {
  for (const width of [30,44,54]) {
    const rect={left:20,top:10,width,height:70};
    const dock=budDock(rect);
    assert.ok(dock.x>rect.left && dock.x<rect.left+width);
    assert.ok(Math.abs(dock.y-65.3)<1e-9);
  }
});
