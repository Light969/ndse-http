#!/usr/bin/env node

const http = require('http');
const readline = require("readline");
const config = require('./config')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const myAPIKey = config.myAPIKey;
let url = '';
rl.question("Укажите город: ", (city) => {url = `http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${city}`;
    http.get(url, (res) => {
            const { statusCode } = res;
            if (statusCode !== 200) {
                console.log('statusCode: ' + statusCode);
                return;
            }
            res.setEncoding('utf-8');
            let rowData = '';
            res.on('data', (chunk) => rowData += chunk);
            res.on('end', () => {
                let parseData = JSON.parse(rowData);
                console.log(parseData);
                if (parseData.error) {
                    console.log(parseData.error.info);
                } else {
                    console.log(
                    `Температура в городе ${parseData.location.name}: ${parseData.current.temperature} градусов и ощущается как ${parseData.current.feelslike} градусов. \n`
                    );
                }
                rl.close();
            });
        }).on('error', (error) => {console.error(error);});
});

// weather
// npm run dev
// npm run start
// Moscow
// Москва
