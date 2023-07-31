import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';
import pokemonList from '../data';

describe('6. Teste o component Pokemon.tsx', () => {
  const jokerMoreDetails = 'More details';
  test('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonList[0] }
      isFavorite={ false }
      showDetailsLink
    />);
    const image = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
    const name = 'Pikachu';

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.textContent).toBe('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.textContent).toBe('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');

    const pokemonImage = screen.getByAltText(`${name} sprite`) as HTMLImageElement;
    expect(pokemonImage.src).toContain(image);
    expect(pokemonImage.alt).toBe(`${name} sprite`);
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonList[0] }
      isFavorite={ false }
      showDetailsLink
    />);
    const pokemonId = 25;
    const moreDetailsLink = screen.getByRole('link', { name: jokerMoreDetails });
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink.getAttribute('href')).toBe(`/pokemon/${pokemonId}`);
  });

  test('Ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', async () => {
    renderWithRouter(<App />);
    const { name } = pokemonList[0];
    const moreDetails = screen.getByRole('link', { name: jokerMoreDetails }) as HTMLAnchorElement;
    await userEvent.click(moreDetails);
    expect(screen.getByText(`${name} Details`)).toBeInTheDocument();
  });

  test('verifica se a URL muda para /pokemon/<id> ao clicar no link de detalhes', () => {
    const pokemon = pokemonList[0];
    renderWithRouter(
      <Pokemon pokemon={ pokemon } showDetailsLink isFavorite={ false } />,
    );

    const detailsLink = screen.getByRole('link', { name: jokerMoreDetails });
    fireEvent.click(detailsLink);

    expect(window.location.pathname).toBe(`/pokemon/${pokemon.id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémon favoritados', async () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: jokerMoreDetails }) as HTMLAnchorElement;
    await userEvent.click(moreDetails);

    const isFavorite = screen.getByLabelText('Pokémon favoritado?');
    await userEvent.click(isFavorite);

    const favoritePokemon = pokemonList[0].name;
    const star = screen
      .getByAltText(`${favoritePokemon} is marked as favorite`) as HTMLImageElement;

    expect(star).toBeInTheDocument();
    expect(star.src).toContain('/star-icon.svg');
  });
});
