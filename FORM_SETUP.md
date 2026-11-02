# Enquiry form and WhatsApp setup

The Contact page has an enquiry form, inline validation, spam honeypot, loading state, error handling and a confirmation screen. It uses the existing Web3Forms integration. No new Codex connector or database is required for email enquiries.

## Activate email delivery

1. The studio has supplied `namahastudios.in@gmail.com` as its contact inbox. Use that inbox for the form setup.
2. At https://web3forms.com/ create a form access key using that inbox. Complete the email verification requested by the provider.
3. Put the form's public access key into `web3formsAccessKey` in `public/config.js`. This is the public submission key, not an account-management API credential or mailbox password.
4. Rebuild and deploy through the configured GitHub/Netlify workflow. The existing security policy already allows the Web3Forms submission endpoint.
5. Send a test enquiry and confirm that it arrives in the inbox, including the reply-to email, company, service, budget, timing and message. Check spam if needed. Do not treat a visual demo confirmation as an actual delivery test.

Without that access key the form stays in clearly labelled demo mode, sends nothing and retains entered values. No email account connection to Codex is necessary.

Official setup: https://docs.web3forms.com/getting-started/installation

## WhatsApp

`public/config.js` contains `whatsappNumber`, `whatsappMessage` and `whatsappDemo`.

The studio number is now `+91 70228 33448`. Both WhatsApp links use `https://wa.me/917022833448` and `whatsappDemo` is false. Phone links use `tel:+917022833448`; email links use `mailto:namahastudios.in@gmail.com`. Opening WhatsApp prepares an editable greeting and does not send a message automatically.

A normal WhatsApp or WhatsApp Business account registered to that number is sufficient for this link; no WhatsApp API integration is required. Account registration and receipt of messages have not been independently tested.

Official click-to-chat format: https://faq.whatsapp.com/5913398998672934

## Current validation

Automated tests mock provider responses; they do not contact Web3Forms or send messages to WhatsApp. The contact details are installed. Live form email delivery still needs the form access key and an inbox receipt test.
