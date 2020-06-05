import React from "react";
import classes from "./Menu.module.scss";
import Arrow from "assets/img/arrow-right.png";
import { Link } from "react-router-dom";

const Menu = (props) => {
  return (
    <Link to={ props.route ? props.route : ""}>
      <div className={classes.menu__item}>
        <div className={classes.menu__item__left}>
          <img className={classes.menu__item__left__logo} src={props.logo} alt={props.alt}/>
          <div className={classes.menu__item__left__desc}>
            <p className={classes.menuTitle}>{props.title}</p>
            <p className={classes.menuDesc}>{props.subtitle}</p>
          </div>
        </div>
        <div className={classes.menu__item__right}>
          <img className={classes.menu__item__right__arrow} src={Arrow} alt="arrow icon1"/>
        </div>
      </div>
    </Link>
  );
}; 

export default Menu;