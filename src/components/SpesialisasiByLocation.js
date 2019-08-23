import React, { Component } from 'react';
import ArrowLeft from './../img/arrow left.png';
import SearchIcon from './../img/search icon.png';
import ArrowRight from './../img/arrow-right.png';
import { fetchSpesialisasiByLocation } from '../actions/cariSpesialisasiByLocation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export class SpesialisasiByLocation extends Component {
    constructor(props){
        super(props);
        this.state = {
            dokterList: [],
            spesialisasiList: [] 
        }
        this.getDokterList = this.getDokterList.bind(this);
        this.getSpesialisasiList = this.getSpesialisasiList.bind(this);
    }

    componentDidMount(){
        this.getDokterList();
        this.props.onFetchSpesialisasi();
        
    }

    // get all dokter list
    getDokterList(){
        fetch('http://localhost:3001/dokter')
        .then(res => res.json())
        .then(data => { this.setState({ dokterList: [...data] }) })
    }

    // get spesialisasi data
    getSpesialisasiList(arr){
        const idDokters = [];
        let spesialisasiList = [];
        
        // get dokters's id from state dokterList where location is match  
        for(let i = 0; i < arr.length; i++){
            for(let j = 0; j < arr[i]['jadwal'].length; j++){
                idDokters.push(arr[i]['jadwal'][j]);
            }
        }

        // get mapped data spesialisasi and keahlian
        for(let i = 0; i < idDokters.length; i++){
            const selectedSpesialisasi = this.state.dokterList.filter( data => data.id === idDokters[i]['id_dokter'] ).map( data => data['spesialisasi']); 
            const keahlian = this.state.dokterList.filter( data => data.id === idDokters[i]['id_dokter'] ).map( data => data['keahlian']);
            selectedSpesialisasi.push(...keahlian);
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
        const spesialisasiByLocation = this.props.klinik.filter( data => data.kota === 'Jakarta Selatan' );
        let list = [];
        if(this.state.dokterList.length > 0){
            list = [...this.getSpesialisasiList(spesialisasiByLocation)];
        }

        const listSpesialisasi = list.map( data => (
            <div className="spesialisasi__container">
                    <div className="spesialisasi__item">
                        <p className="spesialisasi__item__title">{data[0]}</p>        
                        <p className="spesialisasi__item__desc">{data[1][0]}</p>
                        <p className="spesialisasi__item__desc">{data[1][1]}</p>     
                    </div>
                    <img className="spesialisasi__item__arrow" src={ArrowRight} alt="" />
                </div>
        ))
        
        return (
            <div className="cari-dokter__container">
                <div className="cari-dokter">
                    <img className="icon-back" src={ArrowLeft} alt="" />
                    <div className="cari-dokter__location">
                        <p className="cari-dokter__title">Dokter di sekitar</p>
                        <select className="select-kota">
                            <option className="select-kota__option">Jakarta Selatan</option>
                            <option className="select-kota__option">Jakarta Timur</option>
                            <option className="select-kota__option">Jakarta Pusat</option>
                            <option className="select-kota__option">Jakarta Barat</option>
                            <option className="select-kota__option">Jakarta Utara</option>
                        </select>
                    </div>
                    <div className="search-container">
                        <img className="search-icon" src={SearchIcon} alt=""/>
                        <input className="searchbox" placeholder="Cari nama dokter"/>
                    </div>       
                </div>

                <p className="cari-dokter__spesialisasi">Spesialisasi Dokter</p>

                { listSpesialisasi }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
      klinik: state.booking.klinik,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onFetchSpesialisasi : () => {
        dispatch(fetchSpesialisasiByLocation())
      }
    }
  } 
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(SpesialisasiByLocation);