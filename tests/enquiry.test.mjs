import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateEnquiry, submitEnquiry } from '../public/enquiry.js';

const valid = { name: 'A Creative', email: 'creative@example.com', phone: '', type: 'Film Production', message: 'We would like to discuss a short film.' };
test('whitespace-only required input is rejected', () => {
  assert.equal(validateEnquiry({ ...valid, name: '   ' }).name, 'Please enter your name.');
  assert.ok(validateEnquiry({ ...valid, message: '   ' }).message);
});
test('invalid email and unknown service are rejected', () => {
  assert.ok(validateEnquiry({ ...valid, email: 'hello@', type: 'invented' }).email);
  assert.ok(validateEnquiry({ ...valid, type: 'invented' }).type);
});
test('valid project enquiry passes validation', () => {
  assert.deepEqual(validateEnquiry(valid), {});
});
test('unconfigured demo never sends or claims delivery', async () => {
  let sent = false;
  const result = await submitEnquiry(valid, '', async () => { sent = true; });
  assert.equal(sent, false);
  assert.equal(result.status, 'demo');
});
test('provider rejection is an error rather than false success', async () => {
  await assert.rejects(() => submitEnquiry(valid, 'test-key', async () => ({ok: true, json: async () => ({success: false})})), /could not be sent/);
});
test('confirmed provider response reports sent', async () => {
  const result = await submitEnquiry(valid, 'test-key', async () => ({ok: true, json: async () => ({success: true})}));
  assert.equal(result.status, 'sent');
});
