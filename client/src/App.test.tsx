import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders take a hike link', () => {
  render(<App />);
  const linkElement = screen.getByText(/take a hike/i);
  expect(linkElement).toBeInTheDocument();
});
