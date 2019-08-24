import React, { Component } from 'react';
import ArrowLeft from './../img/arrow left.png';
import SearchIcon from './../img/search icon.png';
import { selectLocation } from '../actions/selectLocation';
import { fetchSpesialisasiByLocation } from '../actions/cariSpesialisasiByLocation';
import { fetchingDokter } from '../actions/getDokter';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grey from './../img/grey.jpg';
import Klinik from './../img/klinik.png';
import Jadwal from './../img/jadwal icon.png';
import JanjiOnline from './../img/janji online.png';
import Filter from './../img/filter.png';
import Urutkan from './../img/urutkan.png';


export class JadwalByLocation extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterBy: 'semua'
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);  
        this.getJadwalList = this.getJadwalList.bind(this);
    }

    componentDidMount(){
        this.props.onFetchSpesialisasi();    
        this.props.onFetchDokter();  
    }
    

    handleChange(event){
        this.props.onSelectLocation(event.target.value);
    }

    handleClick(event){
        this.setState({
            filterBy: event.currentTarget.getAttribute('data-value')
        });
    }

    getJadwalList(arr){
        let jadwalList = [];
       
        for(let i = 0; i < arr.length; i++){    
            for(let j = 0; j < arr[i]['jadwal'].length; j++){
                let dokter = this.props.dokter.filter(data => data['id'] === arr[i]['jadwal'][j]['id_dokter']);
                let spesialis = dokter.filter(data => data['spesialisasi'] === this.props.spesialisasi);
                
                if(spesialis.length > 0){
                    jadwalList.push([dokter, arr[i]['jadwal'][j],arr[i]['nama'],arr[i]['alamat']]);                         
                }
            }
        }
        return jadwalList;
    }

    render() {
        console.log(this.props.spesialisasi);
        console.log(this.props.location);
        let menu1Class = this.state.filterBy === "semua" ? "jadwal-location__sort filter-jadwal-active" : "jadwal-location__sort";
        let menu2Class = this.state.filterBy === "hari ini" ? "jadwal-location__sort filter-jadwal-active" : "jadwal-location__sort";
        let menu3Class = this.state.filterBy === "online" ? "jadwal-location__sort filter-jadwal-active" : "jadwal-location__sort";
        
        const jadwalByLocation = this.props.klinik.length > 0 ? this.props.klinik.filter( data => data.kota === this.props.location ) :this.props.klinik.filter( data => data.kota === 'Jakarta Selatan' );
        let jadwalList = this.getJadwalList(jadwalByLocation);

        if(jadwalList.length > 0){
            jadwalList = jadwalList.map(data => (
                <div key={data[0][0]['id']} className="jadwal-praktik">
                            <div className="jadwal-praktik__desc">
                                <p className="jadwal-praktik__desc__nama">{data[0][0]['nama']}</p>
                                <div className="jadwal-praktik__desc__rs">
                                    <img className="jadwal-praktik__desc__rs__icon" src={Klinik} alt="" />
                                    <p className="jadwal-praktik__desc__rs__nama">{data[2]}</p>
                                </div>
                                <div className="jadwal-praktik__desc__jadwal">
                                    <img className="jadwal-praktik__desc__jadwal__icon" src={Jadwal} alt="" />
                                    <p className="jadwal-praktik__desc__jadwal__jadwal">{data[1]['hari']+' ('+data[1]['pukul']+')' }</p>
                                </div>  
                            </div>
                            <div className="jadwal-praktik__photo-container">
                                <img className="jadwal-praktik__photo" src={Grey} alt="" />
                            </div>
                            <div className="jadwal-praktik__janji-online">
                                <img className="jadwal-praktik__janji-online__icon" src={JanjiOnline} alt=""/>
                                <p className="jadwal-praktik__janji-online__desc">{data[0][0]['janji_online']}</p>    
                            </div>
                        </div>
            ));

        }

        
        
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
                        <div className={menu1Class}>
                            <p className="jadwal-location__sort__desc" data-value="semua" onClick={this.handleClick}>Semua</p>
                        </div>
                        <div className={menu2Class}>
                            <p className="jadwal-location__sort__desc" data-value="hari ini" onClick={this.handleClick}>Praktik hari ini</p>
                        </div>
                        <div className={menu3Class}>
                            <p className="jadwal-location__sort__desc" data-value="online" onClick={this.handleClick}>Booking online</p>
                        </div>
                    </div>
                </div>

                <div className="jadwal-praktik__container">
                
                    {jadwalList}
                </div>

                <div className="jadwal-location__menu">
                    <div className="jadwal-location__menu__item">
                        <img className="jadwal-location__menu__item__icon" src={Filter} alt=""/>
                        <p className="jadwal-location__menu__item__desc">Filter</p>
                    </div>
                    <div className="jadwal-location__menu__item">
                        <img className="jadwal-location__menu__item__icon" src={Urutkan} alt=""/>
                        <p className="jadwal-location__menu__item__desc">Urutkan</p>
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
      dokter: state.booking.dokter,
      klinik: state.booking.klinik
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onSelectLocation : (location) => {
          dispatch(selectLocation(location))
      },
      onFetchSpesialisasi : () => {
        dispatch(fetchingDokter())
      },
      onFetchDokter : () => {
        dispatch(fetchSpesialisasiByLocation())
      }
    }
  } 

  JadwalByLocation.propTypes = {
      location: PropTypes.string.isRequired,
      onSelectLocation: PropTypes.func.isRequired,
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(JadwalByLocation);