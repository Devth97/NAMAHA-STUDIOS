import { test } from 'node:test';
import assert from 'node:assert/strict';
import { whatsappHref } from '../public/contact-options.js';
import { validateEnquiry, submitEnquiry } from '../public/enquiry.js';
import { siteConfig } from '../public/config.js';
import { renderBody } from '../public/render.js';

test('WhatsApp links use international digits and safely encode the message', () => {
  const url = new URL(whatsappHref('+1 (202) 555-0147', 'Hello & welcome?'));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/12025550147');
  assert.equal(url.searchParams.get('text'), 'Hello & welcome?');
  for (const number of ['', '123', 'javascript:alert(1)', '01234567890']) assert.equal(whatsappHref(number, ''), '');
});

test('studio phone, email and WhatsApp replace the demo contact details', () => {
  assert.equal(new URL(whatsappHref(siteConfig.whatsappNumber)).pathname,'/917022833448');
  assert.equal(siteConfig.whatsappDemo,false);
  const html=renderBody('contact');
  assert.match(html,/href="tel:\+917022833448"/);
  assert.match(html,/href="mailto:namahastudios.in@gmail.com"/);
  assert.doesNotMatch(html,/12025550147|Demo number/);
});

test('company is optional, limited in length, and included in the enquiry email', async () => {
  const data = { name:'A Creative', email:'creative@example.com', type:'Film Production', message:'A film idea', company:'  Coastal Films  ' };
  assert.deepEqual(validateEnquiry(data), {});
  assert.ok(validateEnquiry({...data, company:'x'.repeat(151)}).company);
  let payload;
  await submitEnquiry(data, 'test-key', async (_, options) => {
    payload = JSON.parse(options.body);
    return {ok:true, json:async () => ({success:true})};
  });
  assert.equal(payload.company, 'Coastal Films');
});
