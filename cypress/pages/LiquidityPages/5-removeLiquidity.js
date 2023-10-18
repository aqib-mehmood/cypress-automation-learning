/// <reference types="Cypress"/>
/// <reference types="cypress-xpath" />

class RemoveLiquidity {

    removeLiquidity() {
        return cy.contains('Remove Liquidity')
    }

    selectAmounttoRemove(amount) {
        cy.contains(amount).click()
    }

    removeButton() {
        cy.get('button').contains('Remove').click()
        // cy.contains('Remove').click()
    }

    confirmRemoveTx() {
        // cy.contains('We value your feedback').next().click()
        cy.get('body').click('bottomLeft')
        cy.wait(1000*2)
        // cy.confirmMetamaskTransaction({ gasFee: 0.00112171, gasLimit: 12410385 })
        cy.confirmMetamaskTransaction({ gasFee: 2 })
        cy.switchToCypressWindow()
        cy.wait(1000 * 60)
        cy.get('body').click('bottomLeft')
    }

}
export default RemoveLiquidity