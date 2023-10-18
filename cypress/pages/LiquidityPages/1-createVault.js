/// <reference types="Cypress"/>
/// <reference types="cypress-xpath" />

class CreateVault {

    // creating vault for new tokens
    settingInitialValue(initialValue){
        cy.get('body').find('input:nth(5)').type(initialValue)

        // unable to use xpath in synpress giving error cy.xpath is not a function
        // cy.xpath(`//*[@id="root"]/div[3]/div/div/div[2]/div/div/div/div/div/div[4]/input`).type('1'
    }

    createVaultTransaction(){
        cy.contains('Create Vault').click()
        // cy.contains('Please wait for confirmation').parent()
        cy.wait(2000)
        // cy.confirmMetamaskTransaction({gasFee: 0.019, gasLimit: 12410385})
        cy.confirmMetamaskTransaction({ gasFee: 2 })
        cy.switchToCypressWindow();
    }

    approveFirstToken(tokenName) {
        // approve token 1
        cy.contains(tokenName).click() // Approve MTC
        cy.wait(2000)
        cy.confirmMetamaskPermissionToSpend()
        cy.switchToCypressWindow()
    }

    approveSecondToken(tokenName) {
        // approve token 2
        cy.contains(tokenName).click() // Approve EAT
        cy.wait(2000)
        cy.confirmMetamaskPermissionToSpend()
        cy.switchToCypressWindow();
    }

}
export default CreateVault