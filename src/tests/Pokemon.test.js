import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente "Pokemon"', () => {
  it('Testa se é renderizado o card do pokémon', () => {
    renderWithRouter(<App />);

    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img', { name: /pikachu sprite/i });
    const card = [name, type, weight, img];

    card.forEach(((el, index) => {
      const TRES = 3;
      expect(el).toBeInTheDocument();
      if (index === 0) {
        expect(el.textContent).toBe('Pikachu');
      }
      if (index === 1) {
        expect(el.textContent).toBe('Electric');
      }
      if (index === 2) {
        expect(el.textContent).toBe('Average weight: 6.0 kg');
      }
      if (index === TRES) {
        expect(el.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      }
    }));
  });

  it('Testa se existe um link para os detalhes do pokémon em todos os cards', () => {
    const { history } = renderWithRouter(<App />);

    pokemons.forEach(({ id }, index) => {
      const next = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(next).toBeInTheDocument();

      const link = screen.getByRole('link', { name: /more details/i });
      expect(link).toBeInTheDocument();

      const { goBack } = history;

      if (index === 0) {
        userEvent.click(link);
        const { pathname } = history.location;
        expect(pathname).toBe(`/pokemons/${id}`);
        goBack();
      } else if (index < pokemons.length - 1) {
        for (let i = 0; i <= index; i += 1) {
          userEvent.click(next);
        }
        userEvent.click(link);
        const { pathname: pathUrl } = history.location;
        expect(pathUrl).toBe(`/pokemons/${pokemons[index + 1].id}`);
        goBack();
      } else if (index === pokemons.length - 1) {
        for (let i = 0; i <= index; i += 1) {
          userEvent.click(next);
        }
        userEvent.click(link);
        const { pathname: pathUrl } = history.location;
        expect(pathUrl).toBe(`/pokemons/${pokemons[0].id}`);
        goBack();
      }
    });
  });

  it('Testa se existe um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    const fav = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    expect(fav).toBeInTheDocument();

    userEvent.click(fav);

    const favsLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favsLink).toBeInTheDocument();

    userEvent.click(favsLink);

    const favPikachu = screen.getByText(/pikachu/i);
    const star = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favPikachu).toBeInTheDocument();
    expect(star).toBeInTheDocument();
    expect(star.src).toBe('http://localhost/star-icon.svg');

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
    const newStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(newStar).toBeInTheDocument();
    expect(newStar.src).toBe('http://localhost/star-icon.svg');
  });
});
