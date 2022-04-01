import { render, screen } from "@testing-library/react";
import Spinner from '../components/utils/Spinner';

it('Renders loading spinner while loading state is true', () => {
  render(<Spinner loading={true}/>);

  const spinner = screen.getByRole('status');
  expect(spinner).toBeInTheDocument();
});

it('Hides loading spinner when content is loaded (i.e. loading = false)', () => {
  render(<Spinner loading={false}/>);

  const spinner = screen.queryByRole('status');
  expect(spinner).not.toBeInTheDocument();
});


