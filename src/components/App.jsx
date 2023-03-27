import { useState, useEffect } from "react";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Modal from "components/Modal/Modal";
import Searchbar from "components/Searchbar/Searchbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import getImages from 'services/imgApi';
import css from "../styles.css"

export default function App() {
  const [searchData, setSearchData] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hits, setHits] = useState(0);
    // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!page) {
      return;
    }

    try {
      setIsLoading(true);
      const response = getImages(searchData, page);
      response.then(data => {
        data.data.hits.length === 0
          ? toast.error('Nothing found')
          : data.data.hits.forEach(({ id, webformatURL, largeImageURL }) => {
              !images.some(image => image.id === id) &&
                setImages(i => [...i, { id, webformatURL, largeImageURL }]);
            });
          setHits(data.data.hits.length); 
        setIsLoading(false);
      });
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, [page, searchData, images]);

  const onSubmit = newSearchData => {
    if (newSearchData.trim() === '') {
      return toast.error('Enter the meaning for search');
    } else if (newSearchData === searchData) {
      return;
    }
    setSearchData(newSearchData);
    setPage(1);
    setImages([]);
  };

  const nextPage = () => {
    setPage(p => p + 1);
  };

  const openModal = index => {
    setShowModal(true);
    setLargeImage(images[index].largeImageURL);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      {images.length !== 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {showModal && <Modal toggleModal={toggleModal} largeImage={largeImage} />}
      {isLoading && <Loader />}
      <ToastContainer autoClose={2500} />
      {hits >= 12 && <Button nextPage={nextPage} />}
    </div>
  );
}