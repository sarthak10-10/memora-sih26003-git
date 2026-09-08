export interface GameItem {
  id: string;
  emoji: string;
  name: string;
  correctRoom: string;
}

export const rooms = [
  'Kitchen',
  'Bedroom',
  'Bathroom',
  'Living Room',
  'Front Door',
];

export const items: GameItem[] = [
  { id: '1', emoji: '🔑', name: 'Keys', correctRoom: 'Front Door' },
  { id: '2', emoji: '🪥', name: 'Toothbrush', correctRoom: 'Bathroom' },
  { id: '3', emoji: '🍽️', name: 'Plate', correctRoom: 'Kitchen' },
  { id: '4', emoji: '🛏️', name: 'Pillow', correctRoom: 'Bedroom' },
  { id: '5', emoji: '📺', name: 'Remote Control', correctRoom: 'Living Room' },
  { id: '6', emoji: '🧴', name: 'Shampoo', correctRoom: 'Bathroom' },
  { id: '7', emoji: '🍳', name: 'Frying Pan', correctRoom: 'Kitchen' },
  { id: '8', emoji: '👕', name: 'Shirt', correctRoom: 'Bedroom' },
  { id: '9', emoji: '📰', name: 'Newspaper', correctRoom: 'Living Room' },
  { id: '10', emoji: '☂️', name: 'Umbrella', correctRoom: 'Front Door' },
];
export const roomIcons: Record<string, string> = {
  Kitchen: 'skillet',
  Bedroom: 'bed',
  Bathroom: 'bathtub',
  'Living Room': 'tv',
  'Front Door': 'meeting_room',
}