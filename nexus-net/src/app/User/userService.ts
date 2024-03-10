const baseurl = process.env.REACT_APP_USER_BASEURL;


export function getAllUsers() {
        return fetch(baseurl + "users/all/")
            .then(response => response.json())
            .then(data => {return data})
            .catch(error => console.log(error))
}