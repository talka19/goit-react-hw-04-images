import PropTypes from 'prop-types';
import axios from 'axios';

export default function getImages(searchData, page) {
  const response = axios.get(
    `https://pixabay.com/api/?q=${searchData}&page=${page}&key=33356007-e1ae8fd957b363ad4876a5fea&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
}

getImages.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};