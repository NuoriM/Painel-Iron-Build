/* eslint-disable no-useless-escape */

const BadgesDao = require('../dao/BadgesDao');

const badgesDao = new BadgesDao();

module.exports = class BadgesFacade {
  
  async getBadges(params) {
    const resp = await badgesDao.getBadges();
    const data = await resp.json();

    var badgesArray = await this.badgesDataToArr(data);
    //const regEspecialChars = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
    
    //Filtra as badges pela descrição
    if(!this.isEmpty(params.description) || !this.isBlank(params.description)){
      badgesArray = badgesArray.filter(obj => {
        if(obj.description != undefined){
          return obj.description.toLowerCase()
            .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
            .includes(
              params.description.toLowerCase()
              .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
            );
        }
      });
    }
    
    //Filtra as badges pelo nome
    if(!this.isEmpty(params.name) || !this.isBlank(params.name)){
      badgesArray = badgesArray.filter(obj => {
        if(obj.name != undefined){
          return obj.name.toLowerCase()
            .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
            .includes(
              params.name.toLowerCase()
              .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
            );
        }
      });
    }
    
    //Filtra as badges pelo id
    if(!this.isEmpty(params.id) || !this.isBlank(params.id)){
      badgesArray = badgesArray.filter(obj => {
        if(obj.id != undefined){
          return obj.id.toLowerCase()
            .includes(
              params.id.toLowerCase()
            );
        }
      });
    }
    
    return badgesArray;
  }

  badgesDataToArr(data) {
    let arr = data.contents.split(/\r\n/);
    arr = arr.splice(arr.indexOf("teste=teste"));

    let tempArray = [];
    let i = 0,
      len = arr.length;
    for (i; i < len; i++) {
      const badge = arr[i];

      if (!this.isEmpty(badge) || !this.isBlank(badge)) {
        let arrBadge = badge.split("=");

        if (arrBadge[0].includes("badge_name")) {
          var tempVect = {};

          tempVect["id"] = arrBadge[0].replace("badge_name_", "");
          tempVect["name"] = arrBadge[1];
        } else if (arrBadge[0].includes("badge_desc")) {
          tempVect["description"] = arrBadge[1];

          tempArray.push(tempVect);
        }
      }
    }
    
    return tempArray;
  }

  isEmpty(str) {
    return !str || str.length === 0;
  }

  isBlank(str) {
    return !str || /^\s*$/.test(str);
  }
};