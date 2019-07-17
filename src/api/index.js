import axios from 'axios';

const BASE_API_ARL = 'https://cloud.iexapis.com/stable/stock/';
const TOKEN = process.env.REACT_APP_TOKEN;

const fetchStockGraphData = (symbol) => {
    return new Promise((resolve, reject) => {
    
        axios.get(`${BASE_API_ARL}${symbol}/chart/1y?token=${TOKEN}`).then((res) => {
            setTimeout(() => {
                resolve(res.data)
            }, 500) //Artificial Api Delay
        }).catch(function (response) {
            reject(response);
        });
    })
}

// const fetchStocks = (symbols, types, range) => axios.get(`${API}/market/batch?symbols=${symbols}&types=${types}&range=${range}&last=5`)

const fetchStocks = (symbols, types, range) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_API_ARL}/market/batch?symbols=${symbols}&types=${types}&range=${range}&last=5&token=${TOKEN}`).then((res) => {
             setTimeout(() => {
                resolve(res.data)
            }, 500) //Artificial Api Delay
        }).catch(function (response) {
            reject(response);
        });
    })

}

const fetchSimpleGraphData = (symbol, duration, interval) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_API_ARL}${symbol}/chart/${duration}?chartInterval=${interval}&token=${TOKEN}`).then((res) => {
            setTimeout(() => {
                resolve(res.data)
            }, 500) //Artificial Api Delay
        }).catch(function (response) {
            reject(response);
        });
    })
}
const fetchCurrentExchangeRate = (currencyBase, returnCurrency) => {
    return new Promise((resolve, reject) => {

        axios.get(`https://api.exchangeratesapi.io/latest?base=${currencyBase}&token=${TOKEN}`).then((res) => {
            setTimeout(() => {
                resolve(res.data.rates[returnCurrency])
            }, 500) //Artificial Api Delay
        }).catch(function (response) {
            reject(response);
        });
    })
}

export { fetchStockGraphData, fetchStocks, fetchSimpleGraphData, fetchCurrentExchangeRate };
