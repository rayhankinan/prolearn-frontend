import http from "../http-common";

class AuthService {
    logIn(data: any) {
        return http.post<any>('/user/login', data)
        .then(response => {
            if (response.data.username) {
                console.log(response.data.username)
            }

            return response.data;
        })
    }

    register(data: any) {
        return http.post<any>('/user/register', data)
        .then(response => {
            if (response.data.username) {
                console.log(response.data.username)
            }

            return response.data;
        })
    }
}

export default new AuthService();