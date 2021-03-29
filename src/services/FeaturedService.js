import http from "../http-common";

class FeaturedService {
    getAll() {
        return http.get("/products/featured");
    }
}
export default new FeaturedService();