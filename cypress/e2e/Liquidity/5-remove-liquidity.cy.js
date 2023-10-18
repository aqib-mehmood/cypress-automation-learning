/// <reference types="Cypress"/>
/// <reference types="cypress-xpath" />
import BaiscAuth from '../../pages/0-auth'
import AddLiquidity from '../../pages/LiquidityPages/2-addLiquidity';
import PositionLiquidity from '../../pages/LiquidityPages/3-positionLiquidity';
import IncreaseLiquidity from '../../pages/LiquidityPages/4-IncreaseLiquidity';
import RemoveLiquidity from '../../pages/LiquidityPages/5-removeLiquidity';

const auth = new BaiscAuth();
const addliquidty = new AddLiquidity()
const position = new PositionLiquidity()
const increase = new IncreaseLiquidity()
const remove = new RemoveLiquidity()


describe('Remove Liquidity Provided', () => {

    it('1- Visit Url and bypass basic Auth', () => {
        // auth.login('https://unipilot-dev.surge.sh/positions')
        cy.visit('https://unipilot-dev.surge.sh/positions')
        cy.wait(1000 * 2)
    })

    it('2- Connect wallet', () => {
        addliquidty.connectWallet();
        cy.wait(1000 * 6)
    })

    it('3- View Liquidity Position List', () => {
        position.liquidityPosition('OZN/MET').should('exist')   // pairName = OZN/MET
        cy.wait(1000 * 6)
    })

    it('4- View Liquidity Details', () => {
        position.viewLiquiditydetails('OZN/MET')     // pairName = OZN/MET
        cy.wait(1000 * 6)
    })

    it('5- Go to Remove Liquidity Page', () => {
        remove.removeLiquidity().click()
        cy.wait(1000 * 6)
    })

    it('6- Remove 50% liquidity', () => {
        remove.selectAmounttoRemove('25%')
        cy.wait(1000 * 6)
        remove.removeButton()
        remove.confirmRemoveTx()
        
    })

    it('7- Confirm Liquidity Removed', () => {
        // check your position
        cy.contains('Liquidity Positions').should('exist')
        cy.wait(3000)
        // check your liquidity
        cy.contains('OZN/MET').should('exist')
        cy.wait(3000)
    })

})