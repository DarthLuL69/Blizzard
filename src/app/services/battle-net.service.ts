import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DiabloHero, DiabloProfile } from '../interfaces/game-interfaces';

interface TokenResponse {
  access_token: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root'
})
export class BattleNetService {
  private accessToken: string | null = null;
  private tokenExpiration: Date | null = null;
  private readonly API_BASE_URL = 'https://eu.api.blizzard.com';
  private readonly MEDIA_BASE_URL = 'https://blzmedia-a.akamaihd.net/d3';

  constructor(private readonly http: HttpClient) {}

  private getAccessToken(): Observable<string> {
    if (this.accessToken && this.tokenExpiration && this.tokenExpiration > new Date()) {
      return new Observable<string>(observer => {
        observer.next(this.accessToken!);
        observer.complete();
      });
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${environment.battleNetClientId}:${environment.battleNetClientSecret}`)
    });

    return this.http.post<TokenResponse>('https://oauth.battle.net/token', 'grant_type=client_credentials', { headers }).pipe(
      map(response => {
        this.accessToken = response.access_token;
        this.tokenExpiration = new Date(Date.now() + (response.expires_in - 300) * 1000);
        return response.access_token;
      }),
      catchError(() => throwError(() => new Error('Error de autenticación')))
    );
  }

  private apiRequest<T>(endpoint: string, region: string = 'eu'): Observable<T> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        return this.http.get<T>(`https://${region}.api.blizzard.com${endpoint}`, { headers });
      }),
      catchError(() => throwError(() => new Error('Error en la petición')))
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

  getHeroPortraitUrl(heroClass: string, gender: string = 'male'): string {
    const classMapping: Record<string, string> = {
      'barbarian': 'barbarian',
      'crusader': 'crusader',
      'demon-hunter': 'demon-hunter',
      'monk': 'monk',
      'necromancer': 'necromancer',
      'witch-doctor': 'witch-doctor',
      'wizard': 'wizard'
    };

    const apiClass = classMapping[heroClass.toLowerCase()] || heroClass.toLowerCase();
    return `https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/${apiClass}_${gender}.png`;
  }

  getSkillIconUrl(iconName: string): string {
    return iconName ? 
      `https://blzmedia-a.akamaihd.net/d3/icons/skills/42/${iconName}.png` :
      'https://blzmedia-a.akamaihd.net/d3/icons/skills/42/x1_missing_icon.png';
  }

  getItemIconUrl(iconName: string): string {
    return iconName ?
      `https://blzmedia-a.akamaihd.net/d3/icons/items/small/${iconName}.png` :
      'https://blzmedia-a.akamaihd.net/d3/icons/items/small/questionmark.png';
  }
}
