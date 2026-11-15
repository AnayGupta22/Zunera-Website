# Zunera website (eatzunera.com)

A static website built on the Zunera Design System. No frameworks, no dependencies.
The `site/` folder is the finished website: upload its contents to any host.

## Preview on your computer

```bash
node serve.js
```

Then open http://localhost:4173

## Change something

| I want to change… | Edit this | Then |
| --- | --- | --- |
| A product (name, copy, origin, pack sizes, **Amazon link**, photo) | `content/products.json` | `node build.js` |
| Phone, WhatsApp, email, address, Instagram, Amazon store link, FSSAI number | `content/site.json` | `node build.js` |
| Menu links, the announcement bar, the six process steps, the "moments" picker | `content/site.json` | `node build.js` |
| Wording on a page (home, about, trade, contact, enquiry) | `templates/pages.js` | `node build.js` |
| Header, footer | `templates/layout.js` | `node build.js` |
| Illustrations | `templates/art.js` | `node build.js` |
| Colours, fonts, spacing, any visual detail | `site/css/styles.css` (tokens are at the top) | just refresh |
| Behaviour (menu, filters, forms) | `site/js/main.js` | just refresh |
| Images, logos, fonts | `site/assets/` | just refresh |

Rebuild after editing content or templates:

```bash
node build.js
```

In headings, put `*stars*` around the words that should appear in serif italic,
for example `"WHOLE *almonds.*"`.

### Add a product

Copy one block in `content/products.json`, give it a new `slug`, and run `node build.js`.
It gets its own page at `products/<slug>.html` and appears in the shop, footer, trade table and enquiry form.
`glyph` picks the line illustration: `date`, `almond`, `cashew`, `pistachio`, `raisin`, `fig` or `apricot`.

### Replace a photo placeholder

Product pages without a photo show a dashed "Image placeholder" box with the brief for the shot.
Save the photo to `site/assets/img/`, then set `"image": "assets/img/your-file.jpg"` and an `imageAlt`
description on that product and rebuild. The placeholder disappears automatically.

## Before going live

1. `content/products.json`: replace each `amazon` link with the real Amazon listing URL, and confirm each `origin` and `sizes`. Medjool Dates was added because the design system lists it; its origin (Jordan) is a placeholder.
2. Add product photos (see above) and the packing-floor photo on the About page.
3. Run `node build.js`, then upload everything inside `site/` to your host and point eatzunera.com at it.

## Design and illustrations

The base is the Zunera carton (sand, olive, Poppins with one Playfair italic accent word per heading, the notched banner, the Follow pill).
On top of that the site adds an earthy colour family (terracotta, saffron, cocoa, plum, pistachio, peach, butter); all colours are tokens at the top of `site/css/styles.css`.

- Each product has its own colour: set `color` (background) and `on` (`ink` or `cream`, the text colour on it) in `content/products.json`.
- The illustrations (eight fruits, journey icons, stamp, sticker bursts) are hand-drawn SVG in `templates/art.js`. A new product needs a drawing added there, or it falls back to the date.
- "Photo slot" boxes mark where a real photograph should go and describe the shot. Give a product an `image` and its slot is replaced by the photo.

## How the forms work

The contact and enquiry forms have no backend. Submitting opens WhatsApp (or the visitor's email app)
with the message already written, addressed to the number and email in `content/site.json`.
Nothing is stored on the website.
