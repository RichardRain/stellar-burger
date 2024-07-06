import { expect, test } from '@jest/globals';
import {
  ingredientsReducer,
  fetchIngredients,
  TIngredientsState
} from './ingredientsSlice';

describe('Проверка слайса ingredientsSlice', () => {
  const initialState: TIngredientsState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  test('Состояние загрузки и сброс ошибки', () => {
    // Дописываем в стейт текст ошибки, чтобы проверить, что она сбрасывается на null
    const state = ingredientsReducer(
      { ...initialState, error: 'test error' },
      fetchIngredients.pending('')
    );

    expect(state).toEqual({
      ingredients: [],
      isLoading: true,
      error: null
    });
  });

  test('Запрос с ошибкой', () => {
    // Дописываем в стейт isLoading: true, т.к. pending уже произошел
    const state = ingredientsReducer(
      { ...initialState, isLoading: true },
      fetchIngredients.rejected(new Error('test error'), '')
    );

    expect(state).toEqual({
      ingredients: [],
      isLoading: false,
      error: 'test error'
    });
  });

  test('Удовлетворительный запрос', () => {
    // Тестовые данные
    const fetchedIngredients = [
      {
        _id: '0',
        name: 'Булка 1',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png'
      }
    ];
    // Дописываем в стейт isLoading: true, т.к. pending уже произошел
    const state = ingredientsReducer(
      { ...initialState, isLoading: true },
      fetchIngredients.fulfilled(fetchedIngredients, '')
    );

    expect(state).toEqual({
      ingredients: fetchedIngredients,
      isLoading: false,
      error: null
    });
  });
});
