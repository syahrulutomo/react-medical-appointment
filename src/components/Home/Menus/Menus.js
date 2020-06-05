import React from "react";
import Menu from "./Menu/Menu";
import classes from "./Menus.module.scss";

const Menus = (props) => {
  
  const list = props.menus.map(item => {
    return (
      <Menu logo={item.logo} title={item.title} subtitle={item.subtitle} route={item.route} alt={item.alt} key={item.title}/>
    );
  }) 

  return (
    <div className={classes.menu}>
      {
        list    
      }
    </div>
  );
}

export default Menus;