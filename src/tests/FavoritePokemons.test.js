import { screen } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente "FavoritePokemons"', () => {
  it('É exibida a mensagem "no favorite pokemon found" quando necessário', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const text = screen.getByText(/no favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });

  it('São exibidos os cards de pokemons favoritados quando for necessário', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const allPokemons = screen.getAllByTestId('pokemon-name');
    allPokemons.forEach((pokemon) => {
      expect(pokemon).toBeInTheDocument();
    });
  });
});
