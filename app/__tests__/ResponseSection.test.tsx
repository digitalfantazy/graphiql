import { render, screen } from '@testing-library/react';
import ResponceSection from '../components/ResponseSection/ResponseSection';

describe('ResponseSection', () => {
  test('Should be render with data', () => {
    const props = {
      data: '{"data": "value"}',
      status: '201',
      errorMsg: '',
      t: vi.fn(),
    };

    render(
      <ResponceSection
        data={props.data}
        status={props.status}
        errorMsg={props.errorMsg}
        t={props.t}
      />
    );

    const text = screen.getByText(': 201');
    expect(text).toBeInTheDocument();
  });

  test('Should be render if error', () => {
    const props = {
      data: '',
      status: '',
      errorMsg: 'Error',
      t: vi.fn(),
    };

    render(
      <ResponceSection
        data={props.data}
        status={props.status}
        errorMsg={props.errorMsg}
        t={props.t}
      />
    );

    const text = screen.getByText('Error');
    expect(text).toBeInTheDocument();
  });

  test('Should be render if no data', () => {
    const props = {
      data: '',
      status: '200',
      errorMsg: '',
      t: vi.fn(),
    };

    render(
      <ResponceSection
        data={props.data}
        status={props.status}
        errorMsg={props.errorMsg}
        t={props.t}
      />
    );

    const text = screen.queryByText('Error');
    expect(text).not.toBeInTheDocument();
  });

  test('Should be render if data and bad request status', () => {
    const props = {
      data: '{"data": "value"}',
      status: '400',
      errorMsg: '',
      t: vi.fn(),
    };

    render(
      <ResponceSection
        data={props.data}
        status={props.status}
        errorMsg={props.errorMsg}
        t={props.t}
      />
    );

    const text = screen.getByText(': 400');
    expect(text).toBeInTheDocument();
  });
});
