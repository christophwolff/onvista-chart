export default {
    isLoading: false,
    showGraph: null,
    chartStyle: {
        display: 'none'
    },
    currentGraph: null, // Maybe usefull for the clicked row
    error: 0,
    chartsOptions: {
        xAxis: false,
        yAxis: [{
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'OHLC'
            },
            height: '60%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'Volume'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
        }],
        tooltip: {
            split: true
        },
        series: null
    }
}