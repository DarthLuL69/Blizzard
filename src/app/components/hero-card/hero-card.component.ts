import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BattleNetService } from '../../services/battle-net.service';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent implements OnInit {
  @Input() heroId!: number;
  @Input() name!: string;
  @Input() heroClass!: string;
  @Input() level!: number;
  @Input() battleTag!: string;
  @Input() region: string = 'eu';
  
  @Output() heroSelected = new EventEmitter<number>();
  
  heroImageUrl: string = '';
  constructor(private readonly battleNetService: BattleNetService) {}
  
  ngOnInit(): void {
    this.heroImageUrl = this.battleNetService.getHeroPortraitUrl(this.heroClass, 'male');
  }
  
  getClassName(): string {
    const classes: Record<string, string> = {
      'barbarian': 'Bárbaro',
      'crusader': 'Cruzado',
      'demon-hunter': 'Cazador de Demonios',
      'monk': 'Monje',
      'necromancer': 'Nigromante',
      'witch-doctor': 'Médico Brujo',
      'wizard': 'Mago'
    };
    
    return classes[this.heroClass?.toLowerCase()] || this.heroClass;
  }
  
  selectHero(): void {
    this.heroSelected.emit(this.heroId);
  }
  
  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/x1_minionflag.png';
    }
  }
}
