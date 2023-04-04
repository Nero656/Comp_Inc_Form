const Config = {
    adds: function () {
        return `http://127.0.0.1:8000`
    },

    auth: function (data: any) {
        fetch(Config.adds() + `/api/user/auth`, {
            method: 'POST',
            body: data,
        }).then(async response => {
            const data = await response.json()
            if (!response.ok) {
                const error = (data && data.message) || response.status
                return Promise.reject(error)
            } else {
                localStorage.setItem('token', data.api_token);
                fetch(Config.adds() + `/api/user/show`, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.token
                    },
                }).then(function (response) {
                    if (response.status !== 200) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    response.json().then(function (data) {
                        const user = JSON.stringify(data);
                        localStorage.setItem('User', user);
                        window.location.replace('/');
                    });
                })
            }
        })
    },

    registration: function (data: any) {
        fetch(Config.adds() + `/api/user/registration`, {
            method: 'POST',
            body: data,
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                // setOpen(true);
                const error = (data && data.message) || response.status
                return Promise.reject(error);
            } else {
                window.location.replace('auth')
            }
        }).catch(error => {
            // setError({mes: 'Ошибка проверте правильность данных'});
        });
    },

    User: function () {
        let user

        if (localStorage.getItem('User') !== null)
            user = JSON.parse(localStorage.User)


        if (localStorage.getItem('User') === null)
            user = {}

        return user
    },

    Role: function (role_id: number) {
        enum Roles {
            admin = 'Админ',
            diver = 'Дайвер',
            master = 'Тренер',
            moderator = 'Модератор'
        }

        switch (role_id) {
            case 1:
                return Roles.admin
            case 2:
                return Roles.diver
            case 3:
                return Roles.master
            case 4:
                return Roles.moderator
        }
    },

    GymTypes: function (type_id: number) {
        enum GymTypes {
            deepPool = 'Глубокий басейн',
        }

        switch (type_id) {
            case 1:
                return GymTypes.deepPool
        }
    }
}

export default Config