import http from "../http-common";

class CategoryService {
  async getAll() {
    return await http.get("/category/all");
  }

  async getByTitle(title: string) {
    return await http.get(`/category?title=${title}`);
  }

  async create(data: any) {
    const response = await http.post("/category", data);

    return response.data;
  }

  async delete(id: any) {
    return await http.delete(`/category/:${id}`);
  }

  async update(id: any) {
    return await http.put(`/category/:${id}`);
  }
}

export default new CategoryService();
