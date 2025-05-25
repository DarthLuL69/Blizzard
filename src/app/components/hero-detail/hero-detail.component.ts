import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BattleNetService } from '../../services/battle-net.service';
import { DiabloHero, DiabloItem } from '../../interfaces/game-interfaces';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero: DiabloHero | null = null;
  loading = true;
  error: string | null = null;
  battleTag: string = '';
  region: string = 'eu';
  heroId: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private battleNetService: BattleNetService
  ) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.battleTag = params['battleTag'] || '';
      this.region = params['region'] || 'eu';
      this.heroId = params['heroId'] || '';
      
      if (this.battleTag && this.heroId) {
        this.loadHero();
      } else {
        this.router.navigate(['/search']);
      }
    });
  }
  
  loadHero(): void {
    this.loading = true;
    this.error = null;
    
    this.battleNetService.getDiabloHero(this.battleTag, this.heroId, this.region).subscribe({
      next: (data) => {
        this.hero = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el héroe';
        this.loading = false;
      }
    });
  }
  
  goBack(): void {
    this.router.navigate(['/profile'], { 
      queryParams: { 
        battleTag: this.battleTag,
        region: this.region
      }
    });
  }
  
  getClassName(): string {
    if (!this.hero) return '';
    
    const classes: {[key: string]: string} = {
      'barbarian': 'Bárbaro',
      'crusader': 'Cruzado',
      'demon-hunter': 'Cazador de Demonios',
      'monk': 'Monje',
      'necromancer': 'Nigromante',
      'witch-doctor': 'Médico Brujo',
      'wizard': 'Mago'
    };
    
    return classes[this.hero.class.toLowerCase()] || this.hero.class;
  }
  
  getClassImage(): string {
    if (!this.hero) return '';
    return this.battleNetService.getHeroPortraitUrl(this.hero.class, this.determineGender());
  }
  
  getSkillIcon(iconName: string): string {
    return this.battleNetService.getSkillIconUrl(iconName);
  }
  
  getItemIcon(iconName: string): string {
    return this.battleNetService.getItemIconUrl(iconName);
  }
  
  getItemName(item: DiabloItem): string {
    return item?.name || 'Sin nombre';
  }
  
  getItemColor(item: DiabloItem): string {
    return item?.displayColor || '#ffffff';
  }
  
  getItemIconName(item: DiabloItem): string {
    return item?.icon || 'questionmark';
  }
  
  getItemsArray(): Array<DiabloItem & { key: string }> {
    if (!this.hero?.items) return [];
    return Object.entries(this.hero.items).map(([key, value]) => ({ ...value, key }));
  }
  
  getSlotName(slot: string): string {
    const slotNames: {[key: string]: string} = {
      'head': 'Cabeza',
      'neck': 'Cuello',
      'torso': 'Torso',
      'shoulders': 'Hombros',
      'legs': 'Piernas',
      'waist': 'Cintura',
      'hands': 'Manos',
      'bracers': 'Brazales',
      'feet': 'Pies',
      'leftFinger': 'Anillo Izq.',
      'rightFinger': 'Anillo Der.',
      'mainHand': 'Mano Principal',
      'offHand': 'Mano Secundaria'
    };
    
    return slotNames[slot] || slot;
  }
  
  determineGender(): string {
    return 'male';
  }
}
