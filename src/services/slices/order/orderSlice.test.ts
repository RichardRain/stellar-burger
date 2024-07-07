import { expect, test } from '@jest/globals';
import {
  orderReducer,
  TOrderState,
  orderBurger,
  addIngredient,
  moveIngredient,
  deleteIngredient,
  clearOrder
} from './orderSlice';

let currentId = 0;
jest.mock('uuid', () => ({
  v4: () => {
    if (currentId > 0) {
      return (currentId++).toString();
    } else {
      return currentId.toString();
    }
  }
}));

describe('Проверяем слайс orderSlice', () => {
  const initialState: TOrderState = {
    orderItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
    orderName: '',
    orderError: null
  };

  const orderData = ['0', '2', '0'];

  const testOrder = {
    _id: '10',
    status: 'done',
    name: 'Заказ 1',
    createdAt: '2024-07-05T17:47:48.796Z',
    updatedAt: '2024-07-05T17:47:51.607Z',
    number: 10000,
    ingredients: [
      JSON.stringify({
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
      }),
      JSON.stringify({
        _id: '0',
        name: 'Мясо 1',
        type: 'main',
        proteins: 150,
        fat: 200,
        carbohydrates: 33,
        calories: 380,
        price: 1400,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
      }),
      JSON.stringify({
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
      })
    ]
  };

  const newOrderResponse = {
    success: true,
    order: testOrder,
    name: 'test order'
  };

  const newIngredients = [
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
    },
    {
      _id: '1',
      name: 'Мясо 1',
      type: 'main',
      proteins: 150,
      fat: 200,
      carbohydrates: 33,
      calories: 380,
      price: 1400,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
    },
    {
      _id: '2',
      name: 'Мясо 2',
      type: 'main',
      proteins: 200,
      fat: 210,
      carbohydrates: 40,
      calories: 400,
      price: 1600,
      image: 'https://code.s3.yandex.net/react/code/meat-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png'
    }
  ];

  const constructorIngredients = [
    { ...newIngredients[0], id: '0' },
    { ...newIngredients[1], id: '1' },
    { ...newIngredients[2], id: '2' }
  ];

  describe('Проверяем orderBurger', () => {
    test('Состояние загрузки', () => {
      const state = orderReducer(
        { ...initialState, orderError: 'test error' },
        orderBurger.pending('', orderData)
      );

      expect(state).toEqual({
        orderItems: {
          bun: null,
          ingredients: []
        },
        orderRequest: true,
        orderModalData: null,
        orderName: '',
        orderError: null
      });
    });

    test('Запрос с ошибкой', () => {
      const state = orderReducer(
        { ...initialState, orderRequest: true },
        orderBurger.rejected(new Error('test error'), '', orderData)
      );

      expect(state).toEqual({
        orderItems: {
          bun: null,
          ingredients: []
        },
        orderRequest: false,
        orderModalData: null,
        orderName: '',
        orderError: 'test error'
      });
    });

    test('Успешный запрос', () => {
      const state = orderReducer(
        { ...initialState, orderRequest: true },
        orderBurger.fulfilled(newOrderResponse, '', orderData)
      );

      expect(state).toEqual({
        orderItems: {
          bun: null,
          ingredients: []
        },
        orderRequest: false,
        orderModalData: testOrder,
        orderName: 'test order',
        orderError: null
      });
    });
  });

  describe('Добавление ингредиентов в заказ', () => {
    test('Добавление булки в заказ', () => {
      const state = orderReducer(
        { ...initialState },
        addIngredient(newIngredients[0])
      );
      expect(state).toEqual({
        orderItems: {
          bun: constructorIngredients[0],
          ingredients: []
        },
        orderRequest: false,
        orderModalData: null,
        orderName: '',
        orderError: null
      });
    });

    test('Добавление мяса в заказ', () => {
      const state = orderReducer(
        { ...initialState },
        addIngredient(newIngredients[1])
      );
      expect(state).toEqual({
        orderItems: {
          bun: null,
          ingredients: [{ ...constructorIngredients[1], id: '0' }]
        },
        orderRequest: false,
        orderModalData: null,
        orderName: '',
        orderError: null
      });
    });
  });

  describe('Перемещение ингредиента', () => {
    test('Перемещение вверх', () => {
      const state = orderReducer(
        {
          ...initialState,
          orderItems: {
            bun: constructorIngredients[0],
            ingredients: [constructorIngredients[1], constructorIngredients[2]]
          }
        },
        moveIngredient({
          ingredient: constructorIngredients[2],
          direction: 'up'
        })
      );
      expect(state).toEqual({
        orderItems: {
          bun: constructorIngredients[0],
          ingredients: [constructorIngredients[2], constructorIngredients[1]]
        },
        orderRequest: false,
        orderModalData: null,
        orderName: '',
        orderError: null
      });
    });

    test('Перемещение вниз', () => {
      const state = orderReducer(
        {
          ...initialState,
          orderItems: {
            bun: constructorIngredients[0],
            ingredients: [constructorIngredients[1], constructorIngredients[2]]
          }
        },
        moveIngredient({
          ingredient: constructorIngredients[1],
          direction: 'down'
        })
      );
      expect(state).toEqual({
        orderItems: {
          bun: constructorIngredients[0],
          ingredients: [constructorIngredients[2], constructorIngredients[1]]
        },
        orderRequest: false,
        orderModalData: null,
        orderName: '',
        orderError: null
      });
    });
  });

  describe('Удаление ингредиента', () => {
    test('Удаление ингредиента "Мясо 1"', () => {
      const state = orderReducer(
        {
          ...initialState,
          orderItems: {
            bun: constructorIngredients[0],
            ingredients: [constructorIngredients[1], constructorIngredients[2]]
          }
        },
        deleteIngredient(constructorIngredients[1])
      );
      expect(state).toEqual({
        orderItems: {
          bun: constructorIngredients[0],
          ingredients: [constructorIngredients[2]]
        },
        orderRequest: false,
        orderModalData: null,
        orderName: '',
        orderError: null
      });
    });
  });

  describe('Очистка заказа', () => {
    test('Полное удаление всех ингредиентов из конструктора', () => {
      const state = orderReducer(
        {
          ...initialState,
          orderItems: {
            bun: constructorIngredients[0],
            ingredients: [constructorIngredients[1], constructorIngredients[2]]
          }
        },
        clearOrder()
      );
      expect(state).toEqual({
        orderItems: {
          bun: null,
          ingredients: []
        },
        orderRequest: false,
        orderModalData: null,
        orderName: '',
        orderError: null
      });
    });
  });
});
