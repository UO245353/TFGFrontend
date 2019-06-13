var CONFIG = function(isLocal, urls){

  return {
    isLocal,
    urls
  };
};

export default new CONFIG(
  false,
  {
    BACKEND_URL_BASE: 'https://gestion-ti.wave-uniovi.es:23456',
    BACKEND_URL_BASE_LOCAL: 'http://localhost:23456',
  }
);
