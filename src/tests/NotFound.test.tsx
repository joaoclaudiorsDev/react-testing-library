import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

test('renders h2 with text "Page requested not found"', () => {
  render(<NotFound />);
  const headingElement = screen.getByRole('heading', { level: 2, name: /Page requested not found/i });
  expect(headingElement).toBeInTheDocument();
});

test('renders the correct image', () => {
  render(<NotFound />);
  const pokeImage = screen.getByAltText(/Pikachu crying because the page requested was not found/i);
  expect(pokeImage).toHaveAttribute(
    'src',
    'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  );
});
