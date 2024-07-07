import { expect, test } from '@jest/globals';
import { rootReducer } from './rootReducer';
import {
  userReducer,
  ingredientsReducer,
  feedReducer,
  orderReducer
} from '@slices';

describe('Проверка rootReducer', () => {
  test('Инициализация', () => {
    const initState = rootReducer(undefined, { type: 'TEST' });
    expect(initState).toEqual({
      user: userReducer(undefined, { type: 'TEST' }),
      ingredients: ingredientsReducer(undefined, { type: 'TEST' }),
      feed: feedReducer(undefined, { type: 'TEST' }),
      order: orderReducer(undefined, { type: 'TEST' })
    });
  });
});
