---
layout: lesson
title: "Particle System 3: Velocity Modules"
course: "Unity Game Development"
course_slug: unity-game-development
playlist_url: "https://www.youtube.com/playlist?list=PLCtHUTXgaAJzPoK1n5ZgA16HYpHM_AHP9"
youtube_id: "17X61pI3eSI"
order: 3
description: "Control how particles move over their lifetime using Velocity over Lifetime, Limit Velocity, and Inherit Velocity modules."
---

## Overview

Once particles are emitted, their movement is governed by velocity modules. Unity provides three main velocity-related modules that give you fine-grained control over how particles travel through space.

## Velocity over Lifetime

This module adds a **constant or animated velocity** to each particle throughout its life.

### Coordinate space

- **Local** — Velocity is relative to the Particle System's own transform. The effect moves with the object.
- **World** — Velocity is in world space. Useful for wind effects that blow in a fixed direction regardless of emitter orientation.
- **Custom** — Velocity is relative to a custom transform.

### Use cases

- **Wind** — Add a small X or Z world-space velocity to smoke/leaves to simulate wind
- **Gravity alternatives** — Instead of using the built-in gravity modifier, use Y velocity curves for more artistic control
- **Spiraling effects** — Combine X and Z velocities with a sine curve on one axis

## Limit Velocity over Lifetime

This module **damps** a particle's velocity when it exceeds a threshold — simulating drag.

- **Speed** — The maximum speed. Particles exceeding this are slowed.
- **Dampen** — How aggressively to reduce velocity (0 = no effect, 1 = instant clamp).

Great for: sparks that slow as they fall, bubbles that reach terminal velocity.

## Inherit Velocity

When a particle system is attached to a **moving object**, this module lets particles inherit some or all of the emitter's velocity at the moment of emission.

- `Initial` — Velocity is inherited once at birth and then the particle moves independently
- `Current` — Velocity continuously tracks the emitter's current speed

**Example:** Exhaust from a spaceship. With `Initial` mode, particles shoot out the back and then drift independently in space. With `Current` mode, they keep following the ship's velocity — which looks wrong for most cases.

## Combining velocity modules

A realistic **smoke trail** uses all three:
1. **Velocity over Lifetime** — Upward Y drift in world space
2. **Limit Velocity** — Terminal velocity so smoke doesn't go too fast
3. **Inherit Velocity** (Initial) — Smoke inherits the emitter's speed when first emitted

## Next steps

Lesson 4 covers the **Force** and **External Forces** modules for physics-driven particle behaviour.
