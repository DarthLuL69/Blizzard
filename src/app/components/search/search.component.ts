import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  battleTag: string = '';
  region: string = 'eu';
  error: string | null = null;
  
  regions = [
    { value: 'eu', label: 'Europa (EU)' },
    { value: 'us', label: 'América (US)' },
    { value: 'kr', label: 'Korea (KR)' },
    { value: 'tw', label: 'Taiwan (TW)' }
  ];
  
  constructor(private router: Router) { }

  searchProfile(): void {
    if (!this.battleTag) {
      this.error = 'Por favor, introduce un BattleTag';
      return;
    }
    
    if (!this.battleTag.includes('#')) {
      this.error = 'El BattleTag debe tener el formato nombre#1234';
      return;
    }
    
    this.error = null;
    this.router.navigate(['/profile'], { 
      queryParams: { 
        battleTag: this.battleTag,
        region: this.region 
      }
    });
  }
}
