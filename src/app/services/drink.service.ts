import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrinkService {
  private drinksUrl =
    'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic';
  private drinkDetailsUrl =
    'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  constructor(private http: HttpClient) {}

  getDrinks(): Observable<any> {
    return this.http.get<any>(this.drinksUrl);
  }

  getDrinkDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.drinkDetailsUrl}${id}`);
  }
}
