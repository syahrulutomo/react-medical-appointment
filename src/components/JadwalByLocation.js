import React, { Component } from 'react';
import ArrowLeft from './../img/arrow left.png';
import SearchIcon from './../img/search icon.png';
import { selectLocation } from '../actions/selectLocation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grey from './../img/grey.jpg';
import Klinik from './../img/klinik.png';
import Jadwal from './../img/jadwal icon.png';
import JanjiOnline from './../img/janji online.png';


export class JadwalByLocation extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
   }

    handleChange(event){
        this.props.onSelectLocation(event.target.value);
    }
 
    render() {        
        return (
            <div className="jadwal-location__container">
                <div className="jadwal-location">
                    <Link className="icon-back__link" to="/spesialisasi"><img className="icon-back" src={ArrowLeft} alt="" /></Link>
                    <div className="jadwal-location__location">
                        <p className="jadwal-location__title">{this.props.spesialisasi} di sekitar</p>
                        <select className="select-kota" onChange={this.handleChange} value={this.props.location}>
                        <option className="select-kota__option" value="Jakarta Selatan">Jakarta Selatan</option>
                            <option className="select-kota__option" value="Jakarta Timur">Jakarta Timur</option>
                            <option className="select-kota__option" value="Jakarta Pusat">Jakarta Pusat</option>
                            <option className="select-kota__option" value="Jakarta Barat">Jakarta Barat</option>
                            <option className="select-kota__option" value="Jakarta Utara">Jakarta Utara</option>
                        </select>
                    </div>
                    <img className="search-icon" src={SearchIcon} alt=""/>
                    <div className="jadwal-location__sort-container">
                        <div className="jadwal-location__sort">
                            <p className="jadwal-location__sort__desc">Semua</p>
                        </div>
                        <div className="jadwal-location__sort">
                            <p className="jadwal-location__sort__desc">Praktik hari ini</p>
                        </div>
                        <div className="jadwal-location__sort">
                            <p className="jadwal-location__sort__desc">Booking online</p>
                        </div>
                    </div>
                </div>

                <div className="jadwal-praktik__container">
                    <div className="jadwal-praktik">
                        <div className="jadwal-praktik__desc">
                            <p className="jadwal-praktik__desc__nama">dr. Agieta Zulkifli, Sp.THT-KL</p>
                            <div className="jadwal-praktik__desc__rs">
                                <img className="jadwal-praktik__desc__rs__icon" src={Klinik} alt="" />
                                <p className="jadwal-praktik__desc__rs__nama">Rumah Sakit Pusat Pertamina</p>
                            </div>
                            <div className="jadwal-praktik__desc__jadwal">
                                <img className="jadwal-praktik__desc__jadwal__icon" src={Jadwal} alt="" />
                                <p className="jadwal-praktik__desc__jadwal__jadwal">Praktik hari ini (10.00 -12.00)</p>
                            </div>  
                        </div>
                        <div className="jadwal-praktik__photo-container">
                            <img className="jadwal-praktik__photo" src={Grey} alt="" />
                        </div>
                        <div className="jadwal-praktik__janji-online">
                            <img className="jadwal-praktik__janji-online__icon" src={JanjiOnline} alt=""/>
                            <p className="jadwal-praktik__janji-online__desc">Bisa buat janji online</p>    
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
      location: state.booking.selectedLocation,
      spesialisasi: state.booking.spesialisasi,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onSelectLocation : (location) => {
          dispatch(selectLocation(location))
      }
    }
  } 

  JadwalByLocation.propTypes = {
      location: PropTypes.string.isRequired,
      spesialisasi: PropTypes.string.isRequired,
      onSelectLocation: PropTypes.func.isRequired,
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(JadwalByLocation);