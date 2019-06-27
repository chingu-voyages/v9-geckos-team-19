import teleport from "../../api/teleport";

async function onCitySubmit(city) {
  city = city.toLowerCase().replace(/ /g, "%20");
  let citySearch = await teleport.get("cities/?search=" + city);
  let cityResponseURL =
    citySearch.data["_embedded"]["city:search-results"][0]["_links"][
      "city:item"
    ]["href"];

  let idSearch = /[0-9]/g;

  let city_id = cityResponseURL.match(idSearch);
  city_id = city_id.toString().replace(/,/g, "");

  let urbanArea = await teleport.get("cities/geonameid:" + city_id);
  let urbanUrl = urbanArea.data["_links"]["city:urban_area"]["href"];
  return urbanUrl;
}

export default onCitySubmit;
