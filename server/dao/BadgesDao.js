/* eslint-disable no-useless-escape */

const fetch = require('node-fetch');

module.exports = class BadgesDao {
  getBadges() {
    return fetch('https://api.allorigins.win/get?url=https://cdn.ironhotel.biz/static_iron/gamedata/override/external_flash_override_texts-iron.txt');
  }
}