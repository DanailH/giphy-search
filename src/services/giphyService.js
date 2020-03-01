import { apiKey } from '../constants';

const baseApi = 'https://api.giphy.com/v1';
const gifs = 'gifs';
const search = 'search';

const constructSearchAPI = segmentsArr => {
  return segmentsArr.join('/');
};

export const getGiphySearchResults = async (
  query = '',
  offset = 0,
  limit = 12,
  rating = 'G',
  lang = 'en'
) => {
  const gifsSearchAPI = constructSearchAPI([baseApi, gifs, search]);

  try {
    const gifsSearchResults = await fetch(`${gifsSearchAPI}?api_key=${apiKey}&q=${query}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${lang}`)
    const gifsSearchResultsPaced = await gifsSearchResults.json();

    return gifsSearchResultsPaced.data.map(imageData => ({
      title: imageData.title,
      thumbnail: {
        width: imageData.images['480w_still'].width,
        height: imageData.images['480w_still'].height,
        url: imageData.images['480w_still'].url
      },
      gif: {
        width: imageData.images.downsized.width,
        height: imageData.images.downsized.height,
        url: imageData.images.downsized.url
      }
    }));
  } catch (error) {
    return error;
  }
};