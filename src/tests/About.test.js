import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa se a página contém as informações sobre a Pokedéx', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(title).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const firstParagraph = screen.getByText(/this application simulates a pokédex,/i);
    const secondParagraph = screen.getByText(/one can filter pokémons by type,/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
    expect(firstParagraph).not.toEqual(secondParagraph);
  });

  it('Testa se existe a imagem específica de uma pokédex', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img', { name: /pokédex/i });
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
