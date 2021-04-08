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
                        localStorage.setItem('login-user', response.data[0].id)
                        redirectpath = '/administration'
                    } else {
                        redirectpath = '/myprofile'
                    }
                    localStorage.setItem('login-user', response.data[0].id)
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
export function isAdminAuthenticated(id){
    http.get(`/accounts/auth/userdata/${localStorage.getItem('login-user')}`)
        .then(response => {
            try {
                if (response.data[0].role !== "Admin") {
                    window.location = '/myprofile'
                }
                console.log(response.data[0].role)
                return(response.data[0].role)
            } catch (error) {
                window.location = '/'
            }

        })

}
