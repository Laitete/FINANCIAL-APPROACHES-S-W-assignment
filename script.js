// Script for Payback Period Calculation
function calculatePayback() {
    const investment = parseFloat(document.getElementById('investment').value);
    const annualReturn = parseFloat(document.getElementById('annualReturn').value);
    if (isNaN(investment) || isNaN(annualReturn) || annualReturn === 0) {
        alert('Please enter valid numbers!');
        return;
    }
    const paybackPeriod = investment / annualReturn;
    document.getElementById('payback-result').innerText = `Payback Period: ${paybackPeriod.toFixed(2)} years`;
}

// Script for ROI Calculation
function calculateROI() {
    const gain = parseFloat(document.getElementById('gain').value);
    const cost = parseFloat(document.getElementById('cost').value);
    if (isNaN(gain) || isNaN(cost)) {
        alert('Please enter valid numbers!');
        return;
    }
    const roi = ((gain - cost) / cost) * 100;
    document.getElementById('roi-result').innerText = `Return on Investment: ${roi.toFixed(2)}%`;
}

// Script for NPV Calculation
function calculateNPV() {
    const cashFlows = document.getElementById('cashFlows').value.split(',').map(Number);
    const discountRate = parseFloat(document.getElementById('discountRate').value) / 100;
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);

    if (cashFlows.some(isNaN) || isNaN(discountRate) || isNaN(initialInvestment)) {
        alert('Please enter valid numbers!');
        return;
    }

    let npv = -initialInvestment;
    for (let i = 0; i < cashFlows.length; i++) {
        npv += cashFlows[i] / Math.pow(1 + discountRate, i + 1);
    }

    document.getElementById('npv-result').innerText = `Net Present Value: $${npv.toFixed(2)}`;
}

// Script for IRR Calculation
function calculateIRR() {
    const cashFlows = document.getElementById('cashFlowsIRR').value.split(',').map(Number);
    let guess = parseFloat(document.getElementById('initialGuess').value) / 100 || 0.1;

    if (cashFlows.some(isNaN)) {
        alert('Please enter valid numbers!');
        return;
    }

    const irr = IRR(cashFlows, guess);
    document.getElementById('irr-result').innerText = `Internal Rate of Return: ${(irr * 100).toFixed(2)}%`;
}

// IRR Calculation Function (Newton-Raphson Method)
function IRR(cashFlows, guess) {
    const maxIterations = 100;
    const precision = 1e-7;

    for (let i = 0; i < maxIterations; i++) {
        let npv = 0;
        let derivative = 0;

        for (let j = 0; j < cashFlows.length; j++) {
            npv += cashFlows[j] / Math.pow(1 + guess, j);
            derivative -= j * cashFlows[j] / Math.pow(1 + guess, j + 1);
        }

        const newGuess = guess - npv / derivative;

        if (Math.abs(newGuess - guess) < precision) {
            return newGuess;
        }

        guess = newGuess;
    }

    return guess;  // return the guess if precision wasn't met
}
