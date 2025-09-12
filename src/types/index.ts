export interface Club {
  id: string;
  name: string;
  location: {
    area: string;
    city: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  description: string;
  images: string[];
  video?: string;
  stakes: Stake[];
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
  };
  operatingHours: OperatingHours[];
  amenities: string[];
  liveStatus?: LiveStatus;
}

export interface Stake {
  name: string;
  smallBlind: number;
  bigBlind: number;
  minBuyIn: number;
  maxBuyIn?: number;
  currency: string;
}

export interface OperatingHours {
  day: string;
  open: string;
  close: string;
}

export interface LiveStatus {
  lastUpdated: string;
  tablesRunning: number;
  totalPlayers: number;
  waitingList: number;
  expectedWaitTime?: number;
  nextCallTime?: string;
  games: LiveGame[];
}

export interface LiveGame {
  stakeId: string;
  tablesRunning: number;
  players: number;
}
