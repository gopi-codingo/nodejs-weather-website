const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000

// Define path for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gopikrishna'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Gopikrishna'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Gopikrishna',
        message: 'Contact Us @ xxxxxx@mailhost.com.'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }

    geocode(req.query.address, (error, body ) => {
        if (error) {
            return res.send({
                error
            });
        }
        if (body) {
            forecast(body, (wError, {weather_descriptions, temperature, feelslike} = {}) => {
                if (wError) {
                    return res.send({
                        error: wError
                    });
                }
                console.log();
                res.send({
                    forecast: `${weather_descriptions[0]} : It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`,
                    location: body.location,
                    address: req.query.address
                });
            });
        }
    });

});

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }
    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404page', {
        message: 'Help article not found',
        name: 'Gopikrishna',
        title: '404 Page'
    });
});

app.get('*', (req, res) => {
    res.render('404page', {
        message: 'Page not found',
        name: 'Gopikrishna',
        title: '404 Page'
    });
});

app.listen(port, () => {
    console.log('Server is up on port 3000');
});