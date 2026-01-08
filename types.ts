
export interface SlotGame {
  id: string;
  name: string;
  provider: string;
  thumbnail: string;
  link: string;
  category: string;
  rating: number;
}

export type Category = 'All' | 'Pragmatic Play' | 'Nolimit City' | 'Hacksaw Gaming' | 'Playtech' | 'PG Soft' | 'Other';
