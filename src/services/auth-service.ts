import http from "../http-common";

class AuthService {
    logIn(data: any) {
        return http.post<any>('/user/login', data)
        .then(response => {
            return response.data;
        })
    }

    register(data: any) {
        return http.post<any>('/student/register', data)
        .then(response => {
            return response.data;
        })
    }
}

export default new AuthService();