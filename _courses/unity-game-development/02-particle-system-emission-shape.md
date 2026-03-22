---
layout: lesson
title: "Particle System 2: Emission & Shape Module"
course: "Unity Game Development"
course_slug: unity-game-development
playlist_url: "https://www.youtube.com/playlist?list=PLCtHUTXgaAJzPoK1n5ZgA16HYpHM_AHP9"
youtube_id: "u-dAeRWfBu4"
order: 2
description: "Deep dive into the Emission and Shape modules — controlling how many particles are spawned per second and the 3D shape they emit from."
---

## Overview

Two of the most important modules in Unity's Particle System are **Emission** and **Shape**. Together they answer: *how many particles?* and *from where?*

## Emission Module

The Emission module controls the **rate** at which particles are spawned.

### Rate over Time vs Rate over Distance

| Setting | Use case |
|---------|----------|
| **Rate over Time** | Continuous effects like fire, smoke, waterfalls |
| **Rate over Distance** | Effects that respond to movement (tire tracks, dust from footsteps) |

### Bursts

Bursts let you emit a fixed number of particles at specific times. Perfect for:
- Explosions (single large burst)
- Muzzle flash (burst on trigger)
- Confetti cannons

Burst settings:
- **Time** — when in the particle system's lifetime to fire
- **Count** — how many particles to emit
- **Cycles** — how many times to repeat
- **Interval** — time between repeated bursts
- **Probability** — chance (0–1) that the burst fires each cycle

## Shape Module

The Shape module defines the **3D emitter geometry** — where in space particles originate and in what initial direction they travel.

### Common shapes

- **Sphere** — Particles emit from the surface or volume of a sphere, outward in all directions. Great for explosions.
- **Cone** — The default. Particles emit from a disc and spread outward in a cone. Great for smoke, fire.
- **Box** — Particles emit from inside a box. Great for rain, snow (use a wide flat box above the scene).
- **Circle** — 2D ring emitter. Good for portals, magic circles.
- **Mesh** — Emit from the surface of any mesh. Powerful for character effects.

### Emit from options

For Sphere and Cone you can choose to emit from:
- **Volume** — Random point inside the shape
- **Shell/Edge** — Only from the outer surface

## Practical exercise

Try building a simple **campfire** effect using just these two modules:
1. Set Shape to **Cone**, angle ~15°, radius ~0.1
2. Set Emission Rate over Time to **30**
3. Set Start Speed to **1–2** (use random between two constants)
4. Set Start Lifetime to **1.5s**

In the next lesson we'll add velocity modules to make the smoke drift realistically.
