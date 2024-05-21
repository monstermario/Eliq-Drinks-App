import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { DrinkService } from '../../services/drink.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-drinks-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    InfiniteScrollModule,
  ],
  templateUrl: './drinks-list.component.html',
  styleUrl: './drinks-list.component.css',
  providers: [DrinkService],
})
export class DrinksListComponent implements OnInit {
  drinks: any[] = [];
  drinksData: any[] = [];
  pageIndex = 0;

  constructor(
    private drinkService: DrinkService,
    private router: Router,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.drinkService.getDrinks().subscribe({
      next: (data) => {
        this.drinks = data.drinks;
        this.appendItems();
        this.loadingService.setLoading(false);
      },
      error: (error) => {
        console.error('Error fetching data', error);
        this.loadingService.setLoading(false);
      },
    });
  }

  viewDetails(id: string): void {
    this.router.navigate(['/drink', id]);
  }

  appendItems() {
    this.drinksData = [...this.drinksData, ...this.drinks.splice(this.pageIndex * 8, (this.pageIndex + 1) * 8)];
    this.pageIndex += 1;
  }

  onScroll() {
    this.appendItems();
  }
}
