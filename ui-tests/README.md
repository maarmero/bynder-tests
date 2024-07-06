## Explanation

See below the scenarios:

```
Scenario: Login with correct user

Given I navigate to the login page
Then the url is https://wave-trial.getbynder.com/login/

When the username {correct_username} is entered
And the password {correct_password} is entered
Then the url is https://wave-trial.getbynder.com/account/dashboard/

Scenario: Login with incorrect user

Given I navigate to the login page
Then the url is https://wave-trial.getbynder.com/login/

When the username {incorrect_username} is entered
And the password {incorrect_password} is entered
Then the error {You have entered an incorrect username or password.} is shown

Scenario: Log out

Given I navigate to the login page
Then the url is https://wave-trial.getbynder.com/login/

When the username {incorrect_username} is entered
And the password {incorrect_password} is entered
Then the url is https://wave-trial.getbynder.com/account/dashboard/
And the user can log out
And the url is https://wave-trial.getbynder.com/login/
And the message {You have successfully logged out} is shown

Scenario: Support

Given I navigate to the login page
Then the url is https://wave-trial.getbynder.com/login/

When the user clicks on Support
Then they can enter {name}, {email}
And they can choose {I have a question} from the dropdown
And they can choose {I want to report a technical issue} from the dropdown
And the can write {I have an issue} on the text box
#remove the captcha from the testing environment
And the can click Send

Scenario: Cookies

Given I navigate to the login page
Then the url is https://wave-trial.getbynder.com/login/

When the user clicks on Cookies
Then the cookies appear
And they can click Save

When the user clicks on Cookies
Then the cookies appear
And they can click X

When the user clicks on Cookies
Then the cookies appear
And they cannot disable the Essential cookies
And they can click X

When the user clicks on Cookies
Then the cookies appear
And they can toggle the Analytics
And they can click Save

Scenario: Language

Given I navigate to the login page
Then the url is https://wave-trial.getbynder.com/login/

When the user clicks on Language
Then the following are displayed
|languages              |
|Nederlands (Nederland) |
|English (United States)|
|Français (France)      |
|Deutsch (Deutschland)  |
|Italiano (Italia)      |
|Español (España)       |

Scenario: Language toggle

Given I navigate to the login page
Then the url is https://wave-trial.getbynder.com/login/

When the user clicks on Language
Then English (United States) is ticked

When the user selects {Nederlands (Nederland)}
Then the password field is {Wachtwoord}
And the username field is {E-mail/Gebruikersnaam}
And the Language dropdown is {Taal}

When the user clicks on Language
Then Nederlands (Nederland) is ticked

When the user selects {English (United States)}
Then English (United States) is ticked
And the Language dropdown is {Language}

```

## How to run these ui tests

After cloning the repo, navigate to `cypress.config.js` and replace the `to-be-overridden` CORRECT_PASSWORD with your own.
Then, navigate to the Dockerfile in the `ui-tests` and right click on the tab where Dockerfile is opened and click on `Run api-tests/Dockerfile`.
This will start it and run the `spec.cy.js`

<img width="1326" alt="ui_docker" src="https://github.com/maarmero/bynder-tests/assets/174628528/2fec2716-3184-4da2-8c58-4f32cc836a3c">


Alternatively, if you want to run them locally, make sure you have Cypress installed.
From your terminal, navigate to the `ui-tests` folder.
From there, run: `npx cypress run --env CORRECT_PASSWORD='to-be-overridden'`.
You will see the following after the run finishes

<img width="1326" alt="ui_terminal" src="https://github.com/maarmero/bynder-tests/assets/174628528/35a1f623-7577-486e-bf0d-291fb045efc3">


## CI

I have hooked it to GitHub actions, for every push the build is run.
See `main.yml`

