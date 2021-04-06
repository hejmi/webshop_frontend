import http from "../http-common";

class CustomersService {
    get(id) {
        return http.get(`/customer/${id}`);
    }
}
export default new CustomersService();
