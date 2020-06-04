import React, { Component } from "react";
import Grey from "assets/img/grey.jpg";
import ArrowRight from "assets/img/arrow-right.png";
import ArrowLeft from "assets/img/arrow left.png";
import Share from "assets/img/share.png";
import Lokasi from "assets/img/lokasi.png";
import { connect } from "react-redux";
import { fetchingDokterById } from "actions/getDokterById";
import { fetchingKlinik } from "actions/getKlinik";
import { Link } from "react-router-dom";

class SearchedProfil extends Component {
  constructor(props){
    super(props);
    this.state = {
      showAllKeahlian: false,
      showAllPenyakit: false,
      showAllJadwal: false,
      showAllLokasi: false,
      jadwalPraktik: [],
      lokasiPraktik: []
    };
    this.showAllJadwal = this.showAllJadwal.bind(this);
    this.showAllKeahlian = this.showAllKeahlian.bind(this);
    this.showAllPenyakit = this.showAllPenyakit.bind(this);
    this.showAllLokasi = this.showAllLokasi.bind(this);
    this.getTempatPraktik = this.getTempatPraktik.bind(this);
  }

  componentDidMount(){
    this.props.onSelectDokterById(this.props.selectedDokterId);
  }

  getTempatPraktik(){
    let jadwalList = [];
    for(let i = 0; i < this.props.klinik.length; i++){    
      for(let j = 0; j < this.props.klinik[i]["jadwal"].length; j++){
        if(this.props.selectedDokter.id !== undefined){
          if(this.props.klinik[i]["jadwal"][j]["id_dokter"] === this.props.selectedDokterId){
            const temp = this.props.klinik[i];
            jadwalList.push([temp,this.props.klinik[i]["jadwal"][j]]);
          }
        } 
      }
    }
    return jadwalList;
  }

  showAllJadwal(){
    this.setState({
      showAllJadwal: !this.state.showAllJadwal
    });
  }

  showAllLokasi(){
    this.setState({
      showAllLokasi: !this.state.showAllLokasi
    });
  }

  showAllKeahlian(){
    this.setState({
      showAllKeahlian: !this.state.showAllKeahlian
    });
  }

  showAllPenyakit(){
    this.setState({
      showAllPenyakit: !this.state.showAllPenyakit
    });
  }

  render() {
    console.log(this.getTempatPraktik());
    const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
    const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "October", "November", "Desember"];
    const monthDays = [31, 28, 31, 30, 31, 30,
      31, 31, 30, 31, 30, 31];
    const d = new Date();
        
    const lokasiList = (this.getTempatPraktik().length > 0) ? this.getTempatPraktik().map( (data,index) => {
      if(this.state.showAllLokasi === true){
        return (
          <div className="profil__lokasi-praktik__item">
            <div className="profil__lokasi-praktik__item__rs">
              <p className="profil__lokasi-praktik__item__rs__nama">{data[0]["nama"]}</p>
              <img className="profil__lokasi-praktik__item__rs__icon" src={Lokasi} alt="" />
              <p className="profil__lokasi-praktik__item__rs__alamat">{data[0]["alamat"]}</p>
            </div>
            <img className="profil__lokasi-praktik__item__arrow" src={ArrowRight} alt="" />                      
          </div>
        );
      }else if(this.state.showAllLokasi === false){
        if(index > 0){
          return (
            <div className="profil__lokasi-praktik__item-hide">
              <div className="profil__lokasi-praktik__item__rs">
                <p className="profil__lokasi-praktik__item__rs__nama">{data[0]["nama"]}</p>
                <img className="profil__lokasi-praktik__item__rs__icon" src={Lokasi} alt="" />
                <p className="profil__lokasi-praktik__item__rs__alamat">{data[0]["alamat"]}</p>
              </div>
              <img className="profil__lokasi-praktik__item__arrow" src={ArrowRight} alt="" />                      
            </div>
          ); 
        }else{
          return (
            <div className="profil__lokasi-praktik__item">
              <div className="profil__lokasi-praktik__item__rs">
                <p className="profil__lokasi-praktik__item__rs__nama">{data[0]["nama"]}</p>
                <img className="profil__lokasi-praktik__item__rs__icon" src={Lokasi} alt="" />
                <p className="profil__lokasi-praktik__item__rs__alamat">{data[0]["alamat"]}</p>
              </div>
              <img className="profil__lokasi-praktik__item__arrow" src={ArrowRight} alt="" />                      
            </div>
          );
        }
      }
      return "";
    }): "";

    const jadwalList = (this.getTempatPraktik().length > 0) ? this.getTempatPraktik().map( (data, index) => {
            
      if(this.state.showAllJadwal === true){
        return (
          <div className="profil__jadwal-praktik__item">
            <p className="profil__jadwal-praktik__rs">{data[0]["nama"]}</p>
            <p className="profil__jadwal-praktik__date">
              {
                (d.getDay() === days.indexOf(data[1]["hari"])) ?
                  d.getDate()+" "+month[d.getMonth()]+" "+d.getFullYear() :
                  (Number(d.getDate()) + Number(days.indexOf(data[1]["hari"])) > monthDays[d.getMonth()]) ?
                    Number(d.getDate()) + Number(days.indexOf(data[1]["hari"])) - monthDays[d.getMonth()] +" "+month[d.getMonth()+1]+" "+d.getFullYear() :
                    Number(d.getDate()) + Number(days.indexOf(data[1]["hari"])) +" "+month[d.getMonth()]+" "+d.getFullYear()     
              }
            </p>
            <p className="profil__jadwal-praktik__jam">{data[1]["pukul"]}</p>
            {
              (data[0]["janji_online"] === "bisa") ? 
                <button className="profil__jadwal-praktik__btn">BUAT JANJI</button> :
                ""
            }
                        
          </div>
        );
      }else if(this.state.showAllJadwal === false){
        if(index > 0){
          return (
            <div className="profil__jadwal-praktik__item__hide">
              <p className="profil__jadwal-praktik__rs">{data[0]["nama"]}</p>
              <p className="profil__jadwal-praktik__date">
                {
                  (d.getDay() === days.indexOf(data[1]["hari"])) ?
                    d.getDate()+" "+month[d.getMonth()]+" "+d.getFullYear() :
                    (Number(d.getDate()) + Number(days.indexOf(data[1]["hari"])) > monthDays[d.getMonth()]) ?
                      Number(d.getDate()) + Number(days.indexOf(data[1]["hari"])) - monthDays[d.getMonth()] +" "+month[d.getMonth()+1]+" "+d.getFullYear() :
                      Number(d.getDate()) + Number(days.indexOf(data[1]["hari"])) +" "+month[d.getMonth()]+" "+d.getFullYear()     
                }
              </p>
              <p className="profil__jadwal-praktik__jam">{data[1]["pukul"]}</p>
              {
                (data[0]["janji_online"] === "bisa") ? 
                  <button className="profil__jadwal-praktik__btn">BUAT JANJI</button> :
                  ""
              }
                            
            </div>
          );
        }else{
          return (
            <div className="profil__jadwal-praktik__item">
              <p className="profil__jadwal-praktik__rs">{data[0]["nama"]}</p>
              <p className="profil__jadwal-praktik__date">
                {
                  (d.getDay() === days.indexOf(data[1]["hari"])) ?
                    d.getDate()+" "+month[d.getMonth()]+" "+d.getFullYear() :
                    (Number(d.getDate()) + Number(days.indexOf(data[1]["hari"])) > monthDays[d.getMonth()]) ?
                      Number(d.getDate()) + Number(days.indexOf(data[1]["hari"])) - monthDays[d.getMonth()] +" "+month[d.getMonth()+1]+" "+d.getFullYear() :
                      Number(d.getDate()) + Number(days.indexOf(data[1]["hari"])) +" "+month[d.getMonth()]+" "+d.getFullYear()     
                }
              </p>
              <p className="profil__jadwal-praktik__jam">{data[1]["pukul"]}</p>
              {
                (data[0]["janji_online"] === "bisa") ? 
                  <button className="profil__jadwal-praktik__btn">BUAT JANJI</button> :
                  ""
              }
                            
            </div>
          );
        }
      }

      return "";
    }): "";
        
    const keahlianList = (this.props.selectedDokter.id !== undefined) ? this.props.selectedDokter.keahlian.map((data,index) => {
      if(this.state.showAllKeahlian === false){
        if(index < 3){
          return (
            <div className="profil__keahlian__item">
              <p className="profil__keahlian__item__desc">{data}</p>         
            </div>
          );
        }else{
          return (
            (
              <div className="profil__keahlian__item-hide">
                <p className="profil__keahlian__item__desc">{data}</p>         
              </div>
            )
          );
        }
      }else{
        return (
          <div className="profil__keahlian__item">
            <p className="profil__keahlian__item__desc">{data}</p>         
          </div>
        );   
      }        
    }) : "";

    const penyakitList = (this.props.selectedDokter.id !== undefined) ? this.props.selectedDokter["penyakit_terkait"].map((data,index) => {
      if(this.state.showAllPenyakit === false){
        if(index < 3){
          return (
            <div className="profil__penyakit__item">
              <p className="profil__penyakit__item__desc">{data}</p>         
            </div>
          );
        }else{
          return (
            (
              <div className="profil__penyakit__item-hide">
                <p className="profil__penyakit__item__desc">{data}</p>         
              </div>
            )
          );
        }
      }else{
        return (
          <div className="profil__penyakit__item">
            <p className="profil__penyakit__item__desc">{data}</p>         
          </div>
        );   
      }        
    }) : "";

    return (
      <div className="profil">
        <div className="icon-container">
          <Link to="/jadwal"><img className="arrow" src={ArrowLeft} alt=""/></Link>
          <img className="share" src={Share} alt=""/>
        </div>
        <div className="profil__info">
          <div className="profil__info__desc">
            <p className="profil__info__desc__nama">{this.props.selectedDokter.nama}</p>
            <p className="profil__info__desc__sex">{this.props.selectedDokter.gender}</p>
          </div>
          <img className="profil__info__foto" src={Grey} alt=""/>
        </div>
        <p className="jadwal-praktik-terdekat">Jadwal Praktik Terdekat</p>
        <div className="profil__jadwal-praktik">
          {
            jadwalList
          }
          <div className="profil__jadwal-praktik__extra">
            <p className="profil__jadwal-praktik__extra__desc" onClick={this.showAllJadwal}>Lihat Semua</p>
            <img className="profil__jadwal-praktik__extra__arrow" src={ArrowRight} alt=""/>
          </div>                     
        </div>
        <p className="profil__lokasi-praktik__title">Lokasi Praktik</p>
        <div className="profil__lokasi-praktik">
          {
            lokasiList
          }
          <div className="profil__lokasi-praktik__extra">
            <p className="profil__lokasi-praktik__extra__desc" onClick={this.showAllLokasi}>Lihat Semua</p>
            <img className="profil__lokasi-praktik__extra__arrow" src={ArrowRight} alt=""/>
          </div>   
        </div>
        <p className="profil__keahlian__title">Keahlian</p>
        <div className="profil__keahlian">
          {
            keahlianList
          }
                    
          <div className="profil__keahlian__extra">
            <p className="profil__keahlian__extra__desc" onClick={this.showAllKeahlian}>Lihat Semua</p>
            <img className="profil__keahlian__extra__arrow" src={ArrowRight} alt=""/>
          </div>   
        </div>
        <p className="profil__penyakit__title">Penyakit Terkait</p>
        <div className="profil__penyakit">
          { 
            penyakitList
          }
          <div className="profil__penyakit__extra">
            <p className="profil__penyakit__extra__desc" onClick={this.showAllPenyakit}>Lihat Semua</p>
            <img className="profil__penyakit__extra__arrow" src={ArrowRight} alt=""/>
          </div>   
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    selectedDokterId: state.booking.selectedDokterId,
    selectedDokter: state.booking.selectedDokter,
    klinik: state.booking.klinik
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectDokterById: (id) => {
      dispatch(fetchingDokterById(id));
    },
    onFetchingKlinik: () => {
      dispatch(fetchingKlinik());
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(SearchedProfil);