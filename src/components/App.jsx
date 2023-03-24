import React, { Component } from "react";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Modal from "components/Modal/Modal";
import Searchbar from "components/Searchbar/Searchbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import getImages from 'services/imgApi';
import css from "../styles.css"

class App extends Component {

  state = {
    inputValue: '',
    images: [],
    page: 0,
    largeImage: '',
    showModal: false,
    isLoading: false,
    error: null,
    hits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const prevInputValue = prevState.inputValue;
    const { inputValue, page, images } = this.state;
    if (prevPage !== page || prevInputValue !== inputValue) {
      try {
        this.setState({ isLoading: true });
        const response = getImages(inputValue, page);
        response.then(data => {
          data.data.hits.length === 0
            ? toast.error('Nothing found')
            : data.data.hits.forEach(({ id, webformatURL, largeImageURL }) => {
                !images.some(image => image.id === id) &&
                  this.setState(({ images }) => ({
                    images: [...images, { id, webformatURL, largeImageURL }],
                  }));
                  this.setState({hits: data.data.hits.length})
              });
          this.setState({ isLoading: false });
        });
      } catch (error) {
        this.setState({ error, isLoading: false });
      } finally {
      }
    }
  }
  onSubmit = inputValue => {
    if (inputValue.trim() === '') {
      return toast.error('Enter the meaning for search');
    } else if (inputValue === this.state.inputValue) {
      return;
    }
    this.setState({
      inputValue: inputValue,
      page: 1,
      images: [],
    });
  };

  nextPage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  openModal = index => {
    this.setState(({ images }) => ({
      showModal: true,
      largeImage: images[index].largeImageURL,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { toggleModal, openModal, nextPage, onSubmit } = this;
    const { images, isLoading, largeImage, showModal, hits } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={onSubmit} />
        {images.length !== 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}
        {showModal && (
          <Modal toggleModal={toggleModal} largeImage={largeImage} />
        )}
        {isLoading && <Loader />}
        <ToastContainer autoClose={2500} />
        {hits >= 12 && <Button nextPage={nextPage} />}
      </div>
    );
  }
}
export default App;