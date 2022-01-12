import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin, mergeMap, Observable, switchMap } from 'rxjs';
import { AppService } from './app.service';
import { INumbers } from './interfaces/INumbers.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  operationLines: string[] = [];

  constructor(private readonly _appService: AppService) {}

  private fetchOperations(): void {
    let numbers: INumbers[] = [];
    this._appService
      .getNumbers()
      .pipe(
        switchMap((_numbers) => {
          numbers = _numbers;
          const observables: Observable<number | undefined>[] = [
            this._appService.getAddValue(),
            this._appService.getMultiplyValue(),
          ];
          return forkJoin(observables);
        })
      )
      .subscribe(([add, multiply]) => {
        this.operationLines = numbers?.map((item) => {
          if (item.action === 'add') {
            if (add === undefined) {
              return '<MISSING DATA>';
            }

            return `${item.value} + ${add} = ${item.value + add}`;
          } else {
            if (multiply === undefined) {
              return '<MISSING DATA>';
            }

            return `${item.value} * ${multiply} = ${item.value * multiply}`;
          }
        });
      });
  }

  ngOnInit(): void {
    this.fetchOperations();
  }
}
