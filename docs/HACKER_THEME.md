# Hacker Theme Integration for al-folio

This document explains how to integrate the [GitHub Pages Hacker Theme](https://github.com/pages-themes/hacker) aesthetic into your al-folio website.

## Overview

The Hacker theme provides a terminal/console aesthetic with:
- **Green-on-black** color scheme (signature green: `#b5e853`)
- **Monospace typography** (Monaco, Terminal, etc.)
- **Terminal-style decorations** (`./ ` prefix, `~/` paths, dashed borders)
- **Glowing text effects** on headings and links

## Files Created

1. **`_sass/_hacker-theme.scss`** - Complete SCSS file with:
   - Color palette variables
   - CSS custom properties for `html[data-theme="hacker"]`
   - Typography overrides
   - Component-specific styles (cards, buttons, code blocks, etc.)

## Integration Steps

### Step 1: Import the Theme SCSS

Add to your main SCSS file (likely `_sass/_themes.scss` or `assets/css/main.scss`):

```scss
@import "hacker-theme";
```

### Step 2: Add Theme Toggle Support

Modify the theme toggle JavaScript to support 3 modes. In `_includes/head.liquid` or your theme script:

```javascript
// Extend theme cycling: light → dark → hacker → light
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  
  const themes = ['light', 'dark', 'hacker'];
  const currentIndex = themes.indexOf(current);
  const nextIndex = (currentIndex + 1) % themes.length;
  const nextTheme = themes[nextIndex];
  
  html.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
}

// On page load
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
});
```

### Step 3: Update Theme Toggle Icon (Optional)

Add a terminal icon for hacker mode:

```html
<button class="theme-toggle" onclick="toggleTheme()">
  <!-- Show different icons based on current theme -->
  <i class="fas fa-sun" data-theme-icon="light"></i>
  <i class="fas fa-moon" data-theme-icon="dark"></i>
  <i class="fas fa-terminal" data-theme-icon="hacker"></i>
</button>
```

### Step 4: Add Background Texture (Optional)

For the authentic look, download the background texture:

```bash
curl -o assets/img/hacker-bg.png \
  https://raw.githubusercontent.com/pages-themes/hacker/master/assets/images/bkg.png
```

Then uncomment this line in `_hacker-theme.scss`:
```scss
background-image: url('/assets/img/hacker-bg.png');
```

## Color Palette Reference

| Variable | Color | Hex | Usage |
|----------|-------|-----|-------|
| `$hacker-conifer` | 🟢 | `#b5e853` | Primary accent, headings |
| `$hacker-cod-grey` | ⬛ | `#151515` | Background |
| `$hacker-gallery` | ⬜ | `#eaeaea` | Text |
| `$hacker-link-color` | 🔵 | `#63c0f5` | Links |
| `$hacker-bouquet` | 🟣 | `#aa759f` | Inline code |
| `$hacker-silver-chalice` | 🔘 | `#aaa` | Muted text |
| `$hacker-rajah` | 🟠 | `#f4bf75` | Warnings |
| `$hacker-apple-blossom` | 🔴 | `#ac4142` | Errors |

## Preview

To preview the theme without full integration:

1. Open browser DevTools (F12)
2. Run: `document.documentElement.setAttribute('data-theme', 'hacker')`
3. The page should switch to hacker styling

## Customization Ideas

### Terminal Cursor Effect
Add a blinking cursor to headings:
```scss
.page-title::after {
  content: "▊";
  animation: blink 1s step-end infinite;
  color: $hacker-conifer;
}
```

### ASCII Art Header
Add terminal-style ASCII art:
```html
<pre class="ascii-art">
  _____  _     _ 
 |  _  || |   (_)
 | |_| || |__  _ 
 |  _  ||  _ \| |
 | | | || |_| | |
 |_| |_||____/|_|
</pre>
```

### Command Prompt Style
Style navigation like a terminal:
```scss
nav a::before { content: "$ "; opacity: 0.5; }
```

## Notes

- The hacker theme works best for personal/portfolio sites
- Some components may need additional styling adjustments
- Test thoroughly in both light and dark environments
- Consider accessibility (the green-on-black may need contrast adjustments)
