import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, retry, timeout } from 'rxjs/operators';
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
      timeout(10000), // 10 segundos de timeout
      retry(1), // Reintentar una vez si falla
      map(response => {
        this.accessToken = response.access_token;
        // Establecer expiración 5 minutos antes de lo real para tener margen
        this.tokenExpiration = new Date(Date.now() + (response.expires_in - 300) * 1000);
        return this.accessToken ?? '';
      }),
      catchError(error => {
        console.error('Error al obtener token:', error);
        return throwError(() => new Error('No se pudo autenticar con Battle.net. Verifica tus credenciales y conexión.'));
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
        
        console.log('Realizando petición a:', url);
        return this.http.get<T>(url, { headers }).pipe(
          timeout(15000), // 15 segundos de timeout
          retry(1) // Reintentar una vez
        );
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(`Error en solicitud a API ${endpoint}:`, error);
        
        let errorMessage = 'Error al comunicarse con la API de Battle.net';
        
        if (error.status === 404) {
          errorMessage = `No se encontró el perfil. Verifica el BattleTag y la región.`;
        } else if (error.status === 403) {
          errorMessage = `Acceso denegado. El perfil podría ser privado.`;
        } else if (error.status === 0) {
          errorMessage = `No se pudo conectar con los servidores. Verifica tu conexión a internet.`;
        } else if (error.status === 500) {
          errorMessage = `Error en los servidores de Battle.net. Inténtalo más tarde.`;
        } else if (error.status === 429) {
          errorMessage = `Demasiadas solicitudes a la API. Espera un momento y vuelve a intentarlo.`;
        }
        
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getDiabloProfile(battleTag: string, region: string = 'eu'): Observable<DiabloProfile> {
    if (!battleTag || !battleTag.includes('#')) {
      return throwError(() => new Error('BattleTag inválido. Debe tener el formato nombre#1234'));
    }
    
    const formattedBattleTag = battleTag.replace('#', '-');
    return this.apiRequest<DiabloProfile>(`/d3/profile/${formattedBattleTag}/?locale=es_ES`, region);
  }

  getDiabloHero(battleTag: string, heroId: string, region: string = 'eu'): Observable<DiabloHero> {
    if (!battleTag || !heroId) {
      return throwError(() => new Error('BattleTag o ID de héroe inválido'));
    }
    
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
      'witch-doctor': 'https://blzmedia-a.akamaihd.net/d3/icons/portraits/64/witch-doctor_male.png',
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
