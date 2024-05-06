import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import React from 'react';
// import UsernameContext from './views/context/context'; // Import the UsernameContext properly
import { UsernameProvider } from './views/context/context'; // ==============================|| APP ||============================== //
// const UsernameContext = createContext();

const App = () => {
  const customization = useSelector((state) => state.customization);
  // const [username, setUserName] = useState('Jesse');

  return (
    <UsernameProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </UsernameProvider>
  );
};

export default App;
