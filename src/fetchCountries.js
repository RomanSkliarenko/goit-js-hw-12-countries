const fetchCountries = function (searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(
    res => {
      return res.json();
    },
  );
};
export default fetchCountries;
