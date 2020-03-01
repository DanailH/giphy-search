import React from 'react';
import { mount } from 'enzyme';
import SearchBar from './searchBar';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

it('renders without crashing', () => {
  mount(<SearchBar query={''} />);
});

it('sets the value of the input if query prop is passed', () => {
  const testSearchQuery = 'test';
  const component = mount(<SearchBar query={testSearchQuery} />);

  const searchInputValue = component.find('input').first().getDOMNode().value;

  expect(searchInputValue).toEqual(testSearchQuery);
});

it('sets the value of the search input when onChange', () => {
  const testSearchQuery = 'test';
  const event = {
    target: {
      name: 'input',
      value: testSearchQuery
    }
  };
  const component = mount(<SearchBar query={''} />);

  const inputSearchComponent = component.find('input').first();

  inputSearchComponent.simulate('change', event);

  expect(inputSearchComponent.getDOMNode().value).toEqual(testSearchQuery);
});