# AGENTS.md

This file provides guidance to Github Copilot, Claude Code and other AI agents when working with code in this repository.

## Project Overview

This is an Expo Router + React Native app built to manage a list of songs with lyrics and chords using **Expo UI (`@expo/ui/swift-ui`)** — an experimental SwiftUI-style declarative component library for React Native. The app displays lyrics with the corresponding chord progressions to accompany musicians while playing their instrument and singing the song.

## Development Commands

### Starting the App

- `bun install` - install dependencies
- `npx expo run:ios` - Run on iOS simulator

### Linting

- `npm run lint` - Run Expo linting

### Building and Deployment

- `eas build --platform ios --profile development` - Create development build
- `eas update` - Publish app update

## Architecture Overview

### UI Framework - Expo UI (`@expo/ui/swift-ui`)

This project uses Expo's experimental SwiftUI-style components, not standard React Native or Tamagui:

- Import components from `@expo/ui/swift-ui`: `VStack`, `HStack`, `Text`, `Button`, `Image`, `List`, `Host`, etc.
- Use `modifiers` prop (not style) for styling: `modifiers={[padding({ top: 16 }), frame({ height: 100 })]}`
- Wrap screens in `<Host>` component with `colorScheme` prop for theming
- System icons via `<Image systemName="icon.name" />`

### Navigation - Expo Router with NativeTabs

File-based routing using Expo Router with experimental `unstable-native-tabs`:

- Root layout (`app/_layout.tsx`) uses `<NativeTabs>` with SF Symbols icons
- Stack navigation uses `SystemScreenStackPreset` with transparent headers and large titles

### Core Structure

This is a React Native Expo app that lets users create and manage collections of song lyrics and chords. The app uses:

- **Framework**: Expo Router for file-based navigation
- **UI Library**: Tamagui for theming and components
- **Data Storage**: AsyncStorage for local song persistence
- **State Management**: React Context (SongProvider) for song management

### Key Data Flow

1. Songs are stored locally in AsyncStorage under the "@songs" key
2. The SongProvider context manages all song state and operations
3. Song data includes lyrics, chords, play statistics, and normalized chord progressions
4. The app tracks session history and play statistics in localStorage
5. A backup of the song data can be synchronized with a GitHub Gist in JSON format

### Data Model (`model.ts`)

Central type definitions and data exports:

- `Song`: id, name, aristId, lyrics, chords, tags
- `Artist`: id, name, description, type
- `SongSession`: address, hours, point (coordinates tuple), name
- JSON data imported via `SongList` and `ArtisList` from `assets/*.json`

### Main Components

- **SongProvider** (`hooks/useSongs.tsx`): Central state management for songs, handles CRUD operations, search, and session tracking
- **SongDetail** (`components/SongDetail.tsx`): Main song display with auto-scrolling, chord transposition, and playback controls
- **Song Type** (`types/index.ts`): Core data structure with id, name, artist, chords, lyrics, playCount, lastPlay, and normalized chord progressions

### Key Features

- Auto-scrolling lyrics with variable speed control
- Chord transposition and display
- Song similarity matching based on chord progressions
- Play statistics tracking (play count, last played, session history)
- Search and filtering by song name, artist or tags
- Data sync/merge functionality for preserving stats across data imports

### Development Notes

- Uses file-based routing with Expo Router in the `app/` directory
- Tamagui config extends default v4 configuration
- Jest testing setup with expo preset
- TypeScript throughout with type definitions in `types/`
- Hooks pattern for reusable logic (chords, lyrics, songs, stats)

## File Conventions

- Route files: lowercase with hyphens (e.g., `flavours.tsx`)
- Components: PascalCase (e.g., `FlavourGroup.tsx`)
- Utilities/config: PascalCase or camelCase (e.g., `StackPreset.ts`)
- Types defined in central `model.ts`, not scattered per-component
- JSON data in `assets/` with structure: `{ version: string, data: Array<T> }`
