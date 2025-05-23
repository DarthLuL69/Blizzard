import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DiabloHero, DiabloProfile } from '../interfaces/game-interfaces';

@Injectable({
  providedIn: 'root'
})
export class BattleNetService {
  private accessToken: string | null = null;
  private tokenExpiration: Date | null = null;

  constructor(private http: HttpClient) { }

  private getAccessToken(): Observable<string> {
    if (this.accessToken && this.tokenExpiration && this.tokenExpiration > new Date()) {
      return of(this.accessToken);
    }

    const tokenUrl = 'https://oauth.battle.net/token';
    const body = 'grant_type=client_credentials';
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${environment.battleNetClientId}:${environment.battleNetClientSecret}`)
    });

    return this.http.post<any>(tokenUrl, body, { headers }).pipe(
      map(response => {
        this.accessToken = response.access_token;
        this.tokenExpiration = new Date(Date.now() + (response.expires_in - 300) * 1000);
        return this.accessToken ?? '';
      }),
      catchError(error => {
        console.error('Error al obtener token:', error);
        throw error;
      })
    );
  }

  private apiRequest<T>(endpoint: string, region: string = 'eu'): Observable<T> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const url = `https://${region}.api.blizzard.com${endpoint}`;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        
        return this.http.get<T>(url, { headers });
      }),
      catchError(error => {
        console.error(`Error en solicitud a API ${endpoint}:`, error);
        throw error;
      })
    );
  }

  getDiabloProfile(battleTag: string, region: string = 'eu'): Observable<DiabloProfile> {
    const formattedBattleTag = battleTag.replace('#', '-');
    return this.apiRequest<DiabloProfile>(`/d3/profile/${formattedBattleTag}/?locale=es_ES`, region);
  }

  getDiabloHero(battleTag: string, heroId: string, region: string = 'eu'): Observable<DiabloHero> {
    const formattedBattleTag = battleTag.replace('#', '-');
    return this.apiRequest<DiabloHero>(`/d3/profile/${formattedBattleTag}/hero/${heroId}?locale=es_ES`, region);
  }

  getClassIcon(heroClass: string): string {
    const icons: {[key: string]: string} = {
      'barbarian': 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/barbarian_male.png',
      'crusader': 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/crusader_male.png',
      'demon-hunter': 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/demon-hunter_male.png',
      'monk': 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/monk_male.png',
      'necromancer': 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/necromancer_male.png',
      'witch-doctor': 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/witchdoctor_male.png',
      'wizard': 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/wizard_male.png'
    };
    
    return icons[heroClass.toLowerCase()] || 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/x1_minionflag.png';
  }
  
  getItemIcon(iconName: string): string {
    if (!iconName) return 'https://blzmedia-a.akamaihd.net/d3/icons/items/small/questionmark.png';
    return `https://blzmedia-a.akamaihd.net/d3/icons/items/small/${iconName}.png`;
  }
  
  getSkillIcon(iconName: string): string {
    if (!iconName) return 'https://blzmedia-a.akamaihd.net/d3/icons/skills/42/x1_missing_icon.png';
    return `https://blzmedia-a.akamaihd.net/d3/icons/skills/42/${iconName}.png`;
  }
}
