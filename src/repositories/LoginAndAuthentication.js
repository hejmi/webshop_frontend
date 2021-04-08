import http from "../http-common";
import sha256 from "sha256";

export function login (data) {
    localStorage.removeItem('loginfailed');
    http.post('/accounts/auth',
        { username: data.username, password: sha256(data.password) })
        .then(response => {
            if (response.data === true) {
            localStorage.setItem('x-access-token', response.data.token)
            localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000)
            }
        })
        http.post('/accounts/auth/userdata',
            {username: data.username, password: sha256(data.password)})
            .then(response => {
                try {
                    localStorage.setItem('login-user', response.data[0].id)
                    window.location = '/myprofile'
                } catch (error) {
                  localStorage.setItem('loginfailed', 'true');
                }
            })
       //.catch(err => Promise.reject('Authentication Failed!'));
}

export function isAuthenticated(){
    return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now()
}
