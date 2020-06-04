export const SEARCH_DOKTER = "SEARCH_DOKTER";

export const searchDokter = (data) => {
  return{
    type: SEARCH_DOKTER,
    payload: data,
  };
};