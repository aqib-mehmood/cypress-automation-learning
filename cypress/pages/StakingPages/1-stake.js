/// <reference types="Cypress"/>
/// <reference types="cypress-xpath" />

class Stake {

    // check the staking page opened
    verifyPage() {
        return cy.contains('Total PILOT Staked')
    }

    // verify stake tab opened
    stakeTab() {
        return cy.contains('Your staked PILOT')
    }

    // approve pilot 
    approvePilotBtn() {
        cy.contains('Approve PILOT').click()
        cy.wait(2000)
        cy.confirmMetamaskPermissionToSpend()
        cy.switchToCypressWindow();
    }

     // verify percentage buttons
    verifyPercentValue(inputPercentValue) {
        cy.contains(inputPercentValue).click()

        // getting total balance 
        cy.contains('Balance', { matchCase: true })
            .next().children().then(($val) => {
                // getting user total balance 
                const bal = $val.attr('title');
                cy.log("Total Balance: ", bal);
                
                // converting user percent input into number 
                const inputNum = parseInt(inputPercentValue)
                cy.log("Input Number", inputNum)

                // converting balance to the user input percentage
                var percentVal = (inputNum / 100) * bal;

                // rounding off the result
                percentVal = percentVal.toFixed(2)
                cy.log('Input Field Value: ', percentVal)

                // getting the input field value i.e the acutal value by the system
                cy.get('body').find('input:nth(1)').then(($inputValue) => {
                    var actualPercentValue = $inputValue.attr('value')

                    // rounding off the result
                    actualPercentValue = parseFloat(actualPercentValue).toFixed(2)
                    cy.log("Actual Value in input field: ", actualPercentValue)

                    // assertion to mathch the expected and actual value
                    expect(actualPercentValue).to.be.eq(percentVal)
                })
            })
    }

   maxInputStake() {
        cy.contains('max').click()

        // getting total balance 
        cy.contains('PILOT in wallet', { matchCase: true })
            .next().children().then(($val) => {
                // getting user total balance 
                var bal = $val.attr('title');

                // converting string to int
                bal = parseInt(bal)
                cy.log("Total Balance: ", bal);

                // getting the input field value i.e the acutal value by the system
                cy.get('body').find('input:nth(1)').then(($inputValue) => {
                    var actualInputValue = $inputValue.attr('value')

                    // converting string to int
                    actualInputValue = parseInt(actualInputValue)
                    cy.log("Actual Value in input field: ", actualInputValue)

                    // assertion to mathch the expected and actual value
                    expect(actualInputValue).to.be.eq(bal)
                })
            })
    }

    verifyReturnPercent(inputTimeDuration) {
        cy.contains(inputTimeDuration).click()

        // getting return percentage 
        cy.contains('Returns', { matchCase: true })
            .next().then(($val) => {
                // getting returned value
                const returnPercent = $val.text()
                cy.log("Returned Percent: ", returnPercent);

                // case for user input
                if(inputTimeDuration == '1Y'){
                    expect(returnPercent).to.be.eq('0.17%')
                }
                else if(inputTimeDuration == '30D'){
                    expect(returnPercent).to.be.eq('0.01%')
                }
                else if(inputTimeDuration == '7D'){
                    expect(returnPercent).to.be.eq('0.003%')
                }
                else{
                    expect(returnPercent).to.be.eq('0.0004%')
                }
            })
    }

    // stake amount 
    stakePilot(stakeAmount) {
        cy.get('body').find('input:nth(1)').clear().type(stakeAmount)
    }
    
    // stake transaction
    stakeTransaction() {
        cy.get('body').find('#unpilot-staking-accordian-detail').then(($val) => {

            // checking if the button is disabled or not
            var is_disable = $val.prop("disabled")
            cy.log('Attribute value: ', is_disable)

            // condition if disable then do not click it
            if (is_disable == true) {
                cy.log('reward button is disabled')
            }
            else {
                cy.get('body').find('#unpilot-staking-accordian-detail').click()
                // cy.confirmMetamaskTransaction({ gasFee: 0.019, gasLimit: 12410385 })
                cy.confirmMetamaskTransaction({ gasFee: 2})
                // cy.switchToCypressWindow();
            }
        })
    }

    // check your Staked Pilot
    verifyYourStakedPilot() {
        cy.contains('Your staked PILOT', { matchCase: true }).next().then(($val) => {
            const stakedPilot = $val.text()
            cy.log('Staked Pilot : ', stakedPilot)
        })
    }
}


export default Stake