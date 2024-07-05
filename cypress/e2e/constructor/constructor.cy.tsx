
describe('Функционал ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.visit('http://localhost:4000/');
  });
  it('Добавление булок', () => {
    // Находим ингредиент "Булка 1 в списке ингредиентов"
    cy.get(`[data-cy=ingredient${0}]`).contains('Булка 1').should('exist');
    // Находим конструктор бургеров и проверяем что он пустой
    cy.get('[data-cy=constructor]').contains('Выберите булки').should('exist');
    // Находим кнопку "Добавить" у ингредиента "Булка 1" и нажимаем на нее
    cy.get(`[data-cy=ingredient${0}]`).contains('Добавить').click();
    // Проверяем что в конструкторе появилась булка "Булка 1" в обоих полях
    cy.get('[data-cy=constructor]').contains('Булка 1 (верх)').should('exist');
    cy.get('[data-cy=constructor]').contains('Булка 1 (низ)').should('exist');
  });
  it('Добавление ингредиентов и проверка счетчика', () => {
    // Аналогично добавляем два одинаковых ингредиента и проверяем изменился ли счетчик
    cy.get(`[data-cy=ingredient${2}]`).contains('Мясо 1').should('exist');
    cy.get(`[data-cy=ingredient${2}]`).contains('Добавить').click();
    cy.get('[data-cy=constructor]').contains('Мясо 1').should('exist');

    cy.get(`[data-cy=ingredient${2}]`).contains('Мясо 1').should('exist');
    cy.get(`[data-cy=ingredient${2}]`).contains('Добавить').click();
    cy.get('[data-cy=constructor]').contains('Мясо 1').should('exist');

    cy.get(`[data-cy=ingredient${2}]`).get('.counter').contains('2').should('exist');
  });
  it('Перемещение ингредиентов в конструкторе', () => {
    // Аналогично добавляем два ингредиента и меняем их местами
    cy.get(`[data-cy=ingredient${2}]`).contains('Мясо 1').should('exist');
    cy.get(`[data-cy=ingredient${2}]`).contains('Добавить').click();
    // Проверяем, что начинка находится в первом поле конструктора (индекс поля - 0)
    cy.get(`[data-cy=constructor-item${0}]`).contains('Мясо 1').should('exist');

    cy.get(`[data-cy=ingredient${4}]`).contains('Соус 1').should('exist');
    cy.get(`[data-cy=ingredient${4}]`).contains('Добавить').click();
    // Проверяем, что начинка находится во втором поле конструктора (индекс поля - 1)
    cy.get(`[data-cy=constructor-item${1}]`).contains('Соус 1').should('exist');
    // Находим кнопки перемещения ингредиента и нажимаем первую (кнопка переместить вверх)
    const moveButtons = cy.get(`[data-cy=constructor-item${1}]`).find('.move_button');
    moveButtons.first().click();
    // Проверяем, что оба ингредиента поменялись местами
    cy.get(`[data-cy=constructor-item${0}]`).contains('Соус 1').should('exist');
    cy.get(`[data-cy=constructor-item${1}]`).contains('Мясо 1').should('exist');
  });
  it('Удаление ингредиента', () => {
    // Добавляем ингредиент
    cy.get(`[data-cy=ingredient${2}]`).contains('Мясо 1').should('exist');
    cy.get(`[data-cy=ingredient${2}]`).contains('Добавить').click();
    cy.get('[data-cy=constructor]').contains('Мясо 1').should('exist');
    // Кликаем по кнопке удаления ингредиента и убеждаемся, что он удалился
    cy.get(`[data-cy=constructor-item${0}]`).find('.constructor-element__action').click();
    cy.get(`[data-cy=constructor-item${0}]`).should('not.exist');
  });
});

describe('Функционал модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.visit('http://localhost:4000/');
  });
  it('Открытие модального окна с информацией об ингредиенте и закрытие его кликом на "крестик"', () => {
    // Кликаем на ингредиент и убеждаемся, что открыто верное модальное окно
    cy.get(`[data-cy=ingredient${2}]`).find('a').click();
    cy.get('[data-cy=modal]').contains('Информация об ингредиенте').should('exist');
    cy.get('[data-cy=modal]').contains('Мясо 1').should('exist');
    // Кликаем на кнопку закрытия и убеждаемся, что модального окна нет
    cy.get('[data-cy=close-modal]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });
  it('Открытие модального окна с информацией об ингредиенте и закрытие его кликом на оверлей', () => {
    // Кликаем на ингредиент и убеждаемся, что открыто верное модальное окно
    cy.get(`[data-cy=ingredient${2}]`).find('a').click();
    cy.get('[data-cy=modal]').contains('Информация об ингредиенте').should('exist')
    cy.get('[data-cy=modal]').contains('Мясо 1').should('exist');
    // Кликаем на оверлей с параметром 'force' т.к. само модальное окно "перекрывает" оверлей, а также убеждаемся, что модального окна нет
    cy.get('[data-cy=modal-overlay]').click({force: true});
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    // Моковые данные ответов для запроса данных пользователя и запроса создания заказа
    cy.intercept('POST', 'api/orders', {fixture: 'order.json'});
    cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'});
    // Моковые токены
    window.localStorage.setItem('refreshToken', JSON.stringify('refresh-test-token'));
    cy.setCookie('accessToken', 'access-test-token');
    cy.visit('http://localhost:4000/');
  });
  it('Сборка бургера', () => {
    // Добавление ингредиентов
    cy.get(`[data-cy=ingredient${0}]`).contains('Добавить').click();
    cy.get(`[data-cy=ingredient${2}]`).contains('Добавить').click();
    cy.get(`[data-cy=ingredient${4}]`).contains('Добавить').click();
    // Оформление заказа
    cy.get('[data-cy=constructor]').contains('Оформить заказ').click();
    // Подтверждение создания заказа
    cy.get('[data-cy=modal]').contains('10000').should('exist');
    // Закрытие модального окна
    cy.get('[data-cy=close-modal]').click();
    cy.get('[data-cy=modal]').should('not.exist');
    // Проверка очистки конструктора
    cy.get('[data-cy=constructor]').contains('Выберите булки').should('exist');
    cy.get(`[data-cy=constructor-item${0}]`).should('not.exist');
  });
});
