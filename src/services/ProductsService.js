import http from "../http-common";

class ProductsService {
    getAll() {
        return http.get("/products");
    }

    getAllFromCat(id) {
        return http.get(`/categories/${id}`);
    }

    getAllFromBrand(id) {
        return http.get(`/brands/${id}`);
    }

    get(id) {
        return http.get(`/products/${id}`);
    }

    create(data) {
        return http.post("/products", data);
    }

    update(id, data) {
        return http.put(`/products/${id}`, data);
    }

    delete(id) {
        return http.delete(`/products/${id}`);
    }

    search(keyword) {
        return http.get(`/products/search?keyword=${keyword}`);
    }
}
export default new ProductsService();
