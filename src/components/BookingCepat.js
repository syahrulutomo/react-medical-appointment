import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class BookingCepat extends Component {
    render() {
        return (
            <div>
            <h3>{this.props.lokasi}</h3>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lokasi: state.booking.selectedLocation
    }
}

export default connect(mapStateToProps,null)(BookingCepat);