import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#19535f',
            color: 'white',
          }}
        >
          <i className="fas fa-exclamation-triangle" style={{ fontSize: '48px', marginBottom: '1rem', color: '#ffca3a' }}></i>
          <h1 style={{ marginBottom: '1rem' }}>Oops! Algo salió mal</h1>
          <p style={{ marginBottom: '2rem', maxWidth: '500px' }}>
            Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta recargar la página.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#00b99e',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0e9686')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#00b99e')}
          >
            Recargar página
          </button>
          {this.state.error && (
            <details style={{ marginTop: '2rem', maxWidth: '600px', textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
                Detalles del error
              </summary>
              <pre
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  padding: '1rem',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '12px',
                }}
              >
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
