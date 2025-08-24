
let data = {}
const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Retirement Graph'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

const ctx = document.getElementById('myLineChart').getContext('2d');

let myChart;

window.onload = function() {
    getLocalStorage()
    console.log("Page and all resources are loaded!");
    myChart = new Chart(ctx, config);
    update()
}

const monthDiff = (d1, d2) => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
};

function updateMonthsUntilRetirement() {
    let age = new Date(document.getElementById('currentAge').value)
    let retirementAge = Number(document.getElementById('retirementAge').value)
    let retirementDate = new Date(age)
    retirementDate.setFullYear(retirementDate.getFullYear() + retirementAge)
    document.getElementById('monthsUntilRetirement').value = monthDiff(new Date(),retirementDate)
}

function updateMonthsInRetirement() {
    let age = new Date(document.getElementById('currentAge').value)
    let lifeExpectancyAge = Number(document.getElementById('lifeExpectancy').value)
    let lifeExpectancy = new Date(age)
    lifeExpectancy.setFullYear(lifeExpectancy.getFullYear() + lifeExpectancyAge);

    let retirementAge = Number(document.getElementById('retirementAge').value)
    let retirementDate = new Date(age)
    retirementDate.setFullYear(retirementDate.getFullYear() + retirementAge)

    document.getElementById('monthsInRetirement').value = monthDiff(retirementDate,lifeExpectancy)
}

function updateMonthsuntil65() {
    let age = new Date(document.getElementById('currentAge').value)
    let sixtyFive = new Date(age)
    sixtyFive.setFullYear(sixtyFive.getFullYear() + 65);
    document.getElementById('monthsUntil65').value = monthDiff(new Date(),sixtyFive)
}

function updateHealthInsuranceCost() {
    let retirementAge = Number(document.getElementById('retirementAge').value)
    let element = document.getElementById('HealthInsuranceBox')
    if (retirementAge > 64) {
        element.value = 0
        element.style = "display: none;"
    }
    else {
        element.value = 12000
        element.style = "display: block;"
    }
}



function update() {
    updateMonthsUntilRetirement();
    updateMonthsInRetirement()
    updateMonthsuntil65()
    updateHealthInsuranceCost()
    updateData()
}

for (const element of document.getElementsByTagName('input')) {
    element.addEventListener('input', update)
}

function generateHsaUntilRetirement(monthsUntilRetirement, stockReturn) {
    let currentHSAValue = Number(document.getElementById('currentHSAValue').value)
    let monthlyHSAContribution = Number(document.getElementById('monthlyHSAContribution').value)
    let monthlyStockReturn = (stockReturn/12)/100;
    let returnDataArray= [currentHSAValue]

    let month = 0
    while (month<=monthsUntilRetirement) {
        let interest = returnDataArray[month] * monthlyStockReturn;
        returnDataArray.push(returnDataArray[month] + interest + monthlyHSAContribution)
        month++;
    }

    return returnDataArray;
}

function generate401KUntilRetirement(monthsUntilRetirement, stockReturn) {
    let current401Value = Number(document.getElementById('current401Value').value)
    let monthly401Contribution = Number(document.getElementById('monthly401Contribution').value)
    let monthlyStockReturn = (stockReturn/12)/100;
    let returnDataArray= [current401Value]

    let month = 0
    while (month<=monthsUntilRetirement) {
        let interest = returnDataArray[month] * monthlyStockReturn;
        returnDataArray.push(returnDataArray[month] + interest + monthly401Contribution)
        month++;
    }

    return returnDataArray;
}

function generateSavingsUntilRetirement(monthsUntilRetirement) {
    let currentSavingsValue = Number(document.getElementById('currentSavingsValue').value)
    let monthlySavingsContribution = Number(document.getElementById('monthlySavingsContribution').value)
    let currentSavingsRate = Number(document.getElementById('currentSavingsRate').value)
    let monthlyReturn = (currentSavingsRate/12)/100;
    let returnDataArray= [currentSavingsValue]

    let month = 0
    while (month<=monthsUntilRetirement) {
        let interest = returnDataArray[month] * monthlyReturn;
        returnDataArray.push(returnDataArray[month] + interest + monthlySavingsContribution)
        month++;
    }

    return returnDataArray;
}

function generateRothUntilRetirement(monthsUntilRetirement, stockReturn) {
    let currentRothValue = Number(document.getElementById('currentRothValue').value)
    let monthlyRothContribution = Number(document.getElementById('monthlyRothContribution').value)
    let monthlyStockReturn = (stockReturn/12)/100;
    let returnDataArray= [currentRothValue]

    let month = 0
    while (month<=monthsUntilRetirement) {
        let interest = returnDataArray[month] * monthlyStockReturn;
        returnDataArray.push(returnDataArray[month] + interest + monthlyRothContribution)
        month++;
    }

    return returnDataArray;
}


function generateRolloverUntilRetirement(monthsUntilRetirement, stockReturn) {
    let currentRolloverValue = Number(document.getElementById('currentRolloverValue').value)
    let monthlyRolloverContribution = Number(document.getElementById('monthlyRolloverContribution').value)
    let monthlyStockReturn = (stockReturn/12)/100;
    let returnDataArray= [currentRolloverValue]

    let month = 0
    while (month<=monthsUntilRetirement) {
        let interest = returnDataArray[month] * monthlyStockReturn;
        returnDataArray.push(returnDataArray[month] + interest + monthlyRolloverContribution)
        month++;
    }

    return returnDataArray;
}


function generateBrokerageUntilRetirement(monthsUntilRetirement, stockReturn) {
    let currentBrokerageValue = Number(document.getElementById('currentBrokerageValue').value)
    let monthlyBrokerageContribution = Number(document.getElementById('monthlyBrokerageContribution').value)
    let monthlyStockReturn = (stockReturn/12)/100;
    let returnDataArray= [currentBrokerageValue]

    let month = 0
    while (month<=monthsUntilRetirement) {
        let interest = returnDataArray[month] * monthlyStockReturn;
        returnDataArray.push(returnDataArray[month] + interest + monthlyBrokerageContribution)
        month++;
    }

    return returnDataArray;
}




function calculateRetirementSpending
(monthsUntilRetirement,monthsInRetirement, averageStockReturn, hsaValue, fourOhOneKValue, savingsValue, rothValue, rolloverValue, brokerageValue) {
    let monthlyInflation = (Number(document.getElementById('yearlyInflation').value) / 12) / 100
    let accumulatedInflation = Math.pow(monthlyInflation + 1, monthsUntilRetirement)
    let monthlyStockReturn = (averageStockReturn/12)/100;
    let healthInsuranceYearlyCost = Number(document.getElementById('healthInsurance').value)
    let retirementSpending = Number(document.getElementById('retirementSpending').value)
    let retirementTaxes = Number(document.getElementById('retirementTaxes').value)/100


    let month = 0
    let returnData = [{'hsa': hsaValue, 'fourOhOneKValue': fourOhOneKValue, 'savings': savingsValue, 'roth': rothValue, 'rollover': rolloverValue, 'brokerage': brokerageValue}]
    while (month <= monthsInRetirement) {
        let remainder = 0
        let thisMonthReturnData = {}
        let thisMonthInflation = (accumulatedInflation + (monthlyInflation * (month + 1)))
        if (healthInsuranceYearlyCost > 0 || monthsUntilRetirement + month > Number(document.getElementById('monthsUntil65').value)) {
            let healthInsuranceMonthlyCost = (healthInsuranceYearlyCost / 12) * thisMonthInflation
            hsaValue = hsaValue - (healthInsuranceMonthlyCost)
            if (hsaValue < 0) {
                remainder = Math.abs(hsaValue)
                hsaValue = 0
            } else {
                hsaValue = (hsaValue) * (1+ monthlyStockReturn)
            }
            thisMonthReturnData.hsa = hsaValue
        }
        let thisMonthSpending = ((retirementSpending * thisMonthInflation)+ remainder)* (1 + retirementTaxes)


        //brokerage
        brokerageValue = brokerageValue - thisMonthSpending;
        if(brokerageValue < 0) {
            thisMonthSpending = Math.abs(brokerageValue)
            brokerageValue = 0
        } else {
            thisMonthSpending = 0
            brokerageValue = brokerageValue * (1 + monthlyStockReturn)
        }
        thisMonthReturnData.brokerage = brokerageValue

        //savings
        savingsValue = savingsValue - thisMonthSpending;
        if(savingsValue < 0) {
            thisMonthSpending = Math.abs(savingsValue)
            savingsValue = 0
        } else {
            thisMonthSpending = 0
            savingsValue = savingsValue * (1 + monthlyStockReturn) // fix
        }
        thisMonthReturnData.savings = savingsValue

        //401k
        fourOhOneKValue = fourOhOneKValue - thisMonthSpending;
        if (fourOhOneKValue < 0) {
            thisMonthSpending = Math.abs(fourOhOneKValue)
            fourOhOneKValue = 0
        } else {
            thisMonthSpending = 0
            fourOhOneKValue = fourOhOneKValue * (1 + monthlyStockReturn)
        }
        thisMonthReturnData.fourOhOneKValue = fourOhOneKValue

        //rollover
        rolloverValue = rolloverValue - thisMonthSpending;
        if(rolloverValue < 0) {
            thisMonthSpending = Math.abs(rolloverValue)
            rolloverValue = 0
        } else {
            thisMonthSpending = 0
            rolloverValue = rolloverValue * (1 + monthlyStockReturn)
        }
        thisMonthReturnData.rollover = rolloverValue

        //roth
        rothValue = rothValue - thisMonthSpending;
        if(rothValue < 0) {
            thisMonthSpending = Math.abs(rothValue)
            rothValue = 0
        } else {
            thisMonthSpending = 0
            rothValue = rothValue * (1 + monthlyStockReturn)
        }
        thisMonthReturnData.roth = rothValue



        returnData.push(thisMonthReturnData)
        month++;
    }
    return returnData

}


function updateData() {
    let monthsUntilRetirement = Number(document.getElementById('monthsUntilRetirement').value)
    let monthsInRetirement = Number(document.getElementById('monthsInRetirement').value)
    let averageStockReturn = Number(document.getElementById('averageStockReturn').value)


    let hsaData = generateHsaUntilRetirement(monthsUntilRetirement, averageStockReturn)
    let fourOhOneKData = generate401KUntilRetirement(monthsUntilRetirement, averageStockReturn);
    let savingsData = generateSavingsUntilRetirement(monthsUntilRetirement)
    let rothData = generateRothUntilRetirement(monthsUntilRetirement, averageStockReturn)
    let rolloverData = generateRolloverUntilRetirement(monthsUntilRetirement, averageStockReturn)
    let brokerageData = generateBrokerageUntilRetirement(monthsUntilRetirement, averageStockReturn)
    let spendingData =
        calculateRetirementSpending(monthsUntilRetirement,monthsInRetirement,
            averageStockReturn,
            hsaData[hsaData.length - 1],
            fourOhOneKData[fourOhOneKData.length - 1],
            savingsData[savingsData.length - 1],
            rothData[rothData.length - 1],
            rolloverData[rolloverData.length - 1],
            brokerageData[brokerageData.length - 1]
        )
    hsaData.pop()
    fourOhOneKData.pop()
    savingsData.pop()
    rothData.pop()
    rolloverData.pop()
    brokerageData.pop()
    hsaData = hsaData.concat(spendingData.map(obj => obj.hsa))
    fourOhOneKData = fourOhOneKData.concat(spendingData.map(obj => obj.fourOhOneKValue))
    savingsData = savingsData.concat(spendingData.map(obj => obj.savings))
    rothData = rothData.concat(spendingData.map(obj => obj.roth))
    rolloverData = rolloverData.concat(spendingData.map(obj => obj.rollover))
    brokerageData = brokerageData.concat(spendingData.map(obj => obj.brokerage))

    data = {
        labels: Array.from(Array(monthsUntilRetirement+monthsInRetirement+50).keys()),
        datasets: [
            {
                label: 'HSA',
                data: hsaData,
                fill: false,
                tension: 0.1
            }, {
                label: '401K',
                data: fourOhOneKData,
                fill: false,
                tension: 0.1
            }, {
                label: 'Savings',
                data: savingsData,
                fill: false,
                tension: 0.1
            }, {
                label: 'Roth IRA',
                data: rothData,
                fill: false,
                tension: 0.1
            }, {
                label: 'Rollover IRA',
                data: rolloverData,
                fill: false,
                tension: 0.1
            }, {
                label: 'Brokerage',
                data: brokerageData,
                fill: false,
                tension: 0.1
            }
        ]
    };
    myChart.data = data
    myChart.update()
    setLocalStorage()

}

function getLocalStorage() {
    for (const element of document.getElementsByTagName('input')) {
        let item = localStorage.getItem(element.id)
        if(item == null) {
            element.value = localStorage.getItem(element.id)
        }
    }
}


function setLocalStorage() {
    for (const element of document.getElementsByTagName('input')) {
        localStorage.setItem(element.id, element.value)
    }
}

