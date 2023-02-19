import http from "../http-common";

export interface Course {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  categoryIDs: number[];
  status: string;
  img : string;
}

class CourseService {
    getAll(params?: any) {
        return http.get("/courses", { params });
    }

    getById(id: number) {
        return http.get(`/course/${id}`);
    }

    create(data: any) {
        return http.post("/course", data)
            .then(response => response.data);
    }

    update(id: number, data: any) {
        return http.put(`/course/${id}`, data)
            .then(response => response.data);
    }

    delete(id: number) {
        return http.delete(`/course/${id}`);
    }
}

export default new CourseService();