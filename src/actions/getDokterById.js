export const FETCHING_DOKTER_BY_ID = 'FETCHING_DOKTER_BY_ID';
export const RECEIVED_DOKTER_BY_ID = 'RECEIVED_DOKTER_BY_ID';

const fetchDokterById = () => {
  return {
      type: FETCHING_DOKTER_BY_ID
  }
}

const receivedDokterById = (data) => {
    return {
        type: RECEIVED_DOKTER_BY_ID,
        payload: data
    }
}

export const fetchingDokterById = (id) => {
  return function(dispatch) {

    dispatch(fetchDokterById(id));

    fetch('http://localhost:3001/dokter/'+id)
    .then( res => res.json() )
    .then( data => {
      const results = {...data};
      
      dispatch(receivedDokterById(results)); 
    });

  }
}