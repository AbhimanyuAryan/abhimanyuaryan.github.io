---
layout: lesson
title: "Particle System 1: Modules"
course: "Unity Game Development"
course_slug: unity-game-development
playlist_url: "https://www.youtube.com/playlist?list=PLCtHUTXgaAJzPoK1n5ZgA16HYpHM_AHP9"
youtube_id: "UUauKcvH-Gc"
order: 1
description: "An introduction to Unity's Particle System and its module-based architecture. Learn how the particle system is structured and how modules control every aspect of particle behaviour."
---

## Overview

Unity's **Particle System** is one of the most powerful tools in the engine for creating visual effects — fire, smoke, rain, explosions, magic spells, and more. In this first lesson we break down the module-based architecture that makes it so flexible.

## What you'll learn

- What a Particle System component is and how to add one to a GameObject
- How the module system works — each module controls a specific aspect of the particles (emission, shape, color, size, physics, etc.)
- The **Main** module: duration, looping, start lifetime, start speed, start size, start color, gravity modifier
- How to preview particle effects in the Scene view without entering Play mode

## Key concepts

**Particles** are short-lived GameObjects emitted by the system. Each one has:
- A **lifetime** (how long it exists)
- A **velocity** (where it moves)
- A **size** and **color** (which can change over time)

The **Module** system lets you layer behaviour on top of these properties. Most modules are disabled by default — you enable only what you need, keeping performance overhead minimal.

## Tips

- Use the **Open Editor** button in the Particle System inspector to get a wider view of all modules
- The **Simulate** speed slider in the Scene view is invaluable for previewing slow or fast effects
- Always check the **Looping** checkbox for ambient effects (fire, smoke); uncheck it for one-shot effects (explosions)

## Next steps

In Lesson 2 we'll dive into the **Emission** and **Shape** modules, which control how many particles are emitted and in what spatial pattern.
