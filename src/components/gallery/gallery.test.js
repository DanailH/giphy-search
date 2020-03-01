import React from 'react';
import { mount } from 'enzyme';
import Gallery from './gallery';

const imagesMock = [
  {
    title: 'Test',
    thumbnail: {
      width: 0,
      height: 0,
      url: ''
    },
    gif: {
      width: 0,
      height: 0,
      url: ''
    },
  }
];

it('renders without crashing', () => {
  mount(<Gallery images={[]} loadMoreGifs={() => {}}/>);
});

it('renders two GaleryItam components when passed data of 1 gif', () => {
  const component = mount(<Gallery images={imagesMock} loadMoreGifs={() => {}}/>);

  const galeryItem = component.find('GalleryItem').length;

  expect(galeryItem).toEqual(1);
});

it('renders images in 1 column by default', () => {
  const component = mount(<Gallery images={imagesMock} loadMoreGifs={() => {}}/>);

  const galeryContainer = component.find('.gallery-container').exists();

  expect(galeryContainer).toBeFalsy();
});

it('renders images in 3 column when button is clicked', () => {
  const component = mount(<Gallery images={imagesMock} loadMoreGifs={() => {}}/>);

  const button3Columns = component.find('[data-at="button-3-columns"]');
  button3Columns.simulate('click');

  const galeryContainer = component.find('.gallery-container').exists();

  expect(galeryContainer).toBeTruthy();
});