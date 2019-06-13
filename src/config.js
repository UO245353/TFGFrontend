var CONFIG = function(isLocal, urls){

  return {
    isLocal,
    urls
  };
};

export default new CONFIG(
  true,
  {
    BACKEND_URL_BASE: 'https://gestion-ti.wave-uniovi.es',
    BACKEND_URL_BASE_LOCAL: 'http://localhost:23456',
  }
);
