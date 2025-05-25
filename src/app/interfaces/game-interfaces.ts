export interface DiabloHero {
  id: number;
  name: string;
  class: string;
  gender: number;
  level: number;
  paragonLevel: number;
  hardcore: boolean;
  seasonal: boolean;
  dead: boolean;
  lastUpdated: number;
  items: {
    [key: string]: DiabloItem;
  };
  followers: {
    templar: DiabloFollower;
    scoundrel: DiabloFollower;
    enchantress: DiabloFollower;
  };
  legendaryPowers: DiabloLegendaryPower[];
  skills: {
    active: DiabloSkill[];
    passive: DiabloSkill[];
  };
  stats: DiabloStats;
}

export interface DiabloProfile {
  battleTag: string;
  paragonLevel: number;
  paragonLevelHardcore: number;
  paragonLevelSeason: number;
  paragonLevelSeasonHardcore: number;
  guildName: string;
  heroes: DiabloHero[];
  lastHeroPlayed: number;
  lastUpdated: number;
  kills: {
    monsters: number;
    elites: number;
    hardcoreMonsters: number;
  };
  highestHardcoreLevel: number;
  timePlayed: {
    [key: string]: number;
  };
  progression: {
    act1: boolean;
    act2: boolean;
    act3: boolean;
    act4: boolean;
    act5: boolean;
  };
  seasonalProfiles: {
    [key: string]: {
      seasonId: number;
      paragonLevel: number;
      paragonLevelHardcore: number;
      kills: {
        monsters: number;
        elites: number;
        hardcoreMonsters: number;
      };
      timePlayed: {
        [key: string]: number;
      };
    };
  };
}

export interface DiabloHeroSummary {
  id: number;
  name: string;
  class: string;
  level: number;
}

export interface DiabloItem {
  id: string;
  name: string;
  icon: string;
  displayColor: string;
  tooltipParams: string;
  transmogItem?: DiabloItem;
  dyeColor?: DiabloItem;
  slot?: string;
  set?: {
    name: string;
    slug: string;
    description: string;
    descriptionHtml: string;
  };
  gems?: DiabloGem[];
  attributes?: {
    primary: DiabloAttribute[];
    secondary: DiabloAttribute[];
  };
  attributesRaw?: {
    [key: string]: {
      min: number;
      max: number;
    };
  };
  openSockets?: number;
  seasonRequiredToDrop?: number;
  isSeasonRequiredToDrop?: boolean;
  seasonDroppedTo?: number;
  isSeasonal?: boolean;
  isAncient?: boolean;
  isPrimal?: boolean;
  stackSize?: number;
  quantity?: number;
  flavorText?: string;
  flavorTextHtml?: string;
  typeName?: string;
  type?: {
    twoHanded: boolean;
    id: string;
  };
  armor?: number;
  damage?: {
    min: number;
    max: number;
    exactMin: number;
    exactMax: number;
  };
  dps?: number;
  attacksPerSecond?: number;
  minDamage?: number;
  maxDamage?: number;
  elementalType?: string;
  blockChance?: string;
  blockAmountMin?: number;
  blockAmountMax?: number;
}

export interface DiabloFollower {
  slug: string;
  level: number;
  items: {
    [key: string]: DiabloItem;
  };
  stats: DiabloStats;
  skills: DiabloSkill[];
}

export interface DiabloSkill {
  skill: {
    slug: string;
    name: string;
    icon: string;
    level: number;
    tooltipUrl: string;
    description: string;
    descriptionHtml: string;
    simpleDescription: string;
    simpleDescriptionHtml: string;
    skillCalcId: string;
  };
  rune?: {
    slug: string;
    type: string;
    name: string;
    level: number;
    description: string;
    descriptionHtml: string;
    simpleDescription: string;
    simpleDescriptionHtml: string;
    skillCalcId: string;
    order: number;
  };
}

export interface DiabloStats {
  life: number;
  damage: number;
  toughness: number;
  healing: number;
  armor: number;
  strength: number;
  dexterity: number;
  vitality: number;
  intelligence: number;
  physicalResist: number;
  fireResist: number;
  coldResist: number;
  lightningResist: number;
  poisonResist: number;
  arcaneResist: number;
  blockChance: number;
  blockAmountMin: number;
  blockAmountMax: number;
  damageIncrease: number;
  critChance: number;
  critDamage: number;
  damageReduction: number;
  thorns: number;
  elitesDamageReduction: number;
  goldFind: number;
  magicFind: number;
  lifeSteal: number;
  lifePerKill: number;
  lifeOnHit: number;
  primaryResource: number;
  secondaryResource: number;
}

export interface DiabloGem {
  item: DiabloItem;
  isGem: boolean;
  isJewel: boolean;
  jewelRank?: number;
  jewelSecondaryUnlockRank?: number;
}

export interface DiabloAttribute {
  text: string;
  textHtml: string;
  affixType: string;
  color: string;
}

export interface DiabloLegendaryPower {
  id: string;
  name: string;
  icon: string;
  displayColor: string;
  tooltipParams: string;
}
