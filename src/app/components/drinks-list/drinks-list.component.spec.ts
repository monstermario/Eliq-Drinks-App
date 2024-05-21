import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterTestingModule } from '@angular/router/testing';
import { DrinksListComponent } from './drinks-list.component';
import { DrinkService } from '../../services/drink.service';
import { LoadingService } from '../../services/loading.service';

describe('DrinksListComponent', () => {
  let component: DrinksListComponent;
  let fixture: ComponentFixture<DrinksListComponent>;
  let drinkService: jasmine.SpyObj<DrinkService>;
  let loadingService: jasmine.SpyObj<LoadingService>;
  let router: Router;

  beforeEach(async () => {
    const drinkServiceSpy = jasmine.createSpyObj('DrinkService', ['getDrinks']);
    const loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['setLoading']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatProgressSpinnerModule,
      ],
      declarations: [DrinksListComponent],
      providers: [
        { provide: DrinkService, useValue: drinkServiceSpy },
        { provide: LoadingService, useValue: loadingServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DrinksListComponent);
    component = fixture.componentInstance;
    drinkService = TestBed.inject(DrinkService) as jasmine.SpyObj<DrinkService>;
    loadingService = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch drinks on init and set loading', () => {
    const mockDrinks = { drinks: [{ id: '1', name: 'Mojito' }] };
    drinkService.getDrinks.and.returnValue(of(mockDrinks));

    fixture.detectChanges();

    expect(loadingService.setLoading).toHaveBeenCalledWith(true);
    expect(drinkService.getDrinks).toHaveBeenCalled();
    expect(component.drinks).toEqual(mockDrinks.drinks);
    expect(loadingService.setLoading).toHaveBeenCalledWith(false);
  });

  it('should handle error when fetching drinks', () => {
    const errorResponse = new ErrorEvent('Network error');
    drinkService.getDrinks.and.returnValue(throwError(() => errorResponse));

    fixture.detectChanges();

    expect(loadingService.setLoading).toHaveBeenCalledWith(true);
    expect(drinkService.getDrinks).toHaveBeenCalled();
    expect(component.drinks).toEqual([]);
    expect(loadingService.setLoading).toHaveBeenCalledWith(false);
  });

  it('should navigate to drink details', () => {
    const navigateSpy = spyOn(router, 'navigate');

    const drinkId = '1';
    component.viewDetails(drinkId);

    expect(navigateSpy).toHaveBeenCalledWith(['/drink', drinkId]);
  });
});
