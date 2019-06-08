import axios from "axios";

export default axios.create({
  baseURL: 'https://api.teleport.org/api/'
});



// export async function getCityApi(cityname){
//   //first part of the Api extract basic data about the city, such as population, location
// const searchUrl =
//             "https://api.teleport.org/api/cities/?search=" + cityname; 
//  const res1 = await axios.get(searchUrl)
//         .then((response) => {

//         const cityUrl = response.data["_embedded"]["city:search-results"][0][
//           "_links"
//         ]["city:item"]["href"];
//         console.log(cityUrl); //remove after testing
//         return axios.get(cityUrl);
//       });


//  //second part of the Api extract urban scores
// const urUrl = res1.data["_links"]["city:urban_area"]["href"];

// const res2 = await
// axios.get(urUrl)
// .then(response => {
//       this.response = response.data;
//       const scoreUrl = this.response["_links"]["ua:scores"]["href"];
//       return axios.get(scoreUrl);
//     })

// //return an object with all city data.
// const urbanscores = res2.data.categories;
// const geohash = res1.data.location.geohash;
// const population = res1.data.population;
// const lat = res1.data.location.latlon.latitude;
// const lgn = res1.data.location.latlon.longitude;
// const name = res1.data.name;
// return {
//   name:name,
//   population:population,
//   urbanscores:urbanscores,
//   geohash:geohash,
//   lat:lat,
//   lgn:lgn
//   };
// }

