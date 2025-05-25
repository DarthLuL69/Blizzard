import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  
  // URL de la imagen
  heroImageUrl: string = '';
  
  ngOnInit(): void {
    // Inicializar la URL de la imagen cuando el componente se inicia
    this.heroImageUrl = this.getClassImage();
    console.log('Clase de héroe:', this.heroClass);
    console.log('URL de imagen:', this.heroImageUrl);
  }
  
  getClassName(): string {
    const classes: {[key: string]: string} = {
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
  
  getClassImage(): string {
    // Usar una URL en línea directa para evitar problemas con archivos locales faltantes
    if (!this.heroClass) {
      console.error('heroClass es undefined o null');
      return 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/x1_minionflag.png';
    }
    
    // Mapa de nombres de clase en español a nombres en inglés para las imágenes
    const classMapping: {[key: string]: string} = {
      'bárbaro': 'barbarian',
      'bárbara': 'barbarian',
      'cruzado': 'crusader',
      'cazador-de-demonios': 'demon-hunter',
      'cazadora-de-demonios': 'demon-hunter',
      'monje': 'monk',
      'nigromante': 'necromancer',
      'médico-brujo': 'witch-doctor',
      'médica-bruja': 'witch-doctor',
      'mago': 'wizard',
      'maga': 'wizard'
    };
    
    const normalizedClass = this.heroClass.toLowerCase();
    console.log('Obteniendo imagen para la clase:', normalizedClass);
    
    // Intentar mapear la clase en español a su equivalente en inglés
    const englishClass = classMapping[normalizedClass] || normalizedClass;
    console.log('Clase mapeada a inglés:', englishClass);
    
    // URLs de imágenes de CDN de Blizzard (en lugar de locales)
    const classImages: {[key: string]: string} = {
      'barbarian': 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/barbarian_male.png',
      'crusader': 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/crusader_male.png',
      'demon-hunter': 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/demon-hunter_male.png',
      'monk': 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/monk_male.png',
      'necromancer': 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/necromancer_male.png',
      'witch-doctor': 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/witch-doctor_male.png',
      'wizard': 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/wizard_male.png'
    };
    
    if (classImages[englishClass]) {
      return classImages[englishClass];
    } else {
      console.warn('Clase no reconocida:', normalizedClass);
      return 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/x1_minionflag.png';
    }
  }
}
