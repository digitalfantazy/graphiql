import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

beforeEach(() => {
  vi.spyOn(window.history, 'replaceState').mockImplementation(() => null);
});

afterEach(() => {
  cleanup();
});

vitest.mock('next/navigation', () => ({
  redirect: vi.fn(),
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
      locale: 'no',
      push: vi.fn(),
      reload: vi.fn(),
      refresh: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
      },
      beforePopState: vi.fn(() => null),
      prefetch: vi.fn(() => null),
    };
  },
  usePathname() {
    return {
      path: 'en/GET',
      split: vi.fn().mockImplementation(() => ['foo', 'bar']),
      replace: vi.fn(),
    };
  },
}));

vitest.mock('next/headers', () => ({
  cookies() {
    return {
      get: vi.fn().mockImplementation(() => ({ value: 'cookie_name' })),
      set: vi.fn(),
      delete: vi.fn(),
    };
  },
}));

vitest.mock('firebase/app', () => ({
  getApp: vi.fn(),
  getApps: vi.fn().mockImplementation(() => []),
  initializeApp: vi.fn(),
}));

vitest.mock('firebase/auth', () => ({
  getAuth: vi.fn(),
  onIdTokenChanged: () => vi.fn(),
  signOut: vi.fn(),
  updateProfile: vi.fn(),
}));

vitest.mock('react-firebase-hooks/auth', () => ({
  useCreateUserWithEmailAndPassword: vi.fn().mockImplementation(() => {
    return [
      () => ({
        user: {
          sendEmailVerification: vi.fn(),
          getIdToken: vi.fn(),
        },
      }),
    ];
  }),
  useSignInWithEmailAndPassword: vi.fn().mockImplementation(() => {
    return [
      () => ({
        user: {
          sendEmailVerification: vi.fn(),
          getIdToken: vi.fn(),
        },
      }),
      null,
      false,
      true,
    ];
  }),
}));
