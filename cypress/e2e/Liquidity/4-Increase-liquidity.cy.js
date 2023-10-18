/// <reference types="Cypress"/>
/// <reference types="cypress-xpath" />
import BaiscAuth from '../../pages/0-auth'
import AddLiquidity from '../../pages/LiquidityPages/2-addLiquidity';
import PositionLiquidity from '../../pages/LiquidityPages/3-positionLiquidity';
import IncreaseLiquidity from '../../pages/LiquidityPages/4-IncreaseLiquidity';


const auth = new BaiscAuth();
const addliquidty = new AddLiquidity()
const position = new PositionLiquidity()
const increase = new IncreaseLiquidity()

describe('Increase Existing Liquidity', () => {

    it('1- Visit Url and bypass basic Auth', () => {
        // auth.login('https://unipilot-dev.surge.sh/positions')
        cy.visit('https://unipilot-dev.surge.sh/positions')
        cy.wait(1000 * 2)
    })

    it('2- Connect wallet', () => {
        addliquidty.connectWallet();
    })

    it('3- View Liquidity Position List', () => {
        position.liquidityPosition('OZN/MET').should('exist')   // pairName = OZN/MET
    })

    it('4- View Liquidity Details', () => {
        position.viewLiquiditydetails('OZN/MET')     // pairName = OZN/MET
        cy.wait(1000 * 5)
    })

    it('5- Move to Increase Liquidity', () => {
        increase.clickIncreaseLiquidity()
        increase.verifyPairSelected('OZN/MET').should('exist') // pairName = OZN/MET
    })

    it('6- Add Liquidity to increase', () => {
        addliquidty.EnterLiquidityAmount('5')
    })

    it('7- Confirm Liquidity Transaction', () => {
        addliquidty.ConfirmAddLiquidityTx()
    })

    it('8- Check Liquidity Increased', () => {
        addliquidty.confirmliquidityAdded()
        cy.wait(1000*10)
    })

})