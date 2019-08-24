import React, { Component } from 'react';
import Grey from './../img/grey.jpg';
import ArrowRight from './../img/arrow-right.png';
import ArrowLeft from './../img/arrow left.png';
import Share from './../img/share.png';
import { connect } from 'react-redux';
import { fetchingDokterById } from './../actions/getDokterById';
import { fetchingKlinik } from '../actions/getKlinik';
import { Link } from 'react-router-dom';

export class ProfilDokter extends Component {
    constructor(props){
        super(props);
        this.state = {
            showAllKeahlian: false,
            showAllPenyakit: false,
        }
        this.showAllKeahlian = this.showAllKeahlian.bind(this);
        this.showAllPenyakit = this.showAllPenyakit.bind(this);
        this.getTempatPraktik = this.getTempatPraktik.bind(this);
    }

    componentDidMount(){
        this.props.onSelectDokterById(this.props.selectedDokterId);
    }

    getTempatPraktik(){
        
    }

    showAllKeahlian(){
        this.setState({
            showAllKeahlian: !this.state.showAllKeahlian
        })
    }

    showAllPenyakit(){
        this.setState({
            showAllPenyakit: !this.state.showAllPenyakit
        })
    }

    render() {
        console.log(this.props.selectedDokterId);
        console.log(this.props.selectedDokter);
        console.log(this.props.klinik);

        const keahlianList = (this.props.selectedDokter.id !== undefined) ? this.props.selectedDokter.keahlian.map((data,index) => {
            if(this.state.showAllKeahlian === false){
                if(index < 3){
                    return (
                        <div className="profil__keahlian__item">
                            <p className="profil__keahlian__item__desc">{data}</p>         
                        </div>
                    )
                }else{
                    return (
                        (
                            <div className="profil__keahlian__item-hide">
                                <p className="profil__keahlian__item__desc">{data}</p>         
                            </div>
                        )
                    )
                }
            }else{
                return (
                    <div className="profil__keahlian__item">
                        <p className="profil__keahlian__item__desc">{data}</p>         
                    </div>
                    )   
            }        
        }) : '';

        const penyakitList = (this.props.selectedDokter.id !== undefined) ? this.props.selectedDokter['penyakit_terkait'].map((data,index) => {
            if(this.state.showAllPenyakit === false){
                if(index < 3){
                    return (
                        <div className="profil__penyakit__item">
                            <p className="profil__penyakit__item__desc">{data}</p>         
                        </div>
                    )
                }else{
                    return (
                        (
                            <div className="profil__penyakit__item-hide">
                                <p className="profil__penyakit__item__desc">{data}</p>         
                            </div>
                        )
                    )
                }
            }else{
                return (
                    <div className="profil__penyakit__item">
                        <p className="profil__penyakit__item__desc">{data}</p>         
                    </div>
                    )   
            }        
        }) : '';

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
                    <div className="profil__jadwal-praktik__item">
                        <p className="profil__jadwal-praktik__rs">Rumah Sakit Pusat Pertamina</p>
                        <p className="profil__jadwal-praktik__date">Kamis, 10 Juni 2018</p>
                        <p className="profil__jadwal-praktik__jam">10.00 - 12.00</p>
                        <button className="profil__jadwal-praktik__btn">BUAT JANJI</button>
                    </div>
                    <div className="profil__jadwal-praktik__extra">
                        <p className="profil__jadwal-praktik__extra__desc">Lihat Semua</p>
                        <img className="profil__jadwal-praktik__extra__arrow" src={ArrowRight} alt=""/>
                    </div>                     
                </div>
                <p className="jadwal-praktik-terdekat">Lokasi Praktik</p>
                <div className="profil__lokasi-praktik">
                    <div className="profil__jadwal-praktik__item">
                        <p className="profil__jadwal-praktik__rs">Rumah Sakit Pusat Pertamina</p>
                        <p className="profil__jadwal-praktik__date">Kamis, 10 Juni 2018</p>
                        <p className="profil__jadwal-praktik__jam">10.00 - 12.00</p>
                        <button className="profil__jadwal-praktik__btn">BUAT JANJI</button>
                    </div>
                    <div className="profil__jadwal-praktik__extra">
                        <p className="profil__jadwal-praktik__extra__desc">Lihat Semua</p>
                        <img className="profil__jadwal-praktik__extra__arrow" src={ArrowRight} alt=""/>
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
        )
    }
}

const mapStateToProps = (state) => {
    return{
        selectedDokterId: state.booking.selectedDokterId,
        selectedDokter: state.booking.selectedDokter,
        klinik: state.booking.klinik
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectDokterById: (id) => {
            dispatch(fetchingDokterById(id))
        },
        onFetchingKlinik: () => {
            dispatch(fetchingKlinik())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfilDokter);