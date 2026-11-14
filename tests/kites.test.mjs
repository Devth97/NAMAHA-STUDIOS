import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createFlight, advanceFlight } from '../public/cursor-flower.js';

test('a flight contains exactly one flower and follows a moving target smoothly', () => {
  const flight = createFlight({ x: 200, y: 200 });
  const before = flight.map(flower => flower.x);
  advanceFlight(flight, { x: 600, y: 300 }, 16.667, 100);
  assert.equal(flight.length, 1);
  flight.forEach((flower, i) => {
    assert.ok(flower.x > before[i] && flower.x < 600);
    assert.ok(Number.isFinite(flower.angle));
  });
  assert.equal(new Set(flight.map(flower => flower.x)).size, 1);
});

test('long frame gaps cannot send a flower into an unstable position', () => {
  const flight = createFlight({ x: 0, y: 0 });
  for (let i = 0; i < 100; i++) advanceFlight(flight, { x: 500, y: 400 }, 5000, i * 5000);
  assert.ok(flight.every(flower => Math.abs(flower.x - 500) < 150 && Math.abs(flower.y - 400) < 150));
});
