import http from "../http-common";

class UserService {
  async logIn(data: any) {
    const response = await http.post<any>("/user/login", data);

    return response.data;
  }

  async register(data: any) {
    const response = await http.post<any>("/user/register", data);

    return response.data;
  }

  async subscribe(id: number) {
    const response = await http.post<any>(`/user/subscribe/${id}`);

    return response.data;
  }
}

export default new UserService();
