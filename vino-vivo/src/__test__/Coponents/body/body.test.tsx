import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Body from '@/components/layouts/body/Body';
import { server } from '@/__test__/mocks/server';

test('renders Body component and loads products', async () => {
  render(<Body />);

  // Verifica si el indicador de carga está presente
  expect(screen.getByText(/cargando/i)).toBeInTheDocument();

  // Espera a que los productos se carguen
  await waitFor(() => expect(screen.getByText(/Product 1/i)).toBeInTheDocument());

  // Verifica otros elementos en el componente
  expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
  expect(screen.getByText(/Description 2/i)).toBeInTheDocument();
});