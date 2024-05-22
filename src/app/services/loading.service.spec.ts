import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a default loading state of false', (done: DoneFn) => {
    service.loading$.subscribe((loading) => {
      expect(loading).toBeFalse();
      done();
    });
  });

  it('should set loading to true', (done: DoneFn) => {
    service.setLoading(true);
    service.loading$.subscribe((loading) => {
      expect(loading).toBeTrue();
      done();
    });
  });

  it('should set loading to false', (done: DoneFn) => {
    service.setLoading(true); // Set to true first to ensure it can toggle back to false
    service.setLoading(false);
    service.loading$.subscribe((loading) => {
      expect(loading).toBeFalse();
      done();
    });
  });
});
