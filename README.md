# abhimanyuaryan.github.io

Personal blog and portfolio of Abhimanyu Aryan — AI engineer writing about agentic systems, GPU programming, and production AI.

Live at [abhimanyuaryan.github.io](https://abhimanyuaryan.github.io)

## Local Development

This repo is used as a git submodule inside [TheAbhimanyuAryanShow](https://github.com/AIWithAbhimanyuAryan/TheAbhimanyuAryanShow). Run it locally from the parent repo:

```bash
docker compose -f abhimanyuaryan.github.io/docker-compose.yml -f docker-compose.override.yml up
```

Site runs at **http://localhost:8081**

See the parent repo README for full setup instructions (cloning, pulling, pushing across machines).

## Stack

- [Jekyll](https://jekyllrb.com/) + [al-folio](https://github.com/alshedivat/al-folio) theme
- Hosted on GitHub Pages via GitHub Actions
