import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bindPigmentInput } from '../public/pigment.js';

function input(type, values) {
  return Object.assign(new Event(type, { cancelable: true }), values);
}
test('finger movement creates paint without preventing native scrolling', () => {
  const target = new EventTarget();
  const moves = [];
  let ended = false;
  bindPigmentInput(target, point => moves.push(point), () => { ended = true; });
  const start = input('touchstart', { touches: [{ clientX: 90, clientY: 220 }] });
  const move = input('touchmove', { touches: [{ clientX: 95, clientY: 180 }] });
  target.dispatchEvent(start);
  target.dispatchEvent(move);
  target.dispatchEvent(input('touchend', { touches: [] }));
  assert.deepEqual(moves, [{ x: 90, y: 220 }, { x: 95, y: 180 }]);
  assert.equal(start.defaultPrevented || move.defaultPrevented, false);
  assert.equal(ended, true);
});
test('mouse paints once and touch pointer events do not duplicate touch input', () => {
  const target = new EventTarget();
  const moves = [];
  bindPigmentInput(target, point => moves.push(point), () => {});
  target.dispatchEvent(input('pointermove', { pointerType: 'mouse', clientX: 15, clientY: 25 }));
  target.dispatchEvent(input('pointermove', { pointerType: 'touch', clientX: 90, clientY: 100 }));
  assert.deepEqual(moves, [{ x: 15, y: 25 }]);
});
test('multi-touch does not interfere with pinch gestures', () => {
  const target = new EventTarget();
  const moves = [];
  bindPigmentInput(target, point => moves.push(point), () => {});
  target.dispatchEvent(input('touchmove', { touches: [{ clientX: 1, clientY: 1 }, { clientX: 2, clientY: 2 }] }));
  assert.deepEqual(moves, []);
});
