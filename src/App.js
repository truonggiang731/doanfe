import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';

import {
  QueryClient,
  QueryClientProvider
} from 'react-query'

const queryClient = new QueryClient()

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const {isAdmin} = useSelector((state) => state.auth);

  console.log(`render with ${isAdmin}`)

  return (
    isAdmin ?
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
          </QueryClientProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    :
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
          </QueryClientProvider>
        </ThemeProvider>
      </StyledEngineProvider>
  );
};

export default App;
