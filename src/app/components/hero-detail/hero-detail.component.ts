import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BattleNetService } from '../../services/battle-net.service';
import { DiabloHero } from '../../interfaces/game-interfaces';

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
      error: (err) => {
        let errorMsg = 'Error al cargar los datos del héroe';
        
        if (err.status === 404) {
          errorMsg = `No se encontró el héroe ${this.heroId} para el perfil ${this.battleTag}`;
        }
        
        this.error = errorMsg;
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
    return this.battleNetService.getClassIcon(this.hero.class);
  }
  
  getSkillIcon(iconName: string): string {
    return this.battleNetService.getSkillIcon(iconName);
  }
  
  getItemIcon(iconName: string): string {
    return this.battleNetService.getItemIcon(iconName);
  }
  
  getItemsArray() {
    if (!this.hero || !this.hero.items) return [];
    return Object.entries(this.hero.items).map(([key, value]) => ({ key, value }));
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
  
  getItemName(item: {key: string; value: any}): string {
    return item.value && item.value.name ? item.value.name : 'Vacío';
  }
  
  getItemColor(item: {key: string; value: any}): string {
    return item.value && item.value.displayColor ? item.value.displayColor : '#fff';
  }
  
  getItemIconName(item: {key: string; value: any}): string {
    return item.value && item.value.icon ? item.value.icon : '';
  }
}
