import React, {
  useEffect,
  useState
} from 'react';
import PropTypes from 'prop-types';
import GalleryItem from '../../components/galleryItem/galleryItem'
import './gallery.css';

// The 500 here is used to fetch the data before hitting the bottom.
// This way the scroll of tha page to look more natural
const pageScrollOffset = 500;

// Props type validation
Gallery.propTypes = {
  images: PropTypes.array.isRequired,
  loadMoreGifs: PropTypes.func.isRequired
};

export default function Gallery({ images, loadMoreGifs }) {
  const [columnsView, setColumnsView] = useState(1);
  const isNearBottom = element => element.scrollHeight - element.scrollTop <= element.clientHeight + pageScrollOffset;

  useEffect(() => {
    const handleScroll = event => {
      const scrollElement = event.target.scrollingElement;

      if (isNearBottom(scrollElement)) {
        loadMoreGifs(images.length);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [images, loadMoreGifs]);

  const changeColumnsLayout = numberOfColumns => {
    setColumnsView(numberOfColumns);
  };

  const buildColumnsView = (images, columnsNumber = 1) => {
    if (columnsNumber === 1) {
      return images.map((image, index) => (
        <div key={index}>
          <GalleryItem itemData={image} imageType={'static'} />
        </div>
      ));
    } else {
      const columnsArr = [];

      // Make it so it handles different columns configurations, not only 1 and 3 columns
      for (let i = 0; i < columnsNumber; i++) {
        columnsArr.push([]);
      }

      let targetColumnIndex = 0;
      images.forEach(image => {
        if (targetColumnIndex < columnsNumber) {
          columnsArr[targetColumnIndex].push(image);
          targetColumnIndex++;
        } else {
          targetColumnIndex = 0;
        }
      });

      return (
        <div className='gallery-container'>
          { columnsArr.map((column, index) => (
            <div key={index} className='gallery-column'>
              { column.map((image, index) => (
                <div key={index}>
                  <GalleryItem itemData={image} imageType={'fluid'} />
                </div>
              )) }
            </div>
          )) }
        </div>
      );
    };
  };

  return (
    <div>
      <button onClick={changeColumnsLayout.bind(this, 1)} data-at='button-1-columns' className='gallery-button'>
        <i className='material-icons'>
          view_headline
        </i>
      </button>
      <button onClick={changeColumnsLayout.bind(this, 3)} data-at='button-3-columns' className='gallery-button'>
        <i className='material-icons'>
          view_column
        </i>
      </button>
      <br /><br />
      { buildColumnsView(images, columnsView) }
    </div>
  );
};
