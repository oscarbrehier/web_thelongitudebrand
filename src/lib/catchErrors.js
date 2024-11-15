export default function catchError(promise) {

    return promise
        .then(data => {
            return [undefined, data]
        })
        .catch(error => {
            return [error]
        });

};