import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente "NotFound.js"', () => {
  it('Existe um h2 "page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const title = screen.getByRole('heading',
      { level: 2, name: /page requested not found/i });
    expect(title).toBeInTheDocument();
  });

  it('Existe uma imagem com o src correto', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByRole('img',
      { name: /pikachu crying because /i });
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
