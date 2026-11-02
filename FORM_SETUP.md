# Enquiry form and WhatsApp setup

The Contact page has an enquiry form, inline validation, spam honeypot, loading state, error handling and a confirmation screen. It uses the existing Web3Forms integration. No new Codex connector or database is required for email enquiries.

## Activate email delivery

1. Choose the studio email inbox that should receive enquiries.
2. At https://web3forms.com/ create a form access key using that inbox. Complete the email verification requested by the provider.
3. Put the form's public access key into `web3formsAccessKey` in `public/config.js`. This is the public submission key, not an account-management API credential or mailbox password.
4. Rebuild and deploy through the configured GitHub/Netlify workflow. The existing security policy already allows the Web3Forms submission endpoint.
5. Send a test enquiry and confirm that it arrives in the inbox, including the reply-to email, company, service, budget, timing and message. Check spam if needed. Do not treat a visual demo confirmation as an actual delivery test.

Without that access key the form stays in clearly labelled demo mode, sends nothing and retains entered values. No email account connection to Codex is necessary.

Official setup: https://docs.web3forms.com/getting-started/installation

## WhatsApp

`public/config.js` contains `whatsappNumber`, `whatsappMessage` and `whatsappDemo`.

The temporary number is the fictional North American example `+1 202-555-0147`. It is not a working studio number and may be rejected by WhatsApp. Both the floating button and Contact-page link show “Demo number”. The link opens WhatsApp's click-to-chat destination with an editable greeting; opening it does not send a message automatically.

When the real number is provided, replace it with the full international number (country code included) and set `whatsappDemo: false`. A normal WhatsApp or WhatsApp Business account registered to that number is sufficient for this link; no WhatsApp API integration is required.

Official click-to-chat format: https://faq.whatsapp.com/5913398998672934

## Current validation

Automated tests mock provider responses; they do not contact Web3Forms or send messages to WhatsApp. Live email delivery and the final WhatsApp account must be checked after the studio supplies its details.
