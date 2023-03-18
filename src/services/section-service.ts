import http from "../http-common";

class SectionService {
    getSectionByCourse(params?: any) {
        return http.get("/section", { params });
    }

    searchSectionsByTitle(params?: any) {
        return http.get("/section", { params });
    }

    create(data: any) {
        return http.post("/section", data)
            .then(response => response.data);
    }

    edit(data : any) {
        return http.put("/section", data)
            .then(response => response.data);
    }

    delete(id: number) {
        return http.delete(`/section/${id}`);
    }


  }