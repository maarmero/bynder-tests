// import necessary modules
import http from 'k6/http';
import {check} from 'k6';


//define configuration
export const options = {
    // define thresholds
    thresholds: {
        http_req_failed: [{threshold: 'rate<0.01', abortOnFail: true}], // http errors should be less than 1%, otherwise abort the test
        http_req_duration: ['p(99)<1000'], // 99% of requests should be below 1s
    },

    // define scenarios
    scenarios: {
        average_load: {
            executor: 'ramping-vus',
            stages: [
                // ramp up to average load of 20 virtual users
                {duration: '10s', target: 20},
                // maintain load
                {duration: '50s', target: 20},
                // ramp down to zero
                {duration: '5s', target: 0},
            ],
        },
    },
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