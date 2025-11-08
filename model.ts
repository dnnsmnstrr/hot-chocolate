export { data as FlavourList } from './assets/FlavourList.json';
export { data as LocationList } from './assets/LocationList.json';
export { data as SongList } from './assets/SongList.json';

export interface Flavour {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Location {
  id: number;
  name: string;
  description: string;
  stores: Store[];
}

export interface Store {
  address: string;
  hours: string;
  point: [number, number];
  name: string;
}

export type ArtistType = 'musician' | 'band' | 'producer' | 'dj';
export interface Artist {
  id: number;
  name: string;
  description: string;
  type: ArtistType;
}

export interface Song {
  id: number;
  title: string;
  artistId: number;
  chords: string[];
  tags: string[];
}

export interface Tag {
  id: string;
  name: string;
}

export interface SongSession {
  id: number;
  songId: number;
  date: string;
  durationSeconds: number;
}
