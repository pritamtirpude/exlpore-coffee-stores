import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latlong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latlong}&query=${query}&limit=${limit}`;
};

const getListOfCoffeePhotosUrls = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shops",
    perPage: 40,
  });

  const photosResults = photos.response.results;
  return photosResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (
  latlong = "21.13979495204137,79.06305103597819",
  limit = 6
) => {
  const photos = await getListOfCoffeePhotosUrls();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(latlong, "coffee shops", limit),
    options
  );

  const data = await response.json();

  const transformedData =
    data?.results?.map((places, index) => {
      const neighbourhood = places.location.neighborhood;
      return {
        id: places.fsq_id,
        address: places.location.address || " ",
        name: places.name,
        neighbourhood:
          (neighbourhood && neighbourhood.length > 0 && neighbourhood[0]) ||
          places.location.cross_street ||
          "",
        imgUrl: photos[index],
      };
    }) || [];

  return transformedData;
};
