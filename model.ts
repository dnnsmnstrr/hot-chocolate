export { data as SongList } from './assets/SongList.json';

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
