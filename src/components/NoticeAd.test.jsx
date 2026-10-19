import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}), { virtual: true });

const NoticeAd = require('./NoticeAd').default;

describe('NoticeAd', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('shows the supplied image and opens the join page from the call to action', async () => {
    render(<NoticeAd />);

    expect(screen.getByRole('img', { name: 'DEP-BUS membership announcement' })).toHaveAttribute(
      'src',
      '/images/ad.png'
    );
    fireEvent.click(screen.getByRole('button', { name: 'Join now' }));

    expect(mockNavigate).toHaveBeenCalledWith('/volunteer');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});
