/* eslint-disable no-useless-escape */

const express = require('express');

const HomeController = require('./controller/HomeController');
const BadgesController = require('./controller/BadgesController');

const app = express();
app.use(express.static('public'));

const homeController = new HomeController();
const badgesController = new BadgesController();

app.get('/', homeController.home);

app.get('/getBadges', badgesController.getBadges);

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});