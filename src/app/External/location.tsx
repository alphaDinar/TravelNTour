import axios from 'axios';

export const getCountryFromCoordinates = async (lat: number, lon: number) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat.toString()}%2C${lon.toString()}&key=30a6c8519a7548aa946e8d552bab3cdb`;
  const response = await axios.get(url)

  console.log(response.data['results'][0]['components']['country'])
  return response.data['results'][0]['components']['country'].toLowerCase();
}

export const getZoneFromCoordinates = async (lat: number, lon: number) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat.toString()}%2C${lon.toString()}&key=30a6c8519a7548aa946e8d552bab3cdb`;
  const response = await axios.get(url)

  const country = response.data['results'][0]['components']['country'].toLowerCase();
  const continent = response.data['results'][0]['components']['continent'].toLowerCase()

  return { country: country, continent: continent };
}