import http from "../http-common";

class CourseService {
    getAll(params?: any) {
        return http.get("/course", { params });
    }

    getAllForVisitor(params?: any) {
        return http.get("/course/visitor", { params });
    }

    getById(id: number) {
        return http.get(`/course/${id}`);
    }

    create(data: FormData) {
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
