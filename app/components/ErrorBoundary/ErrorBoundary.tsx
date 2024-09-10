'use client';

import { Component, ErrorInfo, MouseEvent, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

type Props = { children: ReactNode };
type State = { hasError: boolean };

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error.toString(), errorInfo.componentStack);
  }

  private handleClose = (): void => this.setState({ hasError: false });

  render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div
          className={styles.overlay}
          role="presentation"
          onMouseDown={(e: MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget) this.handleClose();
          }}
        >
          <div className={styles.errorMsg}>
            <h2 className={styles.errorTitle}>Something went wrong</h2>
            <button className={styles.closeBtn} type="button" onClick={this.handleClose}>
              Close
            </button>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
