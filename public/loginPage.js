"use strict"; //строгое выполнение

// создадим класс объекта
const userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login(data,(response) => {
        console.log('Ответ сервера при авторизации ',response);
        if (response.success) {
            location.reload();
        }else{
            userForm.setLoginErrorMessage(response.error || 'Ошибка авторизации');
        }
    })
}

userForm.registerFormCallback = data => {
    ApiConnector.register(data,(response) => {
        console.log('Ответ сервера при регистрации ',response);
        if (response.success) {
            location.reload();
        }else{
            userForm.setRegisterErrorMessage(response.error || 'Ошибка регистрации');
        }
    })
}