import { render, screen } from '@testing-library/react';
import NotFoundPage from '../[locale]/[...not-found]/page';
import GraphQLPage from '../[locale]/GRAPHQL/[[...slug]]/page';
import HistoryPage from '../[locale]/history/page';
import RestPage from '../[locale]/[rest]/[...slug]/page';
import SignInPage from '../[locale]/sign-in/page';
import SignUpPage from '../[locale]/sign-up/page';
import HomePage from '../[locale]/page';

describe('Should render without crashing', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => null);
    vi.spyOn(console, 'error').mockImplementation(() => null);
  });

  test('Home Page', () => {
    render(HomePage());
  });

  test('Not Found Page', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('not_found')).toBeInTheDocument();
  });

  test('GraphQl Page', async () => {
    render(
      await GraphQLPage({ params: { slug: [], locale: 'en', rest: 'GET' }, searchParams: {} })
    );
  });

  test('History Page', async () => {
    render(
      await HistoryPage({ params: { slug: [], locale: 'en', rest: 'GET' }, searchParams: {} })
    );
  });

  test('Rest Page', async () => {
    render(await RestPage({ params: { slug: [], locale: 'en', rest: 'GET' }, searchParams: {} }));
  });

  test('Sign In Page', () => render(SignInPage()));
  test('Sign Up Page', () => render(SignUpPage()));
});
