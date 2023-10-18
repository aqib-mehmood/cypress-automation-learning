/// <reference types="Cypress"/>
/// <reference types="cypress-xpath" />

class PositionLiquidity {

    liquidityPosition(pairName){
        return cy.contains(pairName)    // 'OZN/MET'
    }

    viewLiquiditydetails(pairName){
        cy.contains(pairName).click()
    }

    VerifyDetails() {
        let lpValue;
        cy.contains('Liquidity').next().then(($Lpval) => {
            lpValue = $Lpval.text();
        })
        cy.log('Lp Value', lpValue)
        cy.contains('Total Fees Accumulated').should('be.visible')
        cy.wait(1000*10)
        // cy.go('back')
        // cy.wait(3000)
    }

}
export default PositionLiquidity