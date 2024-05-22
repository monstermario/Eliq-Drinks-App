import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DrinkService } from '../../services/drink.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-drink-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './drink-details.component.html',
  styleUrls: ['./drink-details.component.css'],
  providers: [DrinkService],
})
export class DrinkDetailsComponent implements OnInit {
  drink: any;

  constructor(
    private route: ActivatedRoute,
    private drinkService: DrinkService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadingService.setLoading(true);
    this.drinkService.getDrinkDetails(id!).subscribe({
      next: (data) => {
        this.drink = data.drinks[0];
        this.loadingService.setLoading(false);
      },
      error: (error) => {
        console.error('Error fetching data', error);
        this.loadingService.setLoading(false);
      },
    });
  }

  getIngredients(drink: any): string[] {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      if (drink[`strIngredient${i}`]) {
        ingredients.push(
          `${drink[`strMeasure${i}`] || ''} ${
            drink[`strIngredient${i}`]
          }`.trim()
        );
      }
    }
    return ingredients;
  }
}
