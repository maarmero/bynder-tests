## Explanation

I have created the api tests using Python and Behave which enables BBD testing.
The scenarios are in Gherkin format in `movie_rating.feature` and the definitions are created in the
3 python files in the `steps` folder. The repo follows a BBD structure.

## How to run these api tests

After cloning the repo, navigate to the Dockerfile in the `api-tests` and replace the `to-be-overridden` API_TOKEN with your own.
Then, right click on the tab where Dockerfile is opened and click on `Run api-tests/Dockerfile`.
This will start it and run the only feature `movie_rating.feature`

Alternatively, if you want to run them locally, make sure you have Python as well as all the dependencies required listed in `requirements.txt` installed.
From your terminal, navigate to the `api-tests` folder.
From there, run: `API_TOKEN={add_your_own_token} behave`

## Reporting

I have used Allure to be able to visualize the reports.
After you run the tests locally, then from the same `api-tests` folder, run `allure serve`
This will automatically open `http://192.168.1.12:63488/index.html` where you can see a report of the tests.

I have also committed the `allure-report` folder where you can view the last report I ran by running the html file: `index.html`

<img width="1326" alt="allure_report" src="https://github.com/maarmero/bynder-tests/assets/174628528/335ee40c-c4af-4e2f-8fb5-be6653d040e3">
