import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DrinkService } from './drink.service';

describe('DrinkService', () => {
  let service: DrinkService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DrinkService]
    });

    service = TestBed.inject(DrinkService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch drinks', () => {
    const mockDrinksResponse = { drinks: [{ idDrink: '1', strDrink: 'Mojito' }] };

    service.getDrinks().subscribe(drinks => {
      expect(drinks).toEqual(mockDrinksResponse);
    });

    const req = httpTestingController.expectOne('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
    expect(req.request.method).toEqual('GET');
    req.flush(mockDrinksResponse);
  });

  it('should fetch drink details', () => {
    const mockDrinkDetailsResponse = { drinks: [{ idDrink: '1', strDrink: 'Mojito', strInstructions: 'Mix ingredients.' }] };

    service.getDrinkDetails('1').subscribe(drinkDetails => {
      expect(drinkDetails).toEqual(mockDrinkDetailsResponse);
    });

    const req = httpTestingController.expectOne('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockDrinkDetailsResponse);
  });
});
