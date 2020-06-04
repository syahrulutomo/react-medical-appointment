import { FETCHING_KLINIK, RECEIVED_KLINIK, } from "./../actions/getKlinik";
import { FETCHING_DOKTER, RECEIVED_DOKTER, } from "./../actions/getDokter";
import { FETCHING_DOKTER_BY_ID, RECEIVED_DOKTER_BY_ID, } from "./../actions/getDokterById";
import { SELECT_LOCATION, } from "./../actions/selectLocation";
import { combineReducers, } from "redux";
import { SELECT_SPESIALISASI, } from "../actions/selectSpesialisasi";
import { SELECT_DOKTER, } from "../actions/selectDokter";
import { SEARCH_DOKTER, } from "../actions/searchDokter";

const defaultState = {
  isLoading: false,
  selectedLocation: "Jakarta Selatan",
  selectedDokterId: "",
  selectedDokter: {},
  klinik: [],
  spesialisasi: "Dokter Umum",
  spesialis: [],
  dokter: [],
};

const bookingReducer = (state = defaultState, action) => {
  switch(action.type) {
  case FETCHING_KLINIK:
    return Object.assign({}, state, { isLoading: true, });
  case RECEIVED_KLINIK:
    return Object.assign({}, state, { isLoading: false, klinik: [...action.payload,],});
  case FETCHING_DOKTER:
    return Object.assign({}, state, { isLoading: true, });
  case RECEIVED_DOKTER:
    return Object.assign({}, state, { isLoading: false, dokter: [...action.payload,],});
  case FETCHING_DOKTER_BY_ID:
    return Object.assign({}, state, { isLoading: true, });
  case RECEIVED_DOKTER_BY_ID:
    return Object.assign({}, state, { isLoading: false, selectedDokter: {...action.payload,}, });
  case SELECT_LOCATION:
    return Object.assign({}, state, { selectedLocation: action.payload,});
  case SELECT_SPESIALISASI:
    return Object.assign({}, state, { spesialisasi: action.payload,});
  case SELECT_DOKTER:
    return Object.assign({}, state, { selectedDokterId: action.payload,});
  case SEARCH_DOKTER:
    return Object.assign({}, state, { selectedDokter: {...action.payload,}, });
  default: 
    return state;
  }
};

const rootReducers = combineReducers({
  booking: bookingReducer,
});

export default rootReducers;