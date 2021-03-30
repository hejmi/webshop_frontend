import http from "../http-common";

class BrandsService {
    getAll() {
        return http.get("/brands");
    }
    get(id) {
        return http.get(`/brands/brand/${id}`);
    }
}
export default new BrandsService();
