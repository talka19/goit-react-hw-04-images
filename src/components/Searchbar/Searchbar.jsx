import { useState } from 'react';
import css from 'components/Searchbar/Searchbar.module.css';
import PropTypes from 'prop-types';


export default function Searchbar ({onSubmit}) {

  const [searchData,setSearchData] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchData);
  };

  const handleChange = evt => {
    const { value } = evt.target;
    setSearchData(value);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
            <span className={css.label}>Search</span>
        </button>
    
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}



