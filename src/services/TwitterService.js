import http from "../http-common";

class TwitterService{
    getAll() {
        return http.get("/twitter/trending-hashtags");
    }
    post2Twitter(data) {
        return http.post("/twitter/post-to-twitter", data);
    }
}
export default new TwitterService();
