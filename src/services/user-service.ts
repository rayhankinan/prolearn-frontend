import http from "../http-common";

class UserService {
    logIn(data: any) {
        return http.post<any>('/user/login', data)
        .then(response => {
            return response.data;
        })
    }

    register(data: any) {
        return http.post<any>('/user/register', data)
        .then(response => {
            return response.data;
        })
    }

    subscribe(id: number) {
        return http.post<any>(`/user/subscribe/${id}`)
        .then(response => {
            return response.data;
        })
    }
}

export default new UserService();
