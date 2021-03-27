import http from "../http-common";

export function getCartProducts(cart) {
    return http.get('/products', {cart})
        .then(response => response.data);
}

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
}
export default new ProductsService();
