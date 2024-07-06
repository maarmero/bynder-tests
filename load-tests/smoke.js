// import necessary modules
import http from 'k6/http';
import {check} from 'k6';


//define configuration
export const options = {
    vus: 2,
    duration: '30s',

};

export default function () {
    // define URL
    const url = 'https://api.themoviedb.org/3/movie/top_rated';
    const token = '${__ENV.MY_TOKEN}'
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    };

    // send a get request and save response as a variable
    const res = http.get(url, params);

    check(res, {
        'response code was 200': (res) => res.status == 200,
        'Get Content-Type header': (r) => res.headers['Content-Type'] === 'application/json',

    });

}