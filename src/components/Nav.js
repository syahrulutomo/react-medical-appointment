import React, { Component, } from "react";

import Nav1 from "./../img/nav1.png";
import Nav2 from "./../img/nav2.png";
import Nav3 from "./../img/nav3.png";
import Nav4 from "./../img/nav4.png";

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <div className="nav__item">
          <img className="nav__item__icon" src={Nav1} alt="" />
          <p className="nav__item__desc">Home</p>
        </div>
        <div className="nav__item">
          <img className="nav__item__icon" src={Nav2} alt="" />
          <p className="nav__item__desc">Jadwal</p>
        </div>
        <div className="nav__item">
          <img className="nav__item__icon" src={Nav3} alt="" />
          <p className="nav__item__desc">Bayar</p>
        </div>
        <div className="nav__item">
          <img className="nav__item__icon" src={Nav4} alt="" />
          <p className="nav__item__desc">Profil</p>
        </div>
      </div>
    );
  }
}

export default Nav;