import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
  useSearchParams: () => [new URLSearchParams('plan=MCA&category=general')],
}), { virtual: true });

jest.mock('../services/api', () => ({
  locationApi: {
    getCounties: jest.fn().mockResolvedValue({ results: [] }),
    getConstituencies: jest.fn().mockResolvedValue({ results: [] }),
    getWards: jest.fn().mockResolvedValue({ results: [] }),
  },
  membershipApi: {
    create: jest.fn(),
    verifyPaystackPayment: jest.fn(),
  },
}));

jest.mock('../services/paystack', () => ({
  loadPaystack: jest.fn(),
}));

const JoinUs = require('./JoinUs').default;
const { locationApi } = require('../services/api');

describe('aspirant application membership gate', () => {
  beforeEach(() => {
    jest.spyOn(locationApi, 'getCounties').mockResolvedValue({
      results: [{ id: 1, name: 'Nairobi' }],
    });
    locationApi.getConstituencies.mockResolvedValue({
      results: [{ id: 2, name: 'Westlands' }],
    });
    locationApi.getWards.mockResolvedValue({
      results: [{ id: 3, name: 'Parklands' }],
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('shows each form section on its own page and blocks Section B without a membership number', async () => {
    render(<JoinUs />);

    expect(await screen.findByRole('heading', { name: 'Section A · Personal details' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Section A of K' })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Application sections A through K' })).toBeVisible();
    expect(screen.getAllByRole('listitem')).toHaveLength(11);
    expect(screen.getByLabelText('Section A · Personal details, current section')).toBeVisible();
    expect(screen.getByRole('textbox', { name: /Full name as appearing on National ID/ })).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Section B · DEP-BUS membership' })).not.toBeInTheDocument();

    fireEvent.change(screen.getByRole('textbox', { name: /Full name as appearing on National ID/ }), {
      target: { value: 'Test Applicant' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /National ID \/ Passport number/ }), {
      target: { value: '12345678' },
    });
    fireEvent.change(screen.getByLabelText(/Date of birth/), {
      target: { value: '1990-01-01' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /Telephone number/ }), {
      target: { value: '0712345678' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /WhatsApp number/ }), {
      target: { value: '0712345678' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /Sub-County/ }), {
      target: { value: 'Westlands' },
    });

    fireEvent.mouseDown(screen.getByRole('combobox', { name: 'Gender' }));
    fireEvent.click(await screen.findByRole('option', { name: 'Female' }));

    fireEvent.mouseDown(screen.getByRole('combobox', { name: 'County' }));
    fireEvent.click(await screen.findByRole('option', { name: 'Nairobi' }));
    fireEvent.mouseDown(await screen.findByRole('combobox', { name: 'Constituency' }));
    fireEvent.click(await screen.findByRole('option', { name: 'Westlands' }));
    fireEvent.mouseDown(await screen.findByRole('combobox', { name: 'Ward' }));
    fireEvent.click(await screen.findByRole('option', { name: 'Parklands' }));

    fireEvent.click(screen.getByRole('button', { name: /Next: Section B/ }));
    expect(await screen.findByRole('heading', { name: 'Section B · DEP-BUS membership' })).toBeInTheDocument();
    expect(screen.getByText('Are you currently a member of DEP-BUS?')).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Section C · Position applied for' })).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('radio', { name: 'No' })[0]);
    fireEvent.click(screen.getAllByRole('radio', { name: 'No' })[1]);

    expect(screen.getByText(/All Aspirants are advised to reconfirm/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Next: Section C/ }));
    expect(screen.getByRole('heading', { name: 'Section B · DEP-BUS membership' })).toBeInTheDocument();
    expect(screen.getByText('A membership number/reference is required before continuing.')).toBeInTheDocument();

    fireEvent.change(screen.getByRole('textbox', { name: /DEP-BUS membership number \/ reference/ }), {
      target: { value: 'DEP-12345' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Next: Section C/ }));
    expect(screen.getByRole('heading', { name: 'Section C · Position applied for' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Position applied for' })).toHaveValue('Member of the County Assembly');

    fireEvent.click(screen.getByRole('button', { name: /Next: Section D/ }));
    expect(screen.getByRole('heading', { name: 'Section D · Electoral area' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Electoral county' })).toBeVisible();
  }, 20000);
});
