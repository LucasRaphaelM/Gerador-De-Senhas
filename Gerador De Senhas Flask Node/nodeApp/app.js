const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/nodeApp/frontend', express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

app.post('/', async (req, res) => {
    try {
        const options = req.body;
        
        const response = await axios.post('http://127.0.0.1:5000/', options);

        res.json(response.data);
    } catch (error) {
        console.error('Erro ao conectar ao Flask:', error.message);
        res.status(500).send('Erro ao se comunicar com o Flask');
    }
});

app.listen(3000, () => {
    console.log('Servidor Node.js rodando em: http://localhost:3000');
});