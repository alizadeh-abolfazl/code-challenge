import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INumbers } from './interfaces/INumbers.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _matSnackbar: MatSnackBar
  ) {}

  getNumbers(): Observable<INumbers[]> {
    return this._httpClient.get<INumbers[]>('/assets/JSON/Numbers.json').pipe(
      catchError((error, caught) => {
        if (error.status === 404) {
          this._matSnackbar.open('Server Error', 'dismiss', { duration: 5000 });
        }
        throw error;
      })
    );
  }

  getAddValue(): Observable<number | undefined> {
    return this._httpClient
      .get<{ value: number }>('/assets/JSON/Add.json')
      .pipe(
        map((resData) => resData?.value),
        catchError((error, caught) => {
          if (error.status === 404) {
            return of(undefined);
          }
          throw error;
        })
      );
  }

  getMultiplyValue(): Observable<number | undefined> {
    return this._httpClient
      .get<{ value: number }>('/assets/JSON/Multiply.json')
      .pipe(
        map((resData) => resData?.value),
        catchError((error, caught) => {
          if (error.status === 404) {
            return of(undefined);
          }
          throw error;
        })
      );
  }
}
