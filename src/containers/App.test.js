import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

it('renders without crashing', () => {
  mount(
    <MemoryRouter initialEntries={['/q=test']}>
      <App
        location={{
          pathname: '/q=test'
        }}
        history={{}}
        match={{}}
      />
    </MemoryRouter>
  );
});

it('renders SearchBar component', () => {
  const component = mount(
    <MemoryRouter initialEntries={['/q=test']}>
      <App
        location={{
          pathname: '/q=test'
        }}
        history={{}}
        match={{}}
      />
    </MemoryRouter>
  );

  expect(component.find('SearchBar')).toBeTruthy();
});

it('renders Gallery component', () => {
  const component = mount(
    <MemoryRouter initialEntries={['/q=test']}>
      <App
        location={{
          pathname: '/q=test'
        }}
        history={{}}
        match={{}}
      />
    </MemoryRouter>
  );

  expect(component.find('Gallery')).toBeTruthy();
});