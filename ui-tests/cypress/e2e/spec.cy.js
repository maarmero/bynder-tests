describe("Tests logs in/out pages", () => {
    beforeEach(() => {
        cy.visit("https://wave-trial.getbynder.com/login/")
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
        })

        cy.getCookies('.osano-cm-dialog--type_bar').then((val) => {
            if (val) {
                // dismiss the pop up conditionally
                cy.get('.osano-cm-button--type_save').contains("Save").click()
            }
        })
    })

    it("Should try to log in with correct user", () => {
            cy.get("#inputEmail").type('m.armero')
            cy.get("#inputPassword").type(Cypress.env('CORRECT_PASSWORD'), { log: false })
            cy.contains('Login').click()
            cy.url().should('eq', 'https://wave-trial.getbynder.com/account/dashboard/')
            cy.get('.admin-dropdown.profile').trigger('mouseover')
            cy.get('.admin-dropdown.profile').should('be.visible')
            cy.contains('Logout').click({force: true})
            cy.contains('You have successfully logged out.')
        }
    )
    //
    it("A user with incorrect credentials cannot log in", () => {
        cy.get("#inputEmail").type('incorrect_user')
        cy.get("#inputPassword").type('sFrAL!RriNH8'), {log: false}
        cy.contains('Login').click()
        cy.get('body').then(($body) => {
            //Added as I was getting a captcha
            if ($body.text().includes('Security Check')) {
                // if sent to captcha
                cy.url().should('eq', 'https://wave-trial.getbynder.com/verify/')
            } else {
                // if sent to login screen
                cy.contains('You have entered an incorrect username or password.')
                cy.url().should('eq', 'https://wave-trial.getbynder.com/login/')
            }
        })
    })

    it("The user can toggle the language dropdown, assert the different languages and select one", () => {
        cy.contains('Language').click()
        cy.contains('Nederlands (Nederland)').click()
        cy.get('#inputEmail').should('have.attr', 'placeholder', 'E-mail/Gebruikersnaam')
        cy.get('#inputPassword').should('have.attr', 'placeholder', 'Wachtwoord')
        cy.contains('Taal').click()
        cy.contains('English (United States)').click()
        cy.get('#inputEmail').should('have.attr', 'placeholder', 'Email/Username')
        cy.get('#inputPassword').should('have.attr', 'placeholder', 'Password')
    })

    it("The user can request a new password", () => {
        cy.contains('Lost password?').click()
        cy.url().should('eq', 'https://wave-trial.getbynder.com/user/forgotPassword/?redirectToken=')
        cy.get("#forgotPassword").type('armero.marina@gmail.com')

    })

    it("The user can contact support, choose which type and write their issues", () => {
        cy.contains('Support').click()
        cy.get('#custom-support-form-name-input').should('have.attr', 'name', 'name')
        cy.get('#custom-support-form-email-input').should('have.attr', 'name', 'email')
        cy.get('#custom-support-form-subject-select').should('have.attr', 'name', 'subject')
        cy.get('#custom-support-form-subject-select').select('contentsupport')
        cy.get('#custom-support-form-subject-select').contains('I have a question (General)')
        cy.get('#custom-support-form-subject-select').select('techsupport').type
        cy.get('#custom-support-form-subject-select').contains('I want to report a technical issue')
        cy.get('#custom-support-form-message-textarea').click().type('Marina has an issue')
        cy.get('textarea').should('have.value', 'Marina has an issue')
        cy.contains('Security Check')
        cy.contains('Save')
    })
})
