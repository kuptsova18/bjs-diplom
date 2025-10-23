"use strict"; //строгое выполнение

// создадим класс объекта
const UserFormNew = new UserForm();

UserFormNew.loginFormCallback = data => {
    ApiConnector.login(data,(response) => {
        console.log('Ответ сервера при авторизации ',response);
        if (response.success) {
            location.reload();
        }else{
            alert(JSON.stringify(response.error));
        }
    })
}

UserFormNew.registerFormCallback = data => {
    ApiConnector.register(data,(response) => {
        console.log('Ответ сервера при регистрации ',response);
        if (response.success) {
            location.reload();
        }else{
            alert(JSON.stringify(response.error));
        }
    })
}