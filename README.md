# NAMAHA-STUDIOS

Namaha Studios — studio website.

# Namaha Studios demo

Six-page static website demo using standalone high-resolution AI-created illustrations and cinematic photos, alongside the original Namaha logo. Warm ivory, ink and muted gold palette, responsive layouts, site-wide fading pointer pigment, work filters, concept previews, gallery filters/lightbox, and validated enquiry form.

## Run

Node.js 24 was used for verification. No package installation is required.

```powershell
npm run dev
```

Open http://127.0.0.1:4173/ . Stop the preview with Ctrl+C.

```powershell
npm test
npm run build
```

The static output is `dist/`. Upload through the chosen Git-connected hosting workflow once the destination is confirmed. No archive/ZIP is needed or created. Build output is ignored by Git.

## Routes

Home `/`, About `/about.html`, Services `/services.html`, Work `/work.html`, Gallery `/gallery.html`, Contact `/contact.html`.

## Demo and email behaviour

Projects are labelled as illustrative concepts, not client production credits. Contact details from reference screenshots are not published as verified business information. The original reference files remain intact; an inline SVG viewport preserves the exact logo. All other imagery uses standalone high-resolution assets through native responsive images. The hero loads eagerly; supporting images load lazily. Prompts and generation provenance are recorded in `image-manifest.json`. Images were generated with the built-in image tool and exported as quality-92 JPEGs without resizing.

`public/config.js` has an empty `web3formsAccessKey`. A valid form submission displays a preview confirmation and makes no provider request. No enquiry data is persisted. Set only an owner-verified public Web3Forms form identifier after confirming the recipient; never add a mailbox password. Verify delivery to the actual inbox and reply-to before launch. Honeypot protection is included; configure the provider's additional spam protection for production. Update the privacy notice and demo wording for the final live configuration.

## Motion

`public/pigment.js` drives one fixed, pointer-transparent viewport canvas across all sections. It emits only on pointer movement, diffuses/fades existing trails, clears fully after idle, caps particles and render width, and stops when the page is hidden. Touch/coarse pointers and reduced-motion preferences disable the effect. A desktop pause control is in the hero footer.

## Before production

- Confirm original/logo asset quality, real portfolio media and project credits.
- Confirm owner email, phone, location, domain and repository/hosting ownership.
- Activate and test email delivery; review final privacy text.
- Replace concept content and remove demo markings only with approved content.
- Remove preview `noindex,nofollow` and robots exclusion when appropriate; configure canonical URLs, social sharing images and sitemap for the final domain.
- Record both the pushed source commit and verified deployment separately.

## Moving film cards

Home and Work include a continuous film-card strip. Hover, keyboard focus or the explicit pause button pauses the strip. Reduced-motion preferences replace animation with a manually scrollable row. Images are illustrative studio concepts.

## GitHub and Netlify

Repository: https://github.com/Devth97/NAMAHA-STUDIOS.git . Connect this repository in Netlify with repository root as the base directory. The checked-in `netlify.toml` sets Node 24, build command `npm run build`, and publish directory `dist`. Do not set `public` as the publish directory: the build creates the six HTML route entry points in `dist`.

The GitHub push and Netlify deployment are separate steps. Netlify deployment is being handled by the user. Live email delivery remains unconfigured until an owner-verified form key is supplied. Preview indexing exclusions intentionally remain enabled.
