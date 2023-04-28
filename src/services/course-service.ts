import http from "../http-common";

class CourseService {
  async getAll(params?: any) {
    return await http.get("/course", { params });
  }

  async getAllForVisitor(params?: any) {
    return await http.get("/course/visitor", { params });
  }

  async getById(id: number) {
    return await http.get(`/course/${id}`);
  }

  async create(data: FormData) {
    const response = await http.post("/course", data);

    return response.data;
  }

  async update(id: number, data: any) {
    const response = await http.put(`/course/${id}`, data);

    return response.data;
  }

  async delete(id: number) {
    return await http.delete(`/course/${id}`);
  }
}

export default new CourseService();
