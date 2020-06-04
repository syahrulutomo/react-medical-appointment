export const FETCHING_KLINIK = "FETCHING_KLINIK";
export const RECEIVED_KLINIK = "RECEIVED_KLINIK";

const fetchKlinik = () => {
  return {
    type: FETCHING_KLINIK,
  };
};

const receivedKlinik = (data) => {
  return {
    type: RECEIVED_KLINIK,
    payload: data,
  };
};


export const fetchingKlinik = () => {
  return function(dispatch) {

    dispatch(fetchKlinik());

    fetch("http://localhost:3001/klinik")
      .then( res => res.json() )
      .then( data => {
        const results = data;
      
        dispatch(receivedKlinik(results)); 
      });

  };
};
