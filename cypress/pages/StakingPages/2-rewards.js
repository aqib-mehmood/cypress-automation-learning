/// <reference types="Cypress"/>
/// <reference types="cypress-xpath" />


class Reward {

    // move to reward tab
    clickRewardTab() {
        cy.get('button').contains('Rewards', { matchCase: true }).click()
    }

    // check the the reward page opened
    verifyPage() {
        return cy.contains('Total PILOT Staked')
    }

    // verify reward tab opened
    rewardTab() {
        return cy.contains('Total Rewards Earned')
    }

    // verify Claimable Reward
    getClaimableReward() {
        cy.contains('Claimable Rewards')
            .next().children().children('p').eq(0).then(($val) => {
                const claimableReward = $val.text()
                cy.log('Claimable Rewards: ', claimableReward)

                // assertion to verify the claimable rewards
                expect(claimableReward).to.be.eq('0')
            })
    }

    // verify Total Rewards Earned
    totalRewardEarned() {
        cy.contains('Total Rewards Earned')
            .next().children().children('p').eq(0).then(($val) => {
                const rewardEarned = $val.text()
                cy.log('Total Rewards Earned: ', rewardEarned)

                // assertion to verify the earned rewards
                expect(rewardEarned).to.be.eq('0')
            })
    }

    // unstake reward
    unstakeReward() {
        cy.get('#unpilot-staking-accordian-detail').should('contain', 'Claim').then(($val) => {

            // checking if the button is disabled or not
            var is_disable = $val.prop("disabled")
            cy.log('Attribute value: ', is_disable)

            // condition if disable then do not click it
            if (is_disable == true) {
                cy.log('reward button is disabled')
            }
            else {
                cy.get('#unpilot-staking-accordian-detail').should('contain', 'Claim').click()
                // cy.confirmMetamaskTransaction({ gasFee: 0.019, gasLimit: 12410385 })
                cy.confirmMetamaskTransaction({ gasFee: 2})
                cy.switchToCypressWindow();
            }
        })
    }

}
export default Reward