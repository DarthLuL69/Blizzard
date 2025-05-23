export interface DiabloHero {
  id: number;
  name: string;
  class: string;
  level: number;
  paragonLevel: number;
  stats?: {
    life: number;
    damage: number;
    toughness: number;
    healing: number;
    armor: number;
    strength: number;
    dexterity: number;
    vitality: number;
    intelligence: number;
  };
  skills?: {
    active: Array<{
      skill: {
        name: string;
        icon: string;
        description: string;
      }
    }>;
    passive: Array<{
      skill: {
        name: string;
        icon: string;
        description: string;
      }
    }>;
  };
}

export interface DiabloProfile {
  battleTag: string;
  heroes: DiabloHeroSummary[];
}

export interface DiabloHeroSummary {
  id: number;
  name: string;
  class: string;
  level: number;
}
