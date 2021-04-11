import http from "../http-common";

class CategoriesService {
    getAll() {
        return http.get("/categories");
    }
    get(id) {
        return http.get(`/categories/category?id=${id}`);
    }
}
export default new CategoriesService();
