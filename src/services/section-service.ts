import http from "../http-common";

class SectionService {
  async getSectionByCourse(courseId: string) {
    return await http.get(`/section/${courseId}`);
  }

  async searchSectionsByTitle(params?: any) {
    return await http.get("/section", { params });
  }

  async create(data: any) {
    const response = await http.post("/section", data);
    return response.data;
  }

  async update(sectionId: string, data: any) {
    const response = await http.put(`/section/${sectionId}`, data);
    return response.data;
  }

  async delete(id: number) {
    return http.delete(`/section/${id}`);
  }
}

export default new SectionService();
