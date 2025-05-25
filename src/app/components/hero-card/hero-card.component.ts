import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroCardComponent {
  @Input() heroId!: number;
  @Input() name!: string;
  @Input() heroClass!: string;
  @Input() level!: number;
  @Input() battleTag!: string;
  @Input() region: string = 'eu';
  
  @Output() heroSelected = new EventEmitter<number>();
  
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
}
