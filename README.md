# IPPO Merch v1 — Blind Box Figurines Anime

Boutique e-commerce Next.js 15 · Clean Architecture légère · Convex · Clerk · Zustand · Framer Motion · shadcn/ui.

**Dépôt Git :** `ippo-merch-v1`

## Prérequis

- Node.js 20+
- Comptes [Clerk](https://clerk.com) et [Convex](https://convex.dev)

## Démarrage rapide

```bash
cp .env.example .env.local
# Renseigner les clés Clerk + URL Convex

npm run dev
```

Dans un second terminal :

```bash
npm run convex:dev
```

## Structure

Voir la section **Architecture** dans ce README ou les règles `.cursor/rules/`.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Next.js (Turbopack) |
| `npm run build` | Build production |
| `npm run convex:dev` | Convex dev + sync schéma |
| `npm run convex:deploy` | Déploiement Convex |

## shadcn/ui

```bash
npx shadcn@latest add button card badge
```

Les composants sont générés dans `src/components/ui/`.
