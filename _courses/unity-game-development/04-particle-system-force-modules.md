---
layout: lesson
title: "Particle System 4: Force Control Modules"
course: "Unity Game Development"
course_slug: unity-game-development
playlist_url: "https://www.youtube.com/playlist?list=PLCtHUTXgaAJzPoK1n5ZgA16HYpHM_AHP9"
youtube_id: "iTQx7XtcDp0"
order: 4
description: "Apply physics forces to particles using the Force over Lifetime module and Unity's Particle System Force Fields."
---

## Overview

The **Force over Lifetime** module and **Force Fields** give you physics-based control over particle movement — attractors, vortexes, turbulence, and custom force volumes.

## Force over Lifetime

Applies a constant or animated **acceleration** to every particle. Unlike Velocity over Lifetime (which sets speed directly), Force over Lifetime changes speed gradually — simulating real forces.

### Settings

- **X, Y, Z** — Force vector components. Can be constant, random, or animated curves.
- **Space** — Local or World (same as Velocity module)
- **Randomize** — Adds random variation each frame for more organic-looking motion

### Common uses

| Force           | Application                                                     |
| --------------- | --------------------------------------------------------------- |
| Negative Y      | Custom gravity (more artistic than the global gravity modifier) |
| Positive Y      | Buoyancy — bubbles, helium balloons                             |
| Oscillating X/Z | Wind turbulence on leaves/snow                                  |

## Particle System Force Fields

Force Fields are **scene objects** that influence particles from any Particle System configured to use them. This lets you create global attractors and repulsors.

### Adding a Force Field

1. Create an empty GameObject → Add Component → **Particle System Force Field**
2. In your Particle System, enable **External Forces** module
3. Set **Influence Filter** to specify which force fields affect this system

### Force Field types

- **Sphere** — Radial force (attract or repel) based on distance from center
- **Hemisphere** — One-sided radial force
- **Cylinder** — Force along a cylindrical axis (good for vortex effects)
- **Box** — Uniform force inside a volume

### Force Field parameters

- **Start/End Range** — Inner and outer radius of influence
- **Gravity** — Attraction (negative) or repulsion (positive) strength
- **Rotation Speed** — Spins particles around the force field center (vortex!)
- **Drag** — Slows particles inside the field
- **Vector Field** — Use a texture to define arbitrary 3D flow patterns

### Example: Magic vortex

1. Create a Cylinder Force Field, Gravity = -2, Rotation Speed = 45°/s
2. Point your particle system's Cone emitter at the force field
3. Particles will spiral inward — great for portals, black holes, drain effects

## Tips

- Use Force over Lifetime for **global, uniform forces** on all particles
- Use Force Fields for **spatially-localized, scene-based forces**
- Combine both: global gravity (Force over Lifetime) + local attractor (Force Field) for complex effects

## Next steps

In Lesson 5 we'll look at importing and using pre-built Particle System packages from the Unity Asset Store.
