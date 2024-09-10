import { render } from '@testing-library/react';
import TranslationsProvider from '../components/TranslationsProvider/TranslationsProvider';

describe('TranslationsProvider', () => {
  test('Should be rendered without crashing', () => {
    const props = {
      children: [],
      locale: 'en',
      namespaces: ['namespace'],
      resources: { en: { namespace: 'test' } },
    };

    render(
      <TranslationsProvider
        locale={props.locale}
        namespaces={props.namespaces}
        resources={props.resources}
      >
        {props.children}
      </TranslationsProvider>
    );
  });
});
