import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Searchbar from './Searchbar';

describe('<Searchbar />', () => {
  test('it should mount', () => {
    render(<Searchbar />);
    
    const searchbar = screen.getByTestId('Searchbar');

    expect(searchbar).toBeInTheDocument();
  });
});