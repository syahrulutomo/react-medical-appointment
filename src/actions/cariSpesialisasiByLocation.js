export const FETCHING_SPESIALISASI = 'FETCHING_SPESIALISASI';
export const RECEIVED_SPESIALISASI = 'RECEIVED_SPESIALISASI';

const fetchSpesialisasi = () => {
  return {
      type: FETCHING_SPESIALISASI
  }
}

const receivedSpesialisasi = (data) => {
    return {
        type: RECEIVED_SPESIALISASI,
        payload: data
    }
}


export const fetchSpesialisasiByLocation = () => {
  return function(dispatch) {

    dispatch(fetchSpesialisasi());

    fetch('http://localhost:3001/klinik')
    .then( res => res.json() )
    .then( data => {
      const results = data;
      
      dispatch(receivedSpesialisasi(results)); 
    });

  }
}
