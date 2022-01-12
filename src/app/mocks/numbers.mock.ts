import { INumbers } from '../interfaces/INumbers.interface';

export const NUMBERS: INumbers[] = [
  {
    value: 1,
    action: 'add',
  },
  {
    value: 2,
    action: 'multiply',
  },
  {
    value: 3,
    action: 'add',
  },
  {
    value: 4,
    action: 'add',
  },
  {
    value: 5,
    action: 'multiply',
  },
  {
    value: 6,
    action: 'multiply',
  },
];

export const OPERATION_LINES: string[] = [
  '1 + 5 = 6',
  '2 * 10 = 20',
  '3 + 5 = 8',
  '4 + 5 = 9',
  '5 * 10 = 50',
  '6 * 10 = 60',
];

export const OPERATION_LINES_UNDEFINED_ADD: string[] = [
  '<MISSING DATA>',
  '2 * 10 = 20',
  '<MISSING DATA>',
  '<MISSING DATA>',
  '5 * 10 = 50',
  '6 * 10 = 60',
];

export const OPERATION_LINES_UNDEFINED_MULTIPLY: string[] = [
  '1 + 5 = 6',
  '<MISSING DATA>',
  '3 + 5 = 8',
  '4 + 5 = 9',
  '<MISSING DATA>',
  '<MISSING DATA>',
];
