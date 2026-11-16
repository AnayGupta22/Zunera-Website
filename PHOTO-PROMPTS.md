# Photo prompts for eatzunera.com

Seven product photos are missing. Generate each one with the prompt below, save it under the
exact file name shown, and it appears on the site automatically at the next build (no code changes).

**Where to save:** `site/assets/img/products/`
**Format:** JPG, portrait 4:5, about 1600 px on the long side.

## How to use these in Gemini

1. Start one chat and generate all seven in it, so the light and surface stay consistent.
2. Paste the **style block** first, then one **subject line** at a time.
3. These are ingredient shots with no packaging on purpose: image generators redraw logos and
   label text badly. If you want your pouch in the shot, attach a real photo of the pouch and add
   "place this exact pouch, unchanged, standing behind the bowl".
4. Reject any image with invented text, a logo, hands, or cool blue light.

## Style block (paste once at the start)

```
Photorealistic food photography for a premium Indian dry fruits and dates brand.
Portrait 4:5. One hero subject, centred slightly below the middle, with empty space at the top.
Surface: honed beige travertine stone. Background: soft natural linen drape, out of focus.
Light: warm late-afternoon sunlight from the left, long soft shadows, gentle highlights.
Palette: sand, cream, olive green and warm browns. No cool or blue tones.
Props: at most one hand-thrown stoneware or brass bowl and one small sprig of green leaves.
Shot on a 50mm lens at f/4, eye-level three-quarter angle, shallow depth of field, crisp focus on the food.
No text, no logos, no packaging, no people, no hands, no watermark.
```

## Subject lines

| Save as | Subject line |
| --- | --- |
| `medjool-dates.jpg` | `Subject: a low stoneware bowl piled with large, glossy amber-brown Medjool dates; three dates on the stone in front, one torn open to show the soft caramel flesh.` |
| `almonds.jpg` | `Subject: a stoneware bowl heaped with whole raw almonds with their brown skins on; a small scatter of almonds on the stone, two of them split to show the pale inside.` |
| `cashews.jpg` | `Subject: a small woven wicker basket filled with whole ivory-white cashews; a few cashews spilled onto the stone in front.` |
| `pistachios.jpg` | `Subject: a stoneware bowl of roasted in-shell pistachios, shells naturally split; several opened on the stone showing bright green kernels, with a few empty shells.` |
| `raisins.jpg` | `Subject: a small brass bowl filled with plump golden raisins; a loose handful scattered on the stone, catching the sunlight.` |
| `figs.jpg` | `Subject: a flat stone plate of dried figs in pressed rounds; one fig torn open to show the seeded, honey-coloured centre.` |
| `apricots.jpg` | `Subject: a small woven wicker basket of bright orange dried apricots; three apricots on the stone in front and one fresh green leaf beside them.` |

## Optional extras

| Save as | Prompt (use the same style block, but change the first line of it to "Landscape 3:2") |
| --- | --- |
| `site/assets/img/table.jpg` | `Subject: an overhead flat-lay of eight small stoneware and brass bowls on travertine, each holding one of: dark Ajwa dates, Medjool dates, almonds, cashews, pistachios, golden raisins, dried figs, dried apricots. Evenly spaced, a few pieces scattered between the bowls.` |

Tell Claude once `table.jpg` exists and it can be placed on the home page.

## One photo not to generate

The **packing floor** photo on the Our story page should be a real photograph of your unit in
Jagadhri. The page says "every Zunera pack is sorted, packed and sealed here", so a generated
image would show customers and trade buyers a facility that doesn't exist. Take it on a phone in
daylight, landscape, and save it as `site/assets/img/packing-floor.jpg`.
