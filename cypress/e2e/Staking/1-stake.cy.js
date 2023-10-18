/// <reference types="Cypress"/>
/// <reference types="cypress-xpath" />
import BaiscAuth from '../../pages/0-auth';
import AddLiquidity from '../../pages/LiquidityPages/2-addLiquidity';
import Stake from '../../pages/StakingPages/1-stake';

const auth = new BaiscAuth();
const addliquidty = new AddLiquidity();
const stake = new Stake();

describe('Lets Stake Pilot', () => {

    it('1- Visit Url and bypass basic Auth', () => {
        // auth.login('https://unipilot-dev.surge.sh/staking')
        cy.visit('https://unipilot-dev.surge.sh/staking')
        cy.wait(1000 * 2)
    })

    it('2- Connect wallet', () => {
        addliquidty.connectWallet();
        cy.wait(1000 * 10)
        stake.verifyPage().should('be.visible')
    })

    it('3- Verify Stake tab is opened', () => {
        stake.stakeTab().should('be.visible')
        cy.wait(1000 * 5)
    })

    it('4- Approve Pilot if not approved', () => {
        cy.get('button').then((result) => {
            cy.log("this is result: ", result)

            if (result.text().match('Approve PILOT')) {
                stake.approvePilotBtn()
                cy.wait(1000 * 60)

            } else {
                cy.log('Already Approved')
                cy.wait(1000 * 5)
            }
        })
    })

    it.skip('5- Verify 25% Percentage Buttons', () => {
        stake.verifyPercentValue('25%')
        cy.wait(1000 * 5)
    })

    it.skip('6- Verify 50% Percentage Buttons', () => {
        stake.verifyPercentValue('50%')
        cy.wait(1000 * 5)
    })

    it.skip('7- Verify 75% Percentage Buttons', () => {
        stake.verifyPercentValue('75%')
        cy.wait(1000 * 5)
    })

    it('8- Verify Max input button', () => {
        stake.maxInputStake()
        cy.wait(1000 * 5)
    })

    it.skip('9- Verify Returned Percent', () => {
        stake.verifyReturnPercent('1Y')
        cy.wait(1000 * 6)
    })

    it.skip('10- Verify Returned Percent', () => {
        stake.verifyReturnPercent('30D')
        cy.wait(1000 * 6)
    })

    it.skip('11- Verify Returned Percent', () => {
        stake.verifyReturnPercent('7D')
        cy.wait(1000 * 6)
    })

    it.skip('12- Verify Returned Percent', () => {
        stake.verifyReturnPercent('1D')
        cy.wait(1000 * 6)
    })

    it('13- Stake Transaction', () => {
        stake.stakePilot('10')
        cy.wait(1000 * 6)
        stake.stakeTransaction()
        cy.wait(1000 * 60)
        // cy.get('body').click('bottomLeft')
    })

    it('14- Verify Staked Pilot', () => {
        stake.verifyYourStakedPilot()
        cy.wait(1000 * 6)
    })


})