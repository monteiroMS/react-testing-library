import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente "Pokedex"', () => {
  it('Existe um h2 com o texto "encountered pokémons"', () => {
    renderWithRouter(<App />);

    const text = screen.getByRole('heading',
      { name: /encountered pokémons/i, level: 2 });
    expect(text).toBeInTheDocument();
  });

  it('Ao clicar em "próximo pokémon" é exibido outro pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.textContent).toBe('Pikachu');

    const nextBtn = screen.getByRole('button',
      { name: /próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();

    pokemons.forEach(({ name }) => {
      expect(pokemonName.textContent).toBe(name);
      userEvent.click(nextBtn);
    });
  });

  it('A lista deve reiniciar ao chegar ao fim', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();

    const nextBtn = screen.getByRole('button',
      { name: /próximo pokémon/i });
    expect(nextBtn).toBeInTheDocument();

    pokemons.forEach(({ name }, index) => {
      expect(pokemonName.textContent).toBe(name);
      userEvent.click(nextBtn);

      if (index === pokemons.length) {
        userEvent.click(nextBtn);
        expect(pokemonName.textContent).toBe('Pikachu');
      }
    });
  });

  it('A pokedéx tem todos botões de filtro', () => {
    renderWithRouter(<App />);

    const allbtns = screen.getAllByTestId('pokemon-type-button');
    allbtns.forEach((btn) => {
      expect(btn).toBeInTheDocument();
    });

    const filterBtns = pokemons.reduce((acc, { type }) => {
      if (acc.includes(type)) return acc;
      return [...acc, type];
    }, ['All']);

    filterBtns.forEach((name) => {
      const button = screen.getByRole('button', { name });
      expect(button).toBeInTheDocument();
      const btnAll = screen.getByRole('button', { name: /all/i });
      expect(btnAll).toBeInTheDocument();
    });
  });

  it('Quando filtrado, a pokédex circula apenas pelos pokémons daquele tipo', () => {
    renderWithRouter(<App />);

    const fire = screen.getByRole('button', { name: /fire/i });
    const psychic = screen.getByRole('button', { name: /psychic/i });
    const next = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(fire);

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    userEvent.click(next);

    const rapidash = screen.getByText(/rapidash/i);
    expect(rapidash).toBeInTheDocument();

    userEvent.click(next);
    expect(charmander).toBeInTheDocument();

    userEvent.click(psychic);

    const alakazam = screen.getByText(/alakazam/i);
    expect(alakazam).toBeInTheDocument();

    userEvent.click(next);

    const mew = screen.getByText(/mew/i);
    expect(mew).toBeInTheDocument();

    userEvent.click(next);
    expect(alakazam).toBeInTheDocument();
  });

  it('Testa o botão "All"', () => {
    renderWithRouter(<App />);

    const all = screen.getByRole('button', { name: /all/i });
    expect(all).toBeInTheDocument();
    const next = screen.getByRole('button', { name: /próximo pokémon/i });
    const fire = screen.getByRole('button', { name: /fire/i });
    const verifiesAll = () => {
      pokemons.forEach(({ name }) => {
        const pokemon = screen.getByText(name);
        expect(pokemon).toBeInTheDocument();
        userEvent.click(next);
      });
    };

    verifiesAll();

    userEvent.click(fire);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    userEvent.click(all);
    verifiesAll();
  });
});
