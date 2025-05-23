import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DiabloHero, DiabloProfile } from '../interfaces/diablo.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DiabloService {
  private accessToken: string | null = null;
  private tokenExpiration: Date | null = null;
  // España pertenece a la región EU en Battle.net
  private region = 'eu';
  // BattleTag actualizado al nuevo que proporcionaste
  private yourBattleTag = 'nico#21631';

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
        console.error('Error obteniendo token:', error);
        return of('');
      })
    );
  }

  private apiRequest<T>(endpoint: string): Observable<T> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        const url = `https://${this.region}.api.blizzard.com${endpoint}`;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        
        console.log('Realizando petición a:', url);
        return this.http.get<T>(url, { headers });
      }),
      catchError(error => {
        console.error(`Error en API request ${endpoint}:`, error);
        return of({} as T);
      })
    );
  }

  /**
   * Para la API de Diablo 3, el BattleTag debe tener el # reemplazado por -
   */
  getMyProfile(): Observable<DiabloProfile> {
    // Reemplazar # por - para el formato correcto de la API
    const formattedBattleTag = this.yourBattleTag.replace('#', '-');
    console.log('Intentando obtener perfil con tag:', formattedBattleTag);
    
    // Añadimos locale=es_ES para asegurarnos de que obtenemos la versión española
    return this.apiRequest<DiabloProfile>(`/d3/profile/${formattedBattleTag}/?locale=es_ES`);
  }

  getHero(heroId: string): Observable<DiabloHero> {
    // Reemplazar # por - para el formato correcto de la API
    const formattedBattleTag = this.yourBattleTag.replace('#', '-');
    return this.apiRequest<DiabloHero>(`/d3/profile/${formattedBattleTag}/hero/${heroId}?locale=es_ES`);
  }
  
  // Nuevo método para probar explícitamente también con la API de WoW
  // A veces si no has jugado a Diablo III pero sí a WoW puedes tener perfil ahí
  getWoWProfile(): Observable<any> {
    return this.apiRequest<any>(`/profile/wow/character/dun-modr/tuPersonaje?namespace=profile-eu&locale=es_ES`);
  }
}
