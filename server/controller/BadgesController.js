/* eslint-disable no-useless-escape */

const BadgesFacade = require('../facade/BadgesFacade');

const badgesFacade = new BadgesFacade();

module.exports = class BadgesController {
  async getBadges(req, resp) {
    const params = req.query;
    console.log(params);
    
    const data = await badgesFacade.getBadges(params);
    
    resp.json(data);
  }

  //async getBadge(req, resp, next) {}
};