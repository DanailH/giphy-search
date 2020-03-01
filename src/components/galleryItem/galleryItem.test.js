import React from 'react';
import { mount } from 'enzyme';
import GalleryItem from './galleryItem';

const imagesMock = {
    title: 'Test',
    thumbnail: {
        width: 0,
        height: 0,
        url: 'still'
    },
    gif: {
        width: 0,
        height: 0,
        url: 'dynamic'
    },
};

it('renders without crashing', () => {
  mount(<GalleryItem itemData={imagesMock} imageType={''} />);
});

it('adds "img-static" class to image if imageType is "static"', () => {
  const component = mount(<GalleryItem itemData={imagesMock} imageType={'static'} />);

  const imgElement = component.find('img').first();

  expect(imgElement.hasClass('img-static')).toBeTruthy();
});

it('adds "img-fluid" class to image if imageType is "static"', () => {
  const component = mount(<GalleryItem itemData={imagesMock} imageType={'fluid'} />);

  const imgElement = component.find('img').first();

  expect(imgElement.hasClass('img-fluid')).toBeTruthy();
});