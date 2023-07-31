import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('o topo da aplicação contém um conjunto fixo de links de navegação', async () => {
  renderWithRouter(<App />, { route: '/' });

  const linkToHome = screen.getByRole('link', { name: /home/i });
  expect(linkToHome).toBeInTheDocument();
  expect(linkToHome).toHaveAttribute('href', '/');

  const linkToAbout = screen.getByRole('link', { name: /about/i });
  expect(linkToAbout).toBeInTheDocument();
  expect(linkToAbout).toHaveAttribute('href', '/about');

  const linkToFavorites = screen.getByRole('link', { name: /favorite pokémon/i });
  expect(linkToFavorites).toBeInTheDocument();
  expect(linkToFavorites).toHaveAttribute('href', '/favorites');
});

it('Testa rota not found', () => {
  renderWithRouter(<App />, { route: '/something-else' });

  expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
});
