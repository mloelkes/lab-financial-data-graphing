let start = undefined;
let end = undefined;
let myChart = undefined;
let currency = "EUR";

function handleStartDateChange(e) {
    start = e.target.value;
    
    if (start && end) {
        createChart(start, end);
    }
}

function handleEndDateChange(e) {
    end = e.target.value;
    
    if (start && end) {
        createChart(start, end);
    }
}

function handleCurrencyChange(e) {
    currency = e.target.value;
    createChart();
}

async function getData() {
    let url = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}`;

    if (start && end) {
        url = (`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`);
    }

    const response = await axios.get(url);
    return response.data.bpi;
}

function drawChart(dataFromApi) {
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(dataFromApi),
            datasets: [{
                label: 'Bitcoin Price',
                data: Object.values(dataFromApi),
                backgroundColor: [
                    'rgba(255, 99, 132)'
                ],
                borderColor: [
                    'rgba(255, 99, 132)'
                ],
                borderWidth: 1
            }]
        }
    });
}

async function createChart() {
    const dataFromApi = await getData();

    if (myChart) {
        myChart.destroy();
    }

    drawChart(dataFromApi);
}

createChart();