import http from "../http-common";

class CategoryService {
    getAll() {
        return http.get("/categories/list");
    }

    getByTitle(title: string) {
        return http.get(`/categories?title=${title}`);
    }

    create(data: any) {
        return http.post("/categories", data)
        .then(response => {
            if (response.data.title) {
                console.log(response.data.title)
            }

            return response.data;
        })
    }

    delete(id: any) {
        return http.delete(`/categories/:${id}`);
    }

    update(id: any) {
        return http.put(`/categories/:${id}`);
    }
}

export default new CategoryService();