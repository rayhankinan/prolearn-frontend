import http from "../http-common";

class SectionService {
    getSectionByCourse(courseId : string) {
        return http.get(`/section/${courseId}`);
    }

    searchSectionsByTitle(params?: any) {
        return http.get("/section", { params });
    }

    async create(data: any) {
        const response = await http.post("/section", data);
        return response.data;
    }

    async update(sectionId : string, data: any) {
        const response = await http.put(`/section/${sectionId}`, data);
        return response.data;
    }

    async delete(id: number) {
        return http.delete(`/section/${id}`);
    }
}

export default new SectionService();
