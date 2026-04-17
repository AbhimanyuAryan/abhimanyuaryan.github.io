---
layout: lesson
title: "Particle System 5: Importing Particle System Packages"
course: "Unity Game Development"
course_slug: unity-game-development
playlist_url: "https://www.youtube.com/playlist?list=PLCtHUTXgaAJzPoK1n5ZgA16HYpHM_AHP9"
youtube_id: "t-ELQH2TOnE"
order: 5
description: "Learn how to import, customize, and use pre-built Unity Particle System packages from the Asset Store and Unity's own sample packs."
---

## Overview

Building particle effects from scratch is powerful, but Unity also ships with high-quality example particle systems — and the Asset Store has thousands more. Knowing how to import, inspect, and customize these saves enormous time.

## Unity's Built-in Particle Examples

Unity's **Standard Assets** and the **Particle Pack** (available free from the Asset Store) include production-ready effects:

- Fire, smoke, dust, sparks
- Magic and sci-fi effects
- Environmental (rain, snow, fog, waterfalls)
- Explosions and impacts

### Importing from the Package Manager

1. Open **Window → Package Manager**
2. Search for "Particle System Samples" under Unity Registry
3. Click **Import** → select the sample effects you want
4. Find the imported prefabs under `Assets/Samples/...`

## Working with Imported Prefabs

When you drag an imported particle prefab into your scene:

1. **Inspect the hierarchy** — Complex effects often use multiple child Particle Systems working together
2. **Check Sub-Emitters** — Some particles trigger child emitters (e.g., sparks that emit smoke on collision)
3. **Look at the materials** — Custom shaders are often used; make sure your render pipeline (URP/HDRP/Built-in) matches
4. **Read the Main module values** — Duration, looping, and Play on Awake settings often need adjusting for your use case

## Render Pipeline Compatibility

This is the most common issue with imported assets:

| Pipeline | Shader prefix                             |
| -------- | ----------------------------------------- |
| Built-in | `Particles/Standard`                      |
| URP      | `Universal Render Pipeline/Particles/...` |
| HDRP     | `HDRP/Particles/...`                      |

If particles appear **pink**, the shader is incompatible. Right-click the material → **Rendering → Convert to URP** (or HDRP).

## Customizing an Imported Effect

Don't just use imported prefabs as-is — customize them:

1. **Duplicate** the prefab before editing (never edit the original)
2. Adjust **colors** to match your game's palette
3. Resize using **Start Size** and the **Transform Scale**
4. Tweak **emission rate** for your performance budget
5. Replace textures with your own sprite sheets for a unique look

## Creating Your Own `.unitypackage`

Once you've built a collection of effects, export them for reuse:

1. Select all particle prefabs and their dependencies in the Project window
2. **Assets → Export Package...**
3. Make sure "Include dependencies" is checked
4. Save as `.unitypackage`

This lets you share your effects across projects or with your team.

## Summary

You now have a solid foundation in Unity's Particle System:

1. ✅ Module architecture
2. ✅ Emission & Shape
3. ✅ Velocity modules
4. ✅ Force & Force Fields
5. ✅ Importing & customizing packages

From here, explore **Sub-Emitters**, **Texture Sheet Animation**, and **Trails** for more advanced effects.
