import http from "../http-common";

class FeaturedService {
    getAll() {
        return http.get("/featuredproducts");
    }
}
export default new FeaturedService();