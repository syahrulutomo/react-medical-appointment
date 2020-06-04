export const FETCHING_DOKTER = "FETCHING_DOKTER";
export const RECEIVED_DOKTER = "RECEIVED_DOKTER";

const fetchDokter = () => {
  return {
    type: FETCHING_DOKTER
  };
};

const receivedDokter = (data) => {
  return {
    type: RECEIVED_DOKTER,
    payload: data
  };
};


export const fetchingDokter = () => {
  return function(dispatch) {

    dispatch(fetchDokter());

    fetch("http://localhost:3001/dokter")
      .then( res => res.json() )
      .then( data => {
        const results = data;
      
        dispatch(receivedDokter(results)); 
      });

  };
};

