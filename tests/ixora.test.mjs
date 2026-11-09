import { test } from 'node:test';
import assert from 'node:assert/strict';
import { flowerPose, flowerDock, flightKeyframes, ixoraTiming } from '../public/ixora.js';

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

test('the flight animates only transform and opacity, without per-frame resizing', () => {
  const frames=flightKeyframes(start,end,14,{delay:40,flight:480,total:600});
  for (const frame of frames) {
    assert.deepEqual(Object.keys(frame).sort(),['offset','opacity','transform']);
    assert.ok(Number.isFinite(frame.offset) && frame.offset>=0 && frame.offset<=1);
  }
  assert.equal(frames[0].opacity,0);
  assert.equal(frames.at(-1).opacity,0);
  assert.match(frames.at(-1).transform,/translate3d\(120px,40px,0\).*rotate\(0deg\)/);
});

test('the bud reaches its destination before fading in both phone and desktop timing', () => {
  for (const timing of [ixoraTiming(true), ixoraTiming(false)]) {
    const frames=flightKeyframes(start,end,14,timing);
    const arrived=frames.at(-2),finished=frames.at(-1);
    assert.equal(arrived.transform,finished.transform);
    assert.equal(arrived.opacity,1);
    assert.ok(arrived.offset<finished.offset);
    assert.ok(frames.every((frame,index)=>index===0 || frame.offset>=frames[index-1].offset));
  }
});

test('click feedback leaves a clearly visible flight and a short logo landing', () => {
  for (const timing of [ixoraTiming(true), ixoraTiming(false)]) {
    assert.ok(timing.flight >= 1000 && timing.flight <= 1300);
    assert.ok(timing.delay >= 100);
    assert.ok(timing.splash < timing.flight);
    assert.ok(timing.total - timing.delay - timing.flight >= 150);
    assert.ok(timing.total < 1700);
  }
});
