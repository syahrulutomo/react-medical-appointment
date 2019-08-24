import React, { Component } from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import IHCLogo from './../img/logo_ihc.png';
import Logo1 from './../img/logo-home1.png';
import Logo2 from './../img/logo-home2.png';
import Logo3 from './../img/logo-home3.png';
import Arrow from './../img/arrow-right.png';

export default class Home extends Component {
    render() {
        return (
            <div className="container-home">
                <div className="home">
                    <img className="home__logo" src={IHCLogo} alt="Logo IHC"/>
                    <p className="home__headline">Selamat datang di IHC Mobile</p>
                    <p className="home__greeting">Kami memberikan pelayanan komprehensif dan terpadu dengan standar pelayanan terakreditasi.</p>
                    <div className="home__menu">
                        <Link to="/spesialisasi">
                            <div className="home__menu__item">
                                <img className="home__menu__item__logo" src={Logo1} alt="logo home menu 1"/>
                                <div className="home__menu__item__desc">
                                    <p className="menu-title">Booking Cepat</p>
                                    <p className="menu-desc">Pesan dokter langganan</p>
                                </div>
                                <img className="home__menu__item__arrow" src={Arrow} alt="arrow icon1"/>
                            </div>
                        </Link>
                        <Link to="/jadwal">
                            <div className="home__menu__item">
                                <img className="home__menu__item__logo" src={Logo2} alt="logo home menu 2"/>
                                <div className="home__menu__item__desc">
                                    <p className="menu-title">Cari Faskes</p>
                                    <p className="menu-desc">Rumah sakit dan klinik</p>
                                </div>
                                <img className="home__menu__item__arrow" src={Arrow} alt="arrow icon2"/>
                            </div>
                        </Link>
                        <Link to="/dokter">
                            <div className="home__menu__item">
                                <img className="home__menu__item__logo" src={Logo3} alt="logo home menu 3"/>
                                <div className="home__menu__item__desc">
                                    <p className="menu-title">Cari Dokter</p>
                                    <p className="menu-desc">Umum dan spesialis</p>
                                </div>
                                <img className="home__menu__item__arrow" src={Arrow} alt="arrow icon1"/>
                            </div>
                        </Link>
                        
                    </div>
                </div>
                <Nav/>
            </div>
            
        )
    }
}
