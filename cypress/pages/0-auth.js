class BaiscAuth {

    login(site_url) {
        // METHOD NO 01. -------------->>>>>>>
        // In order to bypass the basic authentication use the below command
        // cy.visit('https://admin:A>a=bV]6rtQ\\T5*J@beta.unipilot.io/')

        // METHOD NO 02. ----------------->
        // In case the above command is not working then use this way.
        // Here I have first generate the authorization token using postman.
        // More will be found here https://testersdock.com/cypress-basic-auth/
        // cy.visit("https://beta.unipilot.io/", {
        //     headers: {
        //         Authorization: "Basic YWRtaW46QT5hPWJWXTZydFFcVDUqSg=="
        //     },
        //     // failOnStatusCode: false
        // })

        // METHOD NO 03. --------------------->
        // using auth to bypass basic authentication
        // this method is currently working
        cy.visit(site_url, {
            auth: {
                username: 'admin',
                password: 'A>a=bV]6rtQ\\T5*J'
            }
        })
        // cy.get('.jss159').should('be.visible')
    }
   
}
export default BaiscAuth