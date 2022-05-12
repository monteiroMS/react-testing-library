import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente "PokemonDetails"', () => {
  const { name, summary, foundAt } = pokemons[0];

  it('Ao selecionar, são exibidas as informações detalhadas do pokémon na tela', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    const title = screen.getByRole('heading', { level: 2, name: `${name} Details` });
    expect(title).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();

    const summaryTitle = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(summaryTitle).toBeInTheDocument();

    const summaryText = screen.getByText(summary);
    expect(summaryText).toBeInTheDocument();
  });

  it('Existe uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    const sectionTitle = screen.getByRole('heading',
      { level: 2, name: `Game Locations of ${name}` });
    expect(sectionTitle).toBeInTheDocument();

    foundAt.forEach(({ location }) => {
      const text = screen.getByText(location);
      expect(text).toBeInTheDocument();
    });

    const imgArray = screen.getAllByRole('img', { name: `${name} location` });

    foundAt.forEach(({ map }, index) => {
      expect(imgArray[index]).toBeInTheDocument();
      expect(imgArray[index].src).toBe(map);
    });
  });

  it('Pode-se favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    const input = screen.getByLabelText('Pokémon favoritado?');
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('checkbox');
  });
});
