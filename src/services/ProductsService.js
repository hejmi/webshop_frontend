import http from "../http-common";

class ProductsService {
    getAll() {
        return http.get("/products");
    }

    getAllFromCat(id) {
        return http.get(`/categories/id?id=${id}`);
    }

    getAllFromBrand(id) {
        return http.get(`/brands/id?id=${id}`);
    }
    getForCart(id) {
        return http.get(`/sku/id?id=${id}`);
    }
    get(id) {
        return http.get(`/products/product?id=${id}`);
    }
    getRating(id) {
        return http.get(`/productrating?id=${id}`);
    }
    getAttributesFor(id) {
        return http.get(`/attributes/product?id=${id}`);
    }

    create(data) {
        return http.post("/products", data);
    }

    update(id, data) {
        return http.put(`/products?id=${id}`, data);
    }

    delete(id) {
        return http.delete(`/products/${id}`);
    }

    search(keyword) {
        return http.get(`/products/search?keyword=${keyword}`);
    }
}
export default new ProductsService();
