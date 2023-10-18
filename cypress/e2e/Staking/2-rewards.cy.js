/// <reference types="Cypress"/>
/// <reference types="cypress-xpath" />
import BaiscAuth from '../../pages/0-auth';
import AddLiquidity from '../../pages/LiquidityPages/2-addLiquidity';
import Stake from '../../pages/StakingPages/1-stake';
import Reward from '../../pages/StakingPages/2-rewards';

const auth = new BaiscAuth();
const addliquidty = new AddLiquidity();
const reward = new Reward();
const stake = new Stake()

describe('Lets Stake Pilot', () => {
    it('1- Visit Url and bypass basic Auth', () => {
        // auth.login('https://unipilot-dev.surge.sh/staking')
        cy.visit('https://unipilot-dev.surge.sh/staking')
        cy.wait(1000 * 2)
        reward.clickRewardTab()
    })

    it('2- Connect wallet', () => {
        addliquidty.connectWallet();
        cy.wait(1000 * 6)
        reward.verifyPage().should('be.visible')
    })

    it('3- Verify Reward tab is opened', () => {
        reward.rewardTab().should('be.visible')
        cy.wait(1000*6)
    })

    it('4- Get claimable reward', () => {
        reward.getClaimableReward()
        cy.wait(1000*6)
    })

    it('5- Total Reward earned', () => {
        reward.totalRewardEarned()
        cy.wait(1000*6)
    })

    it('6- Verify Returned Percent', () => {
        stake.verifyReturnPercent('7D')
        cy.wait(1000 * 6)
    })

    it('10- Unstake reward transaction', () => {
        reward.unstakeReward()
        cy.wait(1000 * 60)
    })


})