import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <App.js />', () => {
  it('O topo da aplicação contém um fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const homeLk = screen.getByRole('link', { name: /home/i });
    const aboutLk = screen.getByRole('link', { name: /about/i });
    const favLk = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(homeLk).toBeInTheDocument();
    expect(aboutLk).toBeInTheDocument();
    expect(favLk).toBeInTheDocument();
  });

  it('Testa o redirecionamento e o URL ao clicar em "Home"', () => {
    const { history } = renderWithRouter(<App />);

    const homeLk = screen.getByRole('link', { name: /home/i });
    expect(homeLk).toBeInTheDocument();
    userEvent.click(homeLk);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const homeText = screen.getByText(/encountered pokémons/i);
    expect(homeText).toBeInTheDocument();
  });

  it('Testa o redirecionamento e o URL ao clicar em "About"', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLk = screen.getByRole('link', { name: /about/i });
    expect(aboutLk).toBeInTheDocument();
    userEvent.click(aboutLk);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutText = screen.getByText(/about pokédex/i);
    expect(aboutText).toBeInTheDocument();
  });

  it('Testa o redirecionamento e o URL ao clicar em "Favorite Pokémons"', () => {
    const { history } = renderWithRouter(<App />);

    const favLk = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favLk).toBeInTheDocument();
    userEvent.click(favLk);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const [, text] = screen.getAllByText(/favorite pokémons/i);
    expect(text).toBeInTheDocument();
  });

  it('Testa se ao entrar em uma URL inexistente, aparece a tela de NotFound', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/bad-url');

    const title = screen.getByRole('heading',
      { level: 2, name: /page requested not found/i });
    expect(title).toBeInTheDocument();
  });
});
