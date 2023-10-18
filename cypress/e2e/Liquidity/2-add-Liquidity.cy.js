/// <reference types="Cypress"/>
/// <reference types="cypress-xpath" />
import BaiscAuth from '../../pages/0-auth'
import AddLiquidity from '../../pages/LiquidityPages/2-addLiquidity';


const auth = new BaiscAuth();
const addliquidty = new AddLiquidity()


describe('Add Liquidity of Existing tokens', () => {
    it('1- Visit Unipilot and bypass basic Auth', () => {
        // auth.login('https://unipilot-dev.surge.sh/')
        cy.visit('https://unipilot-dev.surge.sh/')
        cy.wait(1000 * 2)
    }) 

    it('2- Visit add liquidity page', () => {
        addliquidty.LiquidityDropdown().click()
        cy.wait(1000*2)
        addliquidty.dropdownItems().should('be.visible');
        addliquidty.selectLiquidityDropdownItem('Add').click()
        addliquidty.verifyLiquidityPage('Select Pair').should('exist')
    })

    it('3- Connect wallet', () => {
        addliquidty.connectWallet();
        cy.wait(1000)
    })

    it('4- Select tokens', () => {
        // The vault should be created for both the tokens
        // and the both token are approved beforehand
        addliquidty.importFirstToken('0x5Ba627f0821873d1e301f553AA0D2F0291F6f3b3'); // OZN 0x5Ba627f0821873d1e301f553AA0D2F0291F6f3b3
        cy.wait(1000*2)
        addliquidty.importSecondToken('0xccf61A200BB10A32aF653848D2Ae802f9C545488'); // MET 0xccf61A200BB10A32aF653848D2Ae802f9C545488
        cy.wait(1000*10)
    })

    it('5- Add Liquidity', () => {
        addliquidty.EnterLiquidityAmount('10')
    })

    it('6- Confirm Add Liquidity Tx', () => {
        addliquidty.ConfirmAddLiquidityTx()
    })

    it('7- Check position', () => {
        addliquidty.confirmliquidityAdded()
        cy.wait(1000*10)
    })

    
})