import { ApolloProvider } from '@apollo/client';
import { ModalStatesProvider } from './contexts/AppContext';
import { WorkspaceProvider } from './contexts/WorkspaceProvider';
import Sidebar from './components/Sidebar';
import AppRoutes from './routes';
import client from './apolloClient';

function App() {
  return (
    <ApolloProvider client={client}>
      <WorkspaceProvider>
        <ModalStatesProvider>
          <div className="app-container">
            <Sidebar />
            <main className="main-content">
              <AppRoutes />
            </main>
          </div>
        </ModalStatesProvider>
      </WorkspaceProvider>
    </ApolloProvider>
  );
}

export default App; 