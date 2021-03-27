import http from "../http-common";

class BrandsService {
    getAll() {
        return http.get("/brands");
    }
}
export default new BrandsService();
