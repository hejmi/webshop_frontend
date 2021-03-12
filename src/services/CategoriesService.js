import http from "../http-common";

class CategoriesService {
    getAll() {
        return http.get("/categories");
    }
}
export default new CategoriesService();