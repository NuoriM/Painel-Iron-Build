const path = require('path');

module.exports = class HomeController {
  home(req, resp, next){
    resp.sendFile(path.join(__dirname, '..', '..', '/index.html'));
  }
}