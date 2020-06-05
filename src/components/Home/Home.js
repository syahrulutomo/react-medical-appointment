import React, { Component } from "react";
import Nav from "../Nav/Nav";

import medicalLogo from "assets/img/medical-logo.png";
import Logo1 from "assets/img/logo-home1.png";
import Logo2 from "assets/img/logo-home2.png";
import Logo3 from "assets/img/logo-home3.png";
// import Arrow from "assets/img/arrow-right.png";
import classes from "./Home.module.scss";
import Menus from "./Menus/Menus";

class Home extends Component {
  state = {
    menus: [
      { logo: Logo1, alt: "Menu booking cepat", title: "Booking Cepat", subtitle: "Pesan dokter langganan", route: "/spesialisasi" },
      { logo: Logo2, alt: "Menu cari faskes", title: "Cari Faskes", subtitle: "Rumah Sakit dan Klinik", route: "" },
      { logo: Logo3, alt: "Menu cari dokter", title: "Cari Dokter", subtitle: "Umum dan Spesialis", route: "" }
    ]
  }
  render() {
    return (
      <div className={classes.containerHome}>
        <div className={classes.home}>
          <img className={classes.home__logo} src={medicalLogo} alt="Logo IHC"/>
          <p className={classes.home__headline}>Selamat datang di Medical Appointment</p>
          <p className={classes.home__greeting}>Kami memberikan pelayanan komprehensif dan terpadu dengan standar pelayanan terakreditasi.</p>
          <Menus menus={this.state.menus} />
          {/* <div className={classes.home__menu}>              
            <Link to="/spesialisasi">
              <div className={classes.home__menu__item}>
                <div className={classes.home__menu__item__left}>
                  <img className={classes.home__menu__item__left__logo} src={Logo1} alt="logo home menu 1"/>
                  <div className={classes.home__menu__item__left__desc}>
                    <p className={classes.menuTitle}>Booking Cepat</p>
                    <p className={classes.menuDesc}>Pesan dokter langganan</p>
                  </div>
                </div>
                <div className={classes.home__menu__item__right}>
                  <img className={classes.home__menu__item__right__arrow} src={Arrow} alt="arrow icon1"/>
                </div>
              </div>
            </Link>
                      
            <div className={classes.home__menu__item}>
              <div className={classes.home__menu__item__left}>
                <img className={classes.home__menu__item__left__logo} src={Logo2} alt="logo home menu 1"/>
                <div className={classes.home__menu__item__left__desc}>
                  <p className={classes.menuTitle}>Cari Faskes</p>
                  <p className={classes.menuDesc}>Rumah Sakit dan Klinik</p>
                </div>
              </div>
              <div className={classes.home__menu__item__right}>
                <img className={classes.home__menu__item__right__arrow} src={Arrow} alt="arrow icon1"/>
              </div>
            </div>
                       
            <div className={classes.home__menu__item}>
              <div className={classes.home__menu__item__left}>
                <img className={classes.home__menu__item__left__logo} src={Logo3} alt="logo home menu 1"/>
                <div className={classes.home__menu__item__left__desc}>
                  <p className={classes.menuTitle}>Cari Dokter</p>
                  <p className={classes.menuDesc}>Umum dan Spesialis</p>
                </div>
              </div>
              <div className={classes.home__menu__item__right}>
                <img className={classes.home__menu__item__right__arrow} src={Arrow} alt="arrow icon1"/>
              </div>
            </div>    
          </div> */}

        </div>
        <Nav/>
      </div>
    );
  }
}

export default Home;