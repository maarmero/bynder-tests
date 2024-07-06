## How to run

If on Mac, please run `brew install k6` from your terminal if you don't have it installed.
For other OS, please see https://grafana.com/docs/k6/latest/set-up/install-k6/

Clone my repository and navigate to the `load-tests` folder, from there run:
`k6 run -e MY_TOKEN={add_your_token_here} --out 'web-dashboard' name_of_the_scenario.js`.

You can see on the terminal output a summary of the metrics also

Then navigate to http://127.0.0.1:5665/ui/?endpoint=/ and you can get a report and visualise the data.

Don't forget to close both tabs after you are done as otherwise the run on the terminal is not exited.


## Tests description:

I have created 4 different types of performance testing to represent the different stages that an application goes through.

I have used the tool K6.

### Smoke test(smoke.js)

I have used 2 VUs and a duration of 30s - the max I would use would be 5 and for the duration maybe a max of 1 minute.
With this type of test we just want to make sure that the script has no errors and the system performs well under minimal load.

<img width="1326" alt="smoke_test" src="https://github.com/maarmero/bynder-tests/assets/174628528/a687a12b-4398-4a6c-91de-7286c1a4f9ce">


### Average load test(average_load.js)

With this test I am aiming to reproduce a normal every day situation that the app can encounter. 
* I have added thresholds both for what a request duration is acceptable and on failed requests. 
* Ramping up users up to 20 and then maintaining them for a bit longer than the ramp up period reproduces a normal
situation as well as decreasing them in a timely manner.

### Stress testing

Note I did not add a scenario for this because I thought it would be unnecessary as it can be easily done by
upping the vus and the duration of the Average load test; ie instead of 20 users, add 100 and the duration can
be updated from 10s and 50s to, for example, 10mins and 30mins.

### Spike testing(spike.js)

With this I wanted to simulate a very high load for a relatively short amount of time with the intention of breaking the app. The endpoint times out as you can see below, with this we can now have a benchmark and work to improve the performance if we deem it necessary.

See also how the request duration, after the stress, goes exponentially higher even though the request are being ramped down.

<img width="1326" alt="spike_test" src="https://github.com/maarmero/bynder-tests/assets/174628528/4c409bfa-de88-49d0-a51f-daa6095d9bb0">

<img width="1326" alt="spike_report" src="https://github.com/maarmero/bynder-tests/assets/174628528/4f0fb1ab-6731-4295-b2fe-aae59805a76a">



### Breaking point(breaking_point.js)

Here once again, with the help of the executor 'ramping-vus' , I overflow the app with many users with the intent
of breaking it and the testing is aborted as one of the threshold has been crossed. With this, we can tweak the thresholds to see at which point our app starts to become unresponsive. 

`ERRO[0003] thresholds on metrics 'http_req_failed' were crossed; at least one has abortOnFail enabled, stopping test prematurely`
