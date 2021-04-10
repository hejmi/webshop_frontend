import http from "../http-common";
import sha256 from "sha256";

export function login (data) {

    localStorage.removeItem('loginfailed');
    let redirectpath = ''
    http.post('/accounts/auth',
        { username: data.username, password: sha256(data.password) })
        .then(response => {
            if (response.data === true) {
            localStorage.setItem('x-access-token', sha256(response.data))
            localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000)
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
                    localStorage.setItem('login-user', response.data[0].id)
                    localStorage.setItem('role', sha256(response.data[0].role))
                    window.location = redirectpath
                } catch (error) {
                  localStorage.setItem('loginfailed', 'true');
                }
            })
       //.catch(err => Promise.reject('Authentication Failed!'));
}

export function isAuthenticated(){
    return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now()
}
export function isAdminAuthenticated() {
    if (!localStorage.getItem('role')) {
        return null
    }
    if (localStorage.getItem('role') === 'c1c224b03cd9bc7b6a86d77f5dace40191766c485cd55dc48caf9ac873335d6f') {
        return 'Admin'
    } else {
        return 'User'
    }
}
