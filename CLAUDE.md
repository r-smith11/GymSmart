# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start the dev server (prompts to choose platform)
npx expo start

# Run on specific platform
npx expo start --android
npx expo start --ios
npx expo start --web

# Lint
npm run lint
```

There are no tests configured in this project.

## Architecture

GymSmart is a React Native fitness app built with **Expo** (SDK 53) and **expo-router** for file-based routing.

### Routing structure

expo-router maps the `app/` directory directly to routes:

- `app/_layout.tsx` — root Stack navigator; renders `(tabs)` and `(auth)` route groups
- `app/(auth)/` — unauthenticated screens: `login.tsx`, `signup.tsx`
- `app/(tabs)/` — main tab bar with five screens: `index` (Home), `log`, `exercises`, `food`, `settings`

### Firebase / Auth

- `src/config/firebaseConfig.js` — initializes the Firebase app and `auth` instance (uses `getReactNativePersistence` for async storage)
- `src/services/auth.ts` — thin wrappers around Firebase Auth: `signUp`, `signIn`, `logOut`

Auth state is not yet wired up to routing guards; the `(auth)` group exists but login/signup screens are stubs.

### Styling conventions

All screens use `StyleSheet.create` with a consistent dark theme:
- Background: `#25292e`
- Primary accent: `#50D8D7`
- Text: `#fff`

### Shared components

`components/` contains `Button.tsx` and `ImageViewer.tsx` — imported via the `@/` alias which resolves to the repo root.
