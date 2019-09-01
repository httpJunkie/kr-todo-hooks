import React from 'react';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";

import Home from './Home';

it('renders', () => {
  const { asFragment } = render(<Home text="State Management and React Hooks Demo" />);
  expect(asFragment()).toMatchSnapshot();
});
