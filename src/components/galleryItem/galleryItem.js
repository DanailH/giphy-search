import React from 'react';
import PropTypes from 'prop-types';
import './galleryItem.css';

// Props type validation
GalleryItem.propTypes = {
  itemData: PropTypes.object.isRequired,
  imageType: PropTypes.string.isRequired
};

export default function GalleryItem({ itemData, imageType }) {
  const handleMouseEnter = event => {
    event.target.src = itemData.gif.url;
  };

  const handleMouseLeave = event => {
    event.target.src = itemData.thumbnail.url;
  };

  return (
    <img
      src={itemData.thumbnail.url}
      alt={itemData.title}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`gallery-item img-${imageType}`}
    />
  );
};
