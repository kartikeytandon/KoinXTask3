const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('/cryptoCompanies', async (req, res) => {
    const coin = req.query.coin
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/companies/public_treasury/${coin}`)
        const data = response.data
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "intrnal server errror"})
    }
})

app.listen(8000, () => {
    console.log('Server is listeting on port 8000');
})