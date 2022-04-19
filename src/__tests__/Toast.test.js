import Toast from '../components/utils/Toast'
import { render, screen } from "@testing-library/react";
import { ToastContextProvider } from "../context/ToastContext";

it("Renders visible toast (opacity-100) when visible is set to true", () => {
  render(
    <ToastContextProvider value={{ showToast: jest.fn }}>
      <Toast visible={true} params={{ type: 'error', message: '' }}/>
    </ToastContextProvider>
  );

  const toast = screen.getByRole('status', { hidden: true });
  expect(toast).toHaveClass('opacity-100')
});

it("Renders invisible toast (opacity-0) when visible is set to false", () => {
  render(
    <ToastContextProvider value={{ showToast: jest.fn }}>
      <Toast visible={false} params={{ type: 'error', message: '' }}/>
    </ToastContextProvider>
  );

  const toast = screen.getByRole('status', { hidden: true });
  expect(toast).toHaveClass('opacity-0');
});

it("Toast is inaccessible when visible is set to false", () => {
  render(
    <ToastContextProvider value={{ showToast: jest.fn }}>
      <Toast visible={false} params={{ type: 'error', message: '' }}/>
    </ToastContextProvider>
  );

  // Since the accessible role is status, an inaccessible element will not be found here
  const toast = screen.queryByRole('status');
  expect(toast).not.toBeInTheDocument();
});

it("Renders the correct toast message", () => {
  render(
    <ToastContextProvider value={{ showToast: jest.fn }}>
      <Toast visible={true} params={{ type: 'error', message: 'test message' }}/>
    </ToastContextProvider>
  );

  const toastMsg = screen.getByText('test message');
  expect(toastMsg).toBeInTheDocument();
});

it("Renders the correct toast type", () => {
  render(
    <ToastContextProvider value={{ showToast: jest.fn }}>
      <Toast visible={true} params={{ type: 'success', message: '' }}/>
    </ToastContextProvider>
  );

  const toast = screen.getByRole('status');
  const toastHeading = screen.getByText('Success!');

  expect(toast).toHaveClass('bg-green-600');
  expect(toastHeading).toBeInTheDocument();
});

