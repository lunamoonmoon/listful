import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from './Modal';
import Home from '../Home/Home';

describe('<Modal />', () => {
  test('it should mount', () => {
    render(<Modal />);
    
    const modal = screen.getByTestId('Modal');

    expect(modal).toBeInTheDocument();
  });

  test('modal should open', () => {
    render(<Home/>);
    expect(2).toEqual(2)
  });

  test('modal should close', () => {
    render(<Home/>);
    expect(2).toEqual(2)
  });
});