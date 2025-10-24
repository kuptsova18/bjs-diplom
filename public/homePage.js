//Выход из личного кабинета
const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    })
};

//Получение информации о пользователе
ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

function currentRatesBoard() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}
//Вызовите данную функцию для получения текущих валют.
currentRatesBoard();

setInterval(currentRatesBoard, 60000);

//Операции с деньгами
const moneyManager = new MoneyManager();

// 4.1 Пополнение баланса
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Баланс успешно пополнен');
        } else {
            moneyManager.setMessage(false, response.error || 'Ошибка пополнения баланса');
        }
    });
}

//конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Конвертация выполнена успешно');
        } else {
            moneyManager.setMessage(false, response.error || 'Ошибка конвертации');
        }
    });
}

//перевод валюты
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Перевод выполнен успешно');
        } else {
            moneyManager.setMessage(false, response.error || 'Ошибка перевода');
        }
    });
}

//Работа с избранным
const favoritesWidget = new FavoritesWidget();

function updateFavorites() {
    ApiConnector.getFavorites((response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    });
}

// Первоначальная загрузка избранного
updateFavorites();

//добавления пользователя в список избранных
favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, 'Пользователь успешно добавлен в избранное');
        }else {
            favoritesWidget.setMessage(false, response.error || 'Ошибка добавления пользователя');
        }
    });
}

// удаление пользователя из избранного
favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, 'Пользователь успешно удален из избранного');
        }else {
            favoritesWidget.setMessage(false, response.error || 'Ошибка удаления пользователя');
        }
    });
}