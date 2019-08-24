import { FETCHING_SPESIALISASI, RECEIVED_SPESIALISASI } from './../actions/cariSpesialisasiByLocation';
import { FETCHING_DOKTER, RECEIVED_DOKTER } from './../actions/getDokter';
import { SELECT_LOCATION } from './../actions/selectLocation';
import { combineReducers } from 'redux';
import { SELECT_SPESIALISASI } from '../actions/selectSpesialisasi';
import { GET_DOKTER } from '../actions/getDokter';

const defaultState = {
    isLoading: false,
    selectedLocation: 'Jakarta Selatan',
    klinik: [],
    spesialisasi: 'Dokter Umum',
    spesialis: [],
    dokter: []
}

const bookingReducer = (state = defaultState, action) => {
  switch(action.type) {
    case FETCHING_SPESIALISASI:
      return Object.assign({}, state, { isLoading: true });
    case RECEIVED_SPESIALISASI:
      return Object.assign({}, state, { isLoading: false, klinik: [...action.payload]});
    case FETCHING_DOKTER:
      return Object.assign({}, state, { isLoading: true });
    case RECEIVED_DOKTER:
      return Object.assign({}, state, { isLoading: false, dokter: [...action.payload]});
    case SELECT_LOCATION:
      return Object.assign({}, state, { selectedLocation: action.payload});
    case SELECT_SPESIALISASI:
      return Object.assign({}, state, { spesialisasi: action.payload});
    default: 
      return state;
  }
}

const rootReducers = combineReducers({
    booking: bookingReducer
})

export default rootReducers;