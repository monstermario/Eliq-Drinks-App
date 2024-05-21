import { TestBed } from '@angular/core/testing';
import { DrinkDetailsComponent } from './drink-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DrinkService } from '../../services/drink.service';
import { LoadingService } from '../../services/loading.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('DrinkDetailsComponent', () => {
  let component: DrinkDetailsComponent;
  let fixture: any;
  let drinkService: DrinkService;
  let loadingService: LoadingService;
  let mockActivatedRoute;

  const mockDrink = {
    drinks: [
      {
        idDrink: '15288',
        strDrink: '252',
        strCategory: 'Shot',
        strAlcoholic: 'Alcoholic',
        strGlass: 'Shot glass',
        strInstructions: 'Add both ingredients to shot glass, shoot, and get drunk quick',
        strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg',
        strIngredient1: '151 proof rum',
        strIngredient2: 'Wild Turkey',
        strMeasure1: '1/2 shot Bacardi',
        strMeasure2: '1/2 shot',
      }
    ]
  };

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '15288'
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [DrinkDetailsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        DrinkService,
        LoadingService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DrinkDetailsComponent);
    component = fixture.componentInstance;
    drinkService = TestBed.inject(DrinkService);
    loadingService = TestBed.inject(LoadingService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch drink details on init', () => {
    spyOn(drinkService, 'getDrinkDetails').and.returnValue(of(mockDrink));
    spyOn(loadingService, 'setLoading');

    component.ngOnInit();

    expect(loadingService.setLoading).toHaveBeenCalledWith(true);
    expect(drinkService.getDrinkDetails).toHaveBeenCalledWith('15288');
    expect(component.drink).toEqual(mockDrink.drinks[0]);
    expect(loadingService.setLoading).toHaveBeenCalledWith(false);
  });

  it('should handle error when fetching drink details', () => {
    spyOn(drinkService, 'getDrinkDetails').and.returnValue(throwError('Error'));
    spyOn(loadingService, 'setLoading');

    component.ngOnInit();

    expect(loadingService.setLoading).toHaveBeenCalledWith(true);
    expect(drinkService.getDrinkDetails).toHaveBeenCalledWith('15288');
    expect(component.drink).toBeUndefined();
    expect(loadingService.setLoading).toHaveBeenCalledWith(false);
  });

  it('should get ingredients list', () => {
    const ingredients = component.getIngredients(mockDrink.drinks[0]);
    expect(ingredients).toEqual(['1/2 shot Bacardi 151 proof rum', '1/2 shot Wild Turkey']);
  });
});
