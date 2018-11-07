import axios from 'axios';

const BASE_API_ARL = 'https://api.iextrading.com/1.0/stock/';

const fetchStockGraphData = (symbol) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_API_ARL}${symbol}/chart/1y`).then((res) => {
            resolve(res.data)
        }).catch(function (response) {
            reject(response);
        });
    })
}

// const fetchStocks = (symbols, types, range) => axios.get(`${API}/market/batch?symbols=${symbols}&types=${types}&range=${range}&last=5`)

const fetchStocks = (symbols, types, range) => {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_API_ARL}/market/batch?symbols=${symbols}&types=${types}&range=${range}&last=5`).then((res) => {
            resolve(res.data)
        }).catch(function (response) {
            reject(response);
        });
    })

}

export {
    fetchStockGraphData,
    fetchStocks
}