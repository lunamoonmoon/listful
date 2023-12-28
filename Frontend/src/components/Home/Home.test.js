import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';

describe('<Home />', () => {
  test('it should mount', () => {
    render(<Home />);
    
    const home = screen.getByTestId('Home');

    expect(home).toBeInTheDocument();
  });

  test('it should render libraries', async () => {
    render(<Home />);

    // Wait for the libraries to be rendered
    await waitFor(() => screen.getByTestId('Home'));

    // Check if libraries are rendered
    expect(screen.getByText('Fav Books')).toBeInTheDocument();
  });

  test('it should render books for each library', async () => {
    render(<Home />);

    // Wait for the libraries and books to be rendered
    await waitFor(() => screen.getByTestId('Home'));

    // Check if books are rendered for each library
    expect(screen.getByText('1984')).toBeInTheDocument();
  });
});
