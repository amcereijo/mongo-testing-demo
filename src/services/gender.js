const axios = require('axios').default;

const DEFAULT_COUNTRY = 'ES';

module.exports = (config) => {
  const baseURL = config.baseURL || 'https://api.genderize.io';
  const countryId = config.countryId || DEFAULT_COUNTRY;

  const axiosInstance = axios.create({
    baseURL,
  });

  return async function getGender(name){
    try {
      const response = await axiosInstance.get(`/?name=${name}&country_id=${countryId}`)
      return response.data.gender;
    } catch (err) {
      // do something
      return '';
    }
  };
};
