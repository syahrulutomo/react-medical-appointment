import React, { Component } from "react";
import ArrowLeft from "assets/img/arrow left.png";
import SearchIcon from "assets/img/search icon.png";
import { selectLocation } from "actions/selectLocation";
import { fetchingKlinik} from "actions/getKlinik";
import { fetchingDokter } from "actions/getDokter";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Grey from "assets/img/grey.jpg";
import Klinik from "assets/img/klinik.png";
import JadwalGrey from "assets/img/jadwal grey.png";
import Jadwal from "assets/img/jadwal icon.png";
import JanjiOnline from "assets/img/janji online.png";
import Filter from "assets/img/filter.png";
import Urutkan from "assets/img/urutkan.png";
import { selectDokter } from "actions/selectDokter";

class JadwalByLocation extends Component {
  constructor(props){
    super(props);
    this.state = {
      menuSelected: "filter",
      sortBy: "",
      filterBy: "semua",
      jadwalList: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);  
    this.getJadwalList = this.getJadwalList.bind(this);
    this.filterByHariIni = this.filterByHariIni.bind(this);
    this.filterByBookingOnline = this.filterByBookingOnline.bind(this);
    this.filterAll = this.filterAll.bind(this);
    this.filterSortToggle = this.filterSortToggle.bind(this);
    this.selectDokter = this.selectDokter.bind(this);
  }

  componentDidMount(){
    this.props.onFetchingKlinik();    
    this.props.onFetchDokter();  
    const jadwalByLocation = this.props.klinik.length > 0 ? this.props.klinik.filter( data => data.kota === this.props.location ) :this.props.klinik.filter( data => data.kota === "Jakarta Selatan" );
    let jadwalList = this.getJadwalList(jadwalByLocation);
    this.setState({jadwalList: [...jadwalList]});
  }
    

  handleChange(event){
    this.props.onSelectLocation(event.target.value);
    const jadwalByLocation = this.props.klinik.length > 0 ? this.props.klinik.filter( data => data.kota === event.target.value ) :this.props.klinik.filter( data => data.kota === "Jakarta Selatan" );
    let jadwalList = this.getJadwalList(jadwalByLocation);
    this.setState({jadwalList: [...jadwalList]});
  }

  handleClick(event){
    this.setState({
      filterBy: event.currentTarget.getAttribute("data-value")
    });

    if(event.currentTarget.getAttribute("data-value") === "semua"){
      this.filterAll();
    }else if(event.currentTarget.getAttribute("data-value") === "hari ini"){
      this.filterByHariIni();
    }else if(event.currentTarget.getAttribute("data-value") === "online"){
      this.filterByBookingOnline();
    }
  }

  filterSortToggle(event){
    console.log(this.state.filterBy);
    this.setState({
      menuSelected: event.currentTarget.getAttribute("data-value")
    });
  }

  getJadwalList(arr){
    let jadwalList = [];
       
    for(let i = 0; i < arr.length; i++){    
      for(let j = 0; j < arr[i]["jadwal"].length; j++){
        let dokter = this.props.dokter.filter(data => data["id"] === arr[i]["jadwal"][j]["id_dokter"]);
        let spesialis = dokter.filter(data => data["spesialisasi"] === this.props.spesialisasi);
                
        if(spesialis.length > 0){
          jadwalList.push([dokter, arr[i]["jadwal"][j],arr[i]["nama"],arr[i]["alamat"]]);                         
        }
      }
    }
    return jadwalList;
  }

  filterAll(){
    const jadwalByLocation = this.props.klinik.length > 0 ? this.props.klinik.filter( data => data.kota === this.props.location ) :this.props.klinik.filter( data => data.kota === "Jakarta Selatan" );
    let jadwalList = this.getJadwalList(jadwalByLocation);
    this.setState({jadwalList: [...jadwalList]});
  }

  filterByHariIni(){
    const jadwalByLocation = this.props.klinik.length > 0 ? this.props.klinik.filter( data => data.kota === this.props.location ) :this.props.klinik.filter( data => data.kota === "Jakarta Selatan" );
    let jadwalList = this.getJadwalList(jadwalByLocation);

    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "JUmat", "Sabtu"];
    const d = new Date();
    // console.log(days[d.getDay()]);
    const hariIni = jadwalList.filter(data => data[1]["hari"] === days[d.getDay()]);
    this.setState({
      jadwalList: hariIni
    });
  }

  filterByBookingOnline(){
    const jadwalByLocation = this.props.klinik.length > 0 ? this.props.klinik.filter( data => data.kota === this.props.location ) :this.props.klinik.filter( data => data.kota === "Jakarta Selatan" );
    let jadwalList = this.getJadwalList(jadwalByLocation);

    console.log(jadwalList);

    const online = jadwalList.filter(data => data[0][0]["janji_online"] === "bisa");
    this.setState({
      jadwalList: online
    });
  }

  selectDokter(event){
    this.props.onSelectDokter(event.currentTarget.getAttribute("data-id"));
  }

  render() {
    console.log(this.state.jadwalList);
        
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "JUmat", "Sabtu"];
    const d = new Date();

    let menu1Class = this.state.filterBy === "semua" ? "jadwal-location__sort filter-jadwal-active" : "jadwal-location__sort";
    let menu2Class = this.state.filterBy === "hari ini" ? "jadwal-location__sort filter-jadwal-active" : "jadwal-location__sort";
    let menu3Class = this.state.filterBy === "online" ? "jadwal-location__sort filter-jadwal-active" : "jadwal-location__sort";
        
    let filter = this.state.menuSelected === "filter" ? "jadwal-location__menu__item filter-jadwal-active" : "jadwal-location__menu__item";
    let sort = this.state.menuSelected === "sort" ? "jadwal-location__menu__item filter-jadwal-active" : "jadwal-location__menu__item";

    // const jadwalByLocation = this.props.klinik.length > 0 ? this.props.klinik.filter( data => data.kota === this.props.location ) :this.props.klinik.filter( data => data.kota === 'Jakarta Selatan' );
    let jadwalList = this.state.jadwalList;

    if(jadwalList.length > 0){
      jadwalList = jadwalList.map(data => (
        <Link to="/profil">
          <div className="jadwal-praktik" data-id={data[0][0]["id"]} onClick={this.selectDokter}>
            <div className="jadwal-praktik__desc">
              <p className="jadwal-praktik__desc__nama">{data[0][0]["nama"]}</p>
              <div className="jadwal-praktik__desc__rs">
                <img className="jadwal-praktik__desc__rs__icon" src={Klinik} alt="" />
                <p className="jadwal-praktik__desc__rs__nama">{data[2]}</p>
              </div>
               
              {
                                         
                days[d.getDay()] === data[1]["hari"] ? 
                  (
                    <div className="jadwal-praktik__desc__jadwal">
                      <img className="jadwal-praktik__desc__jadwal__icon" src={Jadwal} alt=""/>
                      <p className="jadwal-praktik__desc__jadwal__jadwal" style={{color:"#43a344"}}>Praktik hari ini ({+data[1]["pukul"]}) }</p>
                    </div>  
                  ) :
                  (
                    <div className="jadwal-praktik__desc__jadwal">
                      <img className="jadwal-praktik__desc__jadwal__icon" src={JadwalGrey} alt="" />
                      <p className="jadwal-praktik__desc__jadwal__jadwal">{"Praktik "+data[1]["hari"]+" ("+data[1]["pukul"]+")" }</p>
                    </div>  
                  )
              }
                        
            </div>
            <div className="jadwal-praktik__photo-container">
              <img className="jadwal-praktik__photo" src={Grey} alt="" />
            </div>
            { (data[0][0]["janji_online"] === "bisa") ? 
              (
                <div className="jadwal-praktik__janji-online">
                  <img className="jadwal-praktik__janji-online__icon" src={JanjiOnline} alt=""/>
                  <p className="jadwal-praktik__janji-online__desc">Bisa buat janji online</p> 
                </div>
              ): (<p></p>)
            }
                        
          </div>
        </Link>
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
          {
            (this.state.menuSelected === "filter") ?
              (
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
              ) :
              (
                <div className="jadwal-location__sort-container">
                  <div className={menu1Class}>
                    <p className="jadwal-location__sort__desc" data-value="semua" onClick={this.handleClick}>Nama</p>
                  </div>
                  <div className={menu2Class}>
                    <p className="jadwal-location__sort__desc" data-value="hari ini" onClick={this.handleClick}>Hari</p>
                  </div>
                  <div className={menu3Class}>
                    <p className="jadwal-location__sort__desc" data-value="online" onClick={this.handleClick}>Jam</p>
                  </div>
                </div>
              )
          }
                    
        </div>

        <div className="jadwal-praktik__container">       
          {jadwalList}
        </div>

        <div className="jadwal-location__menu">
          <div className={filter} onClick={this.filterSortToggle} data-value="filter">
            <img className="jadwal-location__menu__item__icon" src={Filter} alt=""/>
            <p className="jadwal-location__menu__item__desc">Filter</p>
          </div>
          <div className={sort} onClick={this.filterSortToggle} data-value="sort">
            <img className="jadwal-location__menu__item__icon" src={Urutkan} alt=""/>
            <p className="jadwal-location__menu__item__desc">Urutkan</p>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    location: state.booking.selectedLocation,
    spesialisasi: state.booking.spesialisasi,
    dokter: state.booking.dokter,
    klinik: state.booking.klinik
  };
};
  
const mapDispatchToProps = (dispatch) => {
  return {
    onSelectLocation : (location) => {
      dispatch(selectLocation(location));
    },
    onFetchDokter : () => {
      dispatch(fetchingDokter());
    },
    onFetchingKlinik : () => {
      dispatch(fetchingKlinik());
    },
    onSelectDokter : (data) => {
      dispatch(selectDokter(data));
    }
  };
}; 

JadwalByLocation.propTypes = {
  location: PropTypes.string.isRequired,
  onSelectLocation: PropTypes.func.isRequired
};
  
export default connect(mapStateToProps,mapDispatchToProps)(JadwalByLocation);