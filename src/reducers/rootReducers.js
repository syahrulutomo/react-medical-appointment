import { FETCHING_SPESIALISASI, RECEIVED_SPESIALISASI } from './../actions/cariSpesialisasiByLocation';
import { combineReducers } from 'redux';

const defaultState = {
    isLoading: false,
    selectedLocation: 'Jakarta Selatan',
    klinik: [],
    spesialisasi: '',
}

const bookingReducer = (state = defaultState, action) => {
  switch(action.type) {
    case FETCHING_SPESIALISASI:
      return Object.assign({}, state, { isLoading: true });
    case RECEIVED_SPESIALISASI:
      return Object.assign({}, state, { isLoading: false, klinik: [...action.payload]});
    default: 
      return state;
  }
}

const rootReducers = combineReducers({
    booking: bookingReducer
})

export default rootReducers;