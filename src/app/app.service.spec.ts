import { TestBed, inject } from '@angular/core/testing';
import { AppService } from './app.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NUMBERS } from './mocks/numbers.mock';
import { HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs';

describe('AppService', () => {
  let service: AppService;
  let httpTestingController: HttpTestingController;

  const matSnackSpy = jasmine.createSpyObj('MatSnackbar', ['open']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppService,
        {
          provide: MatSnackBar,
          useValue: matSnackSpy,
        },
      ],
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AppService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get numbers', () => {
    service.getNumbers().subscribe((resData) => {
      expect(resData).toBeTruthy();
      expect(resData).toEqual(NUMBERS);
    });

    const req = httpTestingController.expectOne('/assets/JSON/Numbers.json');
    expect(req.request.method).toBe('GET');

    req.flush(NUMBERS);
  });

  it('should not get numbers', () => {
    service
      .getNumbers()
      .pipe(
        catchError((error, caught) => {
          expect(matSnackSpy.open).toHaveBeenCalled();
          throw error;
        })
      )
      .subscribe((resData) => {
        expect(resData).toBeFalsy();
      });

    const req = httpTestingController.expectOne('/assets/JSON/Numbers.json');
    expect(req.request.method).toBe('GET');

    req.event(new HttpResponse({ status: 404 }));
  });

  it('should get add value', () => {
    service.getAddValue().subscribe((resData) => {
      expect(resData).toBeTruthy();
      expect(resData).toEqual(5);
    });

    const req = httpTestingController.expectOne('/assets/JSON/Add.json');
    expect(req.request.method).toBe('GET');

    req.flush({ value: 5 });
  });

  it('should not get add value', () => {
    service.getAddValue().subscribe((resData) => {
      expect(resData).toBeUndefined();
    });

    const req = httpTestingController.expectOne('/assets/JSON/Add.json');
    expect(req.request.method).toBe('GET');

    req.event(new HttpResponse({ status: 404 }));
  });

  it('should get Multiply value', () => {
    service.getMultiplyValue().subscribe((resData) => {
      expect(resData).toBeTruthy();
      expect(resData).toEqual(5);
    });

    const req = httpTestingController.expectOne('/assets/JSON/Multiply.json');
    expect(req.request.method).toBe('GET');

    req.flush({ value: 5 });
  });

  it('should not get Multiply value', () => {
    service.getMultiplyValue().subscribe((resData) => {
      expect(resData).toBeUndefined();
    });

    const req = httpTestingController.expectOne('/assets/JSON/Multiply.json');
    expect(req.request.method).toBe('GET');

    req.event(new HttpResponse({ status: 404 }));
  });
});
