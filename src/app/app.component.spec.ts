import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import {
  NUMBERS,
  OPERATION_LINES,
  OPERATION_LINES_UNDEFINED_ADD,
  OPERATION_LINES_UNDEFINED_MULTIPLY,
} from './mocks/numbers.mock';

describe('AppComponent', () => {
  const appServiceSpy = jasmine.createSpyObj('AppService', [
    'getNumbers',
    'getAddValue',
    'getMultiplyValue',
  ]);
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: AppService,
          useValue: appServiceSpy,
        },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    appServiceSpy.getNumbers = jasmine.createSpy().and.returnValue(of(NUMBERS));
    appServiceSpy.getAddValue = jasmine.createSpy().and.returnValue(of(5));
    appServiceSpy.getMultiplyValue = jasmine
      .createSpy()
      .and.returnValue(of(10));

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch operations', fakeAsync(() => {
    //@ts-ignore
    component.fetchOperations();
    tick();
    expect(component.operationLines).toEqual(OPERATION_LINES);
  }));

  it('should fetch operations width undefined add value', fakeAsync(() => {
    appServiceSpy.getAddValue = jasmine
      .createSpy()
      .and.returnValue(of(undefined));
    //@ts-ignore
    component.fetchOperations();
    tick();
    expect(component.operationLines).toEqual(OPERATION_LINES_UNDEFINED_ADD);
  }));

  it('should fetch operations width undefined multiply value', fakeAsync(() => {
    appServiceSpy.getMultiplyValue = jasmine
      .createSpy()
      .and.returnValue(of(undefined));
    //@ts-ignore
    component.fetchOperations();
    tick();
    expect(component.operationLines).toEqual(
      OPERATION_LINES_UNDEFINED_MULTIPLY
    );
  }));
});
