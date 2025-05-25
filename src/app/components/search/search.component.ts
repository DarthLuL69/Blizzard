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
  battleTag = '';
  region = 'eu';
  error: string | null = null;
  
  regions = [
    { value: 'eu', label: 'Europa' },
    { value: 'us', label: 'América' },
    { value: 'kr', label: 'Korea' },
    { value: 'tw', label: 'Taiwan' }
  ];
  
  constructor(private readonly router: Router) {}

  searchProfile(): void {
    if (!this.battleTag?.includes('#')) {
      this.error = 'Introduce un BattleTag válido (nombre#1234)';
      return;
    }
    
    this.error = null;
    this.router.navigate(['/profile'], { 
      queryParams: { battleTag: this.battleTag, region: this.region }
    });
  }
}
