export var FLAG_STORAGE = {flag_popular:'popular',flag_trending:'trending',flag_my:'my'}

export default class DataRepository {
    fetchNetRepository(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }
}