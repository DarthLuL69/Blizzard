import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BattleNetService } from '../../services/battle-net.service';
import { DiabloProfile } from '../../interfaces/game-interfaces';
import { HeroCardComponent } from '../hero-card/hero-card.component';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, HeroCardComponent],
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {
  profile: DiabloProfile | null = null;
  loading = true;
  error: string | null = null;
  battleTag = '';
  region = 'eu';

  constructor(
    private battleNetService: BattleNetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.battleTag = params['battleTag'] || '';
      this.region = params['region'] || 'eu';
      
      if (this.battleTag) {
        this.loadProfile();
      } else {
        this.router.navigate(['/search']);
      }
    });
  }

  loadProfile(): void {
    this.loading = true;
    this.error = null;
    
    this.battleNetService.getDiabloProfile(this.battleTag, this.region).subscribe({
      next: (data) => {
        this.profile = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el perfil';
        this.loading = false;
      }
    });
  }

  searchAgain(): void {
    this.router.navigate(['/search']);
  }

  onHeroSelected(heroId: number): void {
    this.router.navigate(['/hero'], { 
      queryParams: { battleTag: this.battleTag, region: this.region, heroId }
    });
  }
}
