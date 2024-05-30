const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
    const formData = req.body;
    const recaptchaResponse = req.body['g-recaptcha-response'];
    const secretKey = '6LcM3t4pAAAAAMZdNwY8iBJuMLRs2AMiuPaT_GwC';

    fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fs.readFile('data.json', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Ошибка чтения файла базы данных.');
                }
                let database = JSON.parse(data);
                database.push(formData);
                fs.writeFile('data.json', JSON.stringify(database, null, 2), (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Ошибка записи в файл базы данных.');
                    }
                    res.redirect('index.html');
                });
            });
        } else {
            return res.status(400).send('Ошибка: Пожалуйста, пройдите проверку reCAPTCHA.');
        }
    })
    .catch(error => {
        console.error(error);
        return res.status(500).send('Ошибка сервера.');
    });
});

app.listen(port, () => {
    console.log(`Зайди на порт localhost:${port}`);
});
