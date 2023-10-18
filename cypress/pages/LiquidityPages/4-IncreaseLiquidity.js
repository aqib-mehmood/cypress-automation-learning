/// <reference types="Cypress"/>
/// <reference types="cypress-xpath" />

class IncreaseLiquidity {

    clickIncreaseLiquidity() {
        cy.contains('Increase Liquidity').click()
    }
    
    verifyPairSelected(pairName){
        return cy.contains(pairName)
    }
    
}
export default IncreaseLiquidity