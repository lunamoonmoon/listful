import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AboutPage from './AboutPage';

describe('<AboutPage />', () => {
  test('it should mount', () => {
    render(<AboutPage />);
    
    const aboutPage = screen.getByTestId('AboutPage');

    expect(aboutPage).toBeInTheDocument();
  });
});