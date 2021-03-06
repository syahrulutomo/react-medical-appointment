import React, { Component } from "react";
import ArrowLeft from "assets/img/arrow left.png";
import SearchIcon from "assets/img/search icon.png";
import ArrowRight from "assets/img/arrow-right.png";
import { fetchingKlinik } from "actions/getKlinik";
import { selectSpesialisasi } from "actions/selectSpesialisasi";
import { fetchingDokter } from "actions/getDokter";
import { selectLocation } from "actions/selectLocation";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SuggestionInputSearch from "suggestion-react-input-search";
import { searchDokter } from "actions/searchDokter";
import { selectDokter } from "actions/selectDokter"; 
import { Link } from "react-router-dom";

class SpesialisasiByLocation extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchText: ""
    };
    this.getSpesialisasiList = this.getSpesialisasiList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount(){
    this.props.onFetchDokter();
    this.props.onFetchingKlinik();
  }

  handleChange(event){
    this.props.onSelectLocation(event.target.value);
  }

  handleClick(event){
    this.props.onSelectSpesialisasi(event.currentTarget.getAttribute("data-spesialisasi"));
  }

  handleOnSubmit(term) {
    console.log(term);
    this.setState({
      searchText: term
    });
  }

  handleSearch(){
    const id = this.props.dokter.filter(data => data.nama.toLowerCase() === this.state.searchText).map(data => data.id);
    this.props.onSelectDokter(id);
        
    fetch("http://localhost:3001/dokter?id="+id[0])
      .then(res => res.json())
      .then(data => this.props.onSearchDokter(data)); 
  }

  // get spesialisasi data
  getSpesialisasiList(arr){
    const idDokters = [];
    let spesialisasiList = [];
        
    // get dokters's id from state dokterList where location is match  
    for(let i = 0; i < arr.length; i++){
      for(let j = 0; j < arr[i]["jadwal"].length; j++){
        idDokters.push(arr[i]["jadwal"][j]);
      }
    }

    // get mapped data spesialisasi and keahlian
    for(let i = 0; i < idDokters.length; i++){
      const selectedSpesialisasi = this.props.dokter.filter( data => data.id === idDokters[i]["id_dokter"] ).map( data => data["spesialisasi"]); 
      const keahlian = this.props.dokter.filter( data => data.id === idDokters[i]["id_dokter"] ).map( data => data["keahlian"]);
      const ids = this.props.dokter.filter( data => data.id === idDokters[i]["id_dokter"] ).map( data => data["id"]);
            
      selectedSpesialisasi.push(...keahlian);
      selectedSpesialisasi.push(...ids);
      spesialisasiList.push(selectedSpesialisasi);
    }

    // filter redundant data with same spesialisasi
    let unique = [];
    let newArr = [];

    for(let i = 0; i < spesialisasiList.length; i++){
      if(unique.indexOf(spesialisasiList[i][0])  === -1 ){
        newArr.push(spesialisasiList[i]);
        unique.push(spesialisasiList[i][0]);
      }
    }
        
    return newArr;
  }

  render() {
    console.log(this.props.selectedDokter);
    const recentSearches = this.props.dokter.length > 0 ? this.props.dokter.map(data => data.nama) : ["tunggu sebentar.."];
    const spesialisasiByLocation = this.props.klinik.length > 0 ? this.props.klinik.filter( data => data.kota === this.props.location ) :this.props.klinik.filter( data => data.kota === "Jakarta Selatan" );
    let list = [];
    if(this.props.dokter.length > 0){
      list = [...this.getSpesialisasiList(spesialisasiByLocation)];
    }
        
    const listSpesialisasi = list.map( data => (
      <Link key={data[2]} to='/jadwal'>
        <div
          data-spesialisasi={data[0]}
          onClick={this.handleClick} 
          className="spesialisasi">              
          <div className="spesialisasi__item" >
            <p className="spesialisasi__item__title">{data[0]}</p>        
            <p className="spesialisasi__item__desc">{data[1][0]}</p>
            <p className="spesialisasi__item__desc">{data[1][1]}</p>     
          </div>
          <img className="spesialisasi__item__arrow" src={ArrowRight} alt="" />
        </div>
      </Link>
    ));
        
    return (
      <div className="cari-dokter__container">
        <div className="cari-dokter">
          <Link className="icon-back__link" to="/"><img className="icon-back" src={ArrowLeft} alt="" /></Link>
          <div className="cari-dokter__location">
            <p className="cari-dokter__title">Dokter di sekitar</p>
            <select className="select-kota" onChange={this.handleChange} value={this.props.location}>
              <option className="select-kota__option" value="Jakarta Selatan">Jakarta Selatan</option>
              <option className="select-kota__option" value="Jakarta Timur">Jakarta Timur</option>
              <option className="select-kota__option" value="Jakarta Pusat">Jakarta Pusat</option>
              <option className="select-kota__option" value="Jakarta Barat">Jakarta Barat</option>
              <option className="select-kota__option" value="Jakarta Utara">Jakarta Utara</option>
            </select>
          </div>
          <div className="search-container">
            <Link to="/searched-profil"><img className="search-icon" src={SearchIcon} alt="" onClick={this.handleSearch}/></Link>
            {
              this.props.dokter.length > 0 ? (
                <SuggestionInputSearch
                  onSubmitFunction={this.handleOnSubmit}
                  recentSearches={recentSearches}
                  placeholder="Cari nama dokter"
                  inputPosition='start'
                />
              ) : ""
            }
                        
            {/* <input className="searchbox" placeholder="Cari nama dokter"/> */}
          </div>       
        </div>

        <p className="cari-dokter__spesialisasi">Spesialisasi Dokter</p>
        <div className="spesialisasi-container">
          { listSpesialisasi }
        </div>
                
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    klinik: state.booking.klinik,
    location: state.booking.selectedLocation,
    spesialisasi: state.booking.spesialisasi,
    dokter: state.booking.dokter,
    selectedDokter: state.booking.selectedDokter
  };
};
  
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchingKlinik : () => {
      dispatch(fetchingKlinik());
    },
    onSelectLocation : (location) => {
      dispatch(selectLocation(location));
    },
    onSelectSpesialisasi : (spesialisasi) => {
      dispatch(selectSpesialisasi(spesialisasi));
    },
    onFetchDokter: () => {
      dispatch(fetchingDokter());
    },
    onSearchDokter: (data) => {
      dispatch(searchDokter(data));
    },
    onSelectDokter : (data) => {
      dispatch(selectDokter(data));
    }
  };
}; 

SpesialisasiByLocation.propTypes = {
  klinik: PropTypes.array.isRequired,
  location: PropTypes.string.isRequired,
  dokter: PropTypes.array.isRequired,
  onFetchingKlinik: PropTypes.func.isRequired,
  onSelectLocation: PropTypes.func.isRequired,
  onSelectSpesialisasi: PropTypes.func.isRequired
};
  
export default connect(mapStateToProps,mapDispatchToProps)(SpesialisasiByLocation);