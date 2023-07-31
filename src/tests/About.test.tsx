import { render, screen } from '@testing-library/react';
import { About } from '../pages';

test('Exibe um h2 com texto "About Pokédex"', () => {
  render(<About />);
  const heading = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
  expect(heading).toBeInTheDocument();
});

test('O atributo src da imagem é "https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png"', () => {
  render(<About />);
  const image = screen.getByAltText('Pokédex');
  expect(image).toHaveAttribute(
    'src',
    'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
