# Jack Lundholm — Portfolio

A hand-built, single-page portfolio. No frameworks, no build step, no templates —
just HTML, CSS and a little JavaScript, served as static files.

## Structure

```
index.html              the whole site (sections + modal skeleton)
css/main.css            design system (palette, type, layout)
js/data.js              ← ALL content lives here
js/main.js              rendering / filtering / modal behaviour (rarely touched)
images/covers/          card cover images (1200×800, uniform 3:2)
images/detail/          full-size images shown in the modal (max 1400px)
images/thumbs/          modal gallery thumbnails
resume/                 resume source (resume.html) + generated PDF
webfonts/               self-hosted Cormorant Garamond + Space Grotesk
scripts/process_images.py  regenerates covers/details/thumbs from source photos
```

## Editing content

**Add a project** — append one object to `PROJECTS` in `js/data.js`:

```js
{
  id: "my-project",                 // unique slug
  title: "My Project",
  category: "school",               // must match a CATEGORIES id
  coverImage: "images/covers/my-project.jpg",   // 3:2, see below
  summary: "One line shown on the card.",
  description: ["Paragraph one.", "Paragraph two."],
  role: "What I did",
  tools: ["SolidWorks", "Python"],
  timeframe: "Summer 2027",
  images: [
    { src: "images/detail/my-project-1.jpg",
      thumb: "images/thumbs/my-project-1.jpg",
      alt: "Describe the image",
      caption: "Caption under the image" }
  ],
  links: [ { label: "GitHub repo", url: "https://github.com/..." } ],
}
```

**Add a category** (e.g. “Personal” or “Research”) — append one object to
`CATEGORIES`. The tab, its project count and its description line appear
automatically. No markup changes needed anywhere.

**Other content** (email, social links, tagline) is in the `SITE` object at the
top of `js/data.js`. About / Skills / Resume copy lives directly in `index.html`.

## Images

Drop source photos into the folders listed in `scripts/process_images.py`
(or point its `SRC` constant at your originals), add an entry to `JOBS`
(`slug → cover image + mode + detail images`), then:

```
py scripts/process_images.py
```

Cover modes: `cover` (photos/renders, center-cropped) or `plate`
(drawings/P&IDs, matted on paper with a hairline border). Thumbnails are
regenerated with the one-liner at the bottom of that script’s comments.

## Resume

`resume/resume.html` is the source; regenerate the PDF after editing it:

```
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="resume\Jack-Lundholm-Resume.pdf" "file:///C:/Users/lundh/Jack/School/Git/Jack-Portfolio/resume/resume.html"
```

## Deploy

It's static — push to GitHub and enable GitHub Pages (or drop the folder on
any static host). Everything works over `file://` too.
