import React, { Component } from "react";
import Nav1 from "assets/img/nav1.png";
import Nav2 from "assets/img/nav2.png";
import Nav3 from "assets/img/nav3.png";
import Nav4 from "assets/img/nav4.png";
import classes from "./Nav.module.scss"

class Nav extends Component {
  state = {
    menu: [
      "Home", "Jadwal", "Bayar", "Profil"
    ]
  }

  render() {
    return (
      <div className={classes.nav}>
        <div className={classes.nav__content}>
          <div className={classes.nav__item}>
            <img className={classes.nav__item__icon} src={Nav1} alt="" />
            <p className={classes.nav__item__desc}>Home</p>
          </div>
          <div className={classes.nav__item}>
            <img className={classes.nav__item__icon} src={Nav2} alt="" />
            <p className={classes.nav__item__desc}>Jadwal</p>
          </div>
          <div className={classes.nav__item}>
            <img className={classes.nav__item__icon} src={Nav3} alt="" />
            <p className={classes.nav__item__desc}>Bayar</p>
          </div>
          <div className={classes.nav__item}>
            <img className={classes.nav__item__icon} src={Nav4} alt="" />
            <p className={classes.nav__item__desc}>Profil</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;