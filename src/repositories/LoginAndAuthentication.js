import http from "../http-common";
import sha256 from "sha256";

export function login (data) {

    let redirectpath = ''
    http.post('/accounts/auth',
        { username: data.username, password: sha256(data.password) })
        .then(response => {
            if (response.data === true) {
            sessionStorage.setItem('x-access-token', sha256(response.data))
            sessionStorage.setItem('x-access-token-expiration', Date.now() + 20 * 60 * 1000)
            }
        })
        http.post('/accounts/auth/userdata',
            {username: data.username, password: sha256(data.password)})
            .then(response => {
                try {
                    if (response.data[0].role === "Admin") {
                        redirectpath = '/administration'
                    } else {
                        redirectpath = '/myprofile'
                    }
                    sessionStorage.setItem('login-user', response.data[0].id)
                    sessionStorage.setItem('role', sha256(response.data[0].role))
                    window.location = redirectpath
                } catch (error) {
                }
            })
       //.catch(err => Promise.reject('Authentication Failed!'));
}

export function isAuthenticated(){
    if (sessionStorage.getItem('x-access-token-expiration') < Date.now()) {
        sessionStorage.clear()
    } else {
        sessionStorage.setItem('x-access-token-expiration', Date.now() + 20 * 60 * 1000)
        return sessionStorage.getItem('x-access-token') && sessionStorage.getItem('x-access-token-expiration') > Date.now()
    }
}
export function isAdminAuthenticated() {
    if (!sessionStorage.getItem('role')) {
        return null
    }
    if (sessionStorage.getItem('role') === 'c1c224b03cd9bc7b6a86d77f5dace40191766c485cd55dc48caf9ac873335d6f') {
        return 'Admin'
    } else {
        return 'User'
    }
}
