import http from "../http-common";
export interface Category {
    title: string;
    id: number;
}

class CategoryService {
    getAll() {
        return http.get("/category/all");
    }

    getByTitle(title: string) {
        return http.get(`/category?title=${title}`);
    }

    create(data: any) {
        return http.post("/category", data)
        .then(response => {
            return response.data;
        })
    }

    delete(id: any) {
        return http.delete(`/category/:${id}`);
    }

    update(id: any) {
        return http.put(`/category/:${id}`);
    }
}

export default new CategoryService();