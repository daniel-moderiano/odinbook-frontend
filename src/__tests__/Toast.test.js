import Toast from '../components/utils/Toast'
import { render, screen } from "@testing-library/react";

it("Renders visible toast (opacity-100) when visible is set to true", () => {
  render(<Toast visible={true} params={{ type: 'error', message: '' }}/>);

  const toast = screen.getByRole('status');
  expect(toast).toHaveClass('opacity-100')
});

it("Renders invisible toast (opacity-0) when visible is set to false", () => {
  render(<Toast visible={false} params={{ type: 'error', message: '' }}/>);

  const toast = screen.getByRole('status');
  expect(toast).toHaveClass('opacity-0');
});

it("Renders the correct toast message", () => {
  render(<Toast visible={false} params={{ type: 'error', message: 'test message' }}/>);

  const toastMsg = screen.getByText('test message');
  expect(toastMsg).toBeInTheDocument();
});

it("Renders the correct toast type", () => {
  render(<Toast visible={false} params={{ type: 'success', message: '' }}/>);

  const toast = screen.getByRole('status');
  const toastHeading = screen.getByText('Success!');

  expect(toast).toHaveClass('bg-green-600');
  expect(toastHeading).toBeInTheDocument();
});

