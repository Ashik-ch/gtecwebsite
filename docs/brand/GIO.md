# Gio — G-TEC Mahe brand character

Gio is the permanent learning companion in this website’s brand system. Version 1.0 establishes one character, three canonical poses, one reusable component and a consistent voice. Future work should extend this identity rather than introduce a replacement robot.

## Personality

Curious, resourceful, welcoming and quietly confident. Gio helps adult learners feel comfortable taking a first step. A guide alongside the learner, never an examiner or a mascot that talks down to people.

- Signature phrase: **Stay curious. Let’s find your next step.**
- Introduce as **Gio, your G-TEC Mahe learning companion**.
- Use short, warm, practical language; suggest one useful next action.
- Be encouraging when results are empty or a visitor reaches a missing page.
- Don’t promise admissions, certificates, placements or outcomes.
- Always identify chat as automated. Human advisors remain responsible for personal advice.

## Fixed visual identity

The master render is [gio-welcome.png](../../public/mascot/gio-welcome.png). It is the visual source of truth.

| Feature | Invariant |
| --- | --- |
| Silhouette | Large softly squared helmet; small tapered torso; short limbs; oversized boots |
| Shell | Cobalt blue, brand reference `#1748DB` |
| Body | Pearl white, reference `#F5F7FB` |
| Face | Dark navy glass, reference `#10213E` |
| Expression | Two cyan pill-shaped eyes and a small cyan smile |
| Accent | Cyan light, reference `#57E9F5`; small seams only |
| Signature | One tilted open-ring antenna with cyan dot, above the image-left side of the helmet |
| Badge | Cobalt capital G inset on chest, kept readable |
| Limbs | Cobalt mitten hands and boots, white forearms and short white legs |
| Materials | Satin polymer / ceramic, subtle glass visor, soft studio light |
| Proportion | Master silhouette controls all variants; approximately 45:30:25 head / torso / legs excluding antenna |

Rendered lighting produces variations of the reference colours. Don’t apply hue filters, shadows that flatten the face, or course-category colour swaps. Never mirror the character: this reverses the G and moves the signature antenna. Preserve aspect ratio. Don’t add costumes, graduation caps, extra antennae or new facial features.

## Pose library

| Asset | Role | Use |
| --- | --- | --- |
| `gio-welcome.png` | Welcoming wave | Main hero, chat launcher and chat identity |
| `gio-guide.png` | Tablet and open-palm gesture | Course guidance, page headers, career journey, CTA and enquiry introduction |
| `gio-curious.png` | Gentle head tilt, hand at chin | Empty search results, interest finder and 404 recovery |

All three original PNG files retain transparency and are stored in `public/mascot/`. They are 3D-rendered raster illustrations, not a rigged mesh, GLB or editable 3D scene. The same files are reused and cached across pages. Keep the originals when making future optimised exports.

## Website application

Use `Mascot` from `src/Mascot.jsx`, not ad hoc image references. Its pose registry is the implementation source of truth. Keep decorative instances `alt=""`; use descriptive alternative text when introducing the character. A container’s accessible label must explain the action, not merely name the character.

- Main hero: large welcome render; click or keyboard-activate to reveal a greeting and link to the course finder.
- Course discovery: a compact guided card with four interests. It offers relevant course links without claiming a personalised assessment or collecting personal information.
- Empty search: curious pose plus a usable reset action.
- About / Courses / Placements headers: compact guide pose, reduced on mobile.
- Career journey, course sidebar and CTA: small guide pose beside relevant copy.
- Enquiry modal: guide introduction; preserve transparent draft/delivery messaging.
- Chat: welcome pose as a consistent avatar, with clearly automated identity.
- Missing pages: curious pose with a home recovery link.
- Keep student perspectives, campus imagery and course subject imagery focused on people and learning. Avoid a mascot on every repeated course card.

## Motion and layout

Gio has a short entrance, a subtle pointer-hover lift, and gentle scroll-linked vertical movement and tilt in the hero, page headers and CTA. Mobile movement is reduced. No perpetual waving, forced onboarding, tracking gaze or autoplay sound. All mascot transforms and animation are removed for `prefers-reduced-motion`. Greeting and finder buttons work with keyboard input. Never put decorative artwork over a form, navigation or readable text. Leave transparent space around the ring and boots. Avoid cropping the face at small avatar sizes.

## Future character work

1. Start with the master welcome render as the identity reference.
2. Change only pose, gesture or a small relevant prop.
3. Compare helmet, antenna, face, G badge, proportions, materials and palette against the master.
4. Preserve alpha and full silhouette. Store new files with descriptive versioned names.
5. Add approved poses to the central registry; document their purpose here.
6. Check desktop and mobile rendering, focus behaviour, reduced motion and contrast.

Generation used the built-in imagegen tool. The exact master and variant prompts are in `PROMPTS.md`.
