import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createFlight, advanceFlight } from '../public/kites.js';

test('a flight stays bounded to three kites and follows a moving target smoothly', () => {
  const flight = createFlight({ x: 200, y: 200 });
  const before = flight.map(kite => kite.x);
  advanceFlight(flight, { x: 600, y: 300 }, 16.667, 100);
  assert.equal(flight.length, 3);
  flight.forEach((kite, i) => {
    assert.ok(kite.x > before[i] && kite.x < 600);
    assert.ok(Number.isFinite(kite.angle));
  });
  assert.equal(new Set(flight.map(kite => kite.x)).size, 3);
});

test('long frame gaps cannot send a kite into an unstable position', () => {
  const flight = createFlight({ x: 0, y: 0 });
  for (let i = 0; i < 100; i++) advanceFlight(flight, { x: 500, y: 400 }, 5000, i * 5000);
  assert.ok(flight.every(kite => Math.abs(kite.x - 500) < 150 && Math.abs(kite.y - 400) < 150));
});
