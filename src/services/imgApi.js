// export default async function getImages(inputValue, page = 1) {
//     const url = 'https://pixabay.com/api/';
//     const API_KEY = '33356007-e1ae8fd957b363ad4876a5fea';

//     return await fetch(`${url}?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
//         .then(res => res.json());
// }

import PropTypes from 'prop-types';
import axios from 'axios';

export default function getImages(inputValue, page) {
  const response = axios.get(
    `https://pixabay.com/api/?q=${inputValue}&page=${page}&key=33356007-e1ae8fd957b363ad4876a5fea&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
}

getImages.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};