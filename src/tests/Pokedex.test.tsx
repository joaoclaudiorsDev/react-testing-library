import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

describe('5. Teste o component <Pokedex />', () => {
  const pokeId = 'pokemon-name';

  test('Exibe um h2 com texto "Encountered Pokémon"', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('heading', { name: 'Encountered Pokémon' })).toBeInTheDocument();
  });

  test('exibe o próximo Pokémon da lista ao clicar no botão Próximo Pokémon', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(buttonNext).toBeInTheDocument();
  });

  test('Deve existir um botão de filtragem para cada tipo de Pokémon', async () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    const pikachuElement = screen.getByText(/pikachu/i);
    expect(pikachuElement).toBeInTheDocument();

    await userEvent.click(nextPokemon);

    const charmanderElement = screen.getByTestId(pokeId);
    expect(charmanderElement.innerHTML).toBe('Charmander');

    const averageElement = screen.getAllByText(/average/i);
    expect(averageElement).toHaveLength(1);
  });

  test('Ao clicar no botão All, a Pokédex deve mostrar os Pokémon normalmente (sem filtros)', async () => {
    renderWithRouter(<App />);

    const psyButton = screen.getByRole('button', { name: /Psychic/i });
    const allButton = screen.getByRole('button', { name: /all/i });

    await userEvent.click(psyButton);
    await userEvent.click(allButton);

    const nextPokeButton = await screen.findByRole('button', { name: /próximo pokémon/i });
    expect(nextPokeButton.closest('button')).toBeEnabled();

    await userEvent.click(nextPokeButton);

    const pokeName = await screen.findByTestId(pokeId);
    expect(pokeName.innerHTML).toBe(pokemonList[1].name);
  });

  test('Há um botão de filtro para cada tipo', () => {
    renderWithRouter(<App />);
    const filterButton = screen.getAllByTestId('pokemon-type-button');
    expect(filterButton).toHaveLength(7);
  });

  test('é possível navegar somente através de um certo tipo de pokemon', async () => {
    renderWithRouter(<App />);
    const eletricButton = screen.getByRole('button', { name: /electric/i });
    const actuallyPokemonSample = screen.queryByTestId('pokemon-type');
    const allButton = screen.getByRole('button', { name: /all/i });
    await userEvent.click(eletricButton);
    expect(actuallyPokemonSample?.innerHTML).toBe('Electric');

    const fireButton = screen.getByRole('button', { name: /fire/i });
    await userEvent.click(fireButton);
    const charmader = screen.getByText(/charmander/i);
    expect(charmader).toBeInTheDocument();

    await userEvent.click(allButton);
    const namePokemon = screen.getByTestId(pokeId);
    expect(namePokemon.innerHTML).toBe('Pikachu');
  });

  test('O botão All precisa estar sempre visível', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
  });
});
