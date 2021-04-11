import http from "../http-common";

class CustomersService {
    get(id) {
        return http.get(`/customer?id=${id}`);
    }
}
export default new CustomersService();
