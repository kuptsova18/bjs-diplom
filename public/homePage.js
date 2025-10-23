//Выход из личного кабинета
const LogoutButtonNew = new LogoutButton();

LogoutButtonNew.action = () => {
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
const RatesBoardNew = new RatesBoard();

function CurrentRatesBoard() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            RatesBoardNew.clearTable();
            RatesBoardNew.fillTable(response.data);
        }
    });
}
//Вызовите данную функцию для получения текущих валют.
CurrentRatesBoard();

setInterval(CurrentRatesBoard, 60000);

//Операции с деньгами
const moneyManagerNew = new MoneyManager();

// 4.1 Пополнение баланса
moneyManagerNew.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManagerNew.setMessage(true, 'Баланс успешно пополнен');
        } else {
            moneyManagerNew.setMessage(false, response.error || 'Ошибка пополнения баланса');
        }
    });
}

//конвертирование валюты
moneyManagerNew.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManagerNew.setMessage(true, 'Конвертация выполнена успешно');
        } else {
            moneyManagerNew.setMessage(false, response.error || 'Ошибка конвертации');
        }
    });
}

//перевод валюты
MoneyManagerNew.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            MoneyManagerNew.setMessage(true, 'Перевод выполнен успешно');
        } else {
            MoneyManagerNew.setMessage(false, response.error || 'Ошибка перевода');
        }
    });
}

//Работа с избранным
const FavoritesWidgetNew = new FavoritesWidget();

function updateFavorites() {
    ApiConnector.getFavorites((response) => {
        if (response.success) {
            FavoritesWidgetNew.clearTable();
            FavoritesWidgetNew.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    });
}

// Первоначальная загрузка избранного
updateFavorites();

//добавления пользователя в список избранных
FavoritesWidgetNew.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            FavoritesWidgetNew.clearTable();
            FavoritesWidgetNew.fillTable(response.data);
            moneyManagerNew.updateUsersList(response.data);
            FavoritesWidgetNew.setMessage(true, 'Пользователь успешно добавлен в избранное');
        }else {
            FavoritesWidgetNew.setMessage(false, response.error || 'Ошибка добавления пользователя');
        }
    });
}

// удаление пользователя из избранного
FavoritesWidgetNew.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            FavoritesWidgetNew.clearTable();
            FavoritesWidgetNew.fillTable(response.data);
            moneyManagerNew.updateUsersList(response.data);
            FavoritesWidgetNew.setMessage(true, 'Пользователь успешно удален из избранного');
        }else {
            FavoritesWidgetNew.setMessage(false, response.error || 'Ошибка удаления пользователя');
        }
    });
}