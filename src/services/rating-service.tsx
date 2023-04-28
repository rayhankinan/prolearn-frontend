import http from "../http-common";

class RatingService {
    create(data: any) {
        return http.post("/rating", data);
    }
    
    get(id: any) {
        return http.get(`/rating/${id}`);
    }
}

export default new RatingService();