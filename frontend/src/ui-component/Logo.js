// material-ui
// import { useTheme } from '@mui/material/styles';
import logo from './logo.png';
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  // const theme = useTheme();

  return (
    <>
      <img height={60} src={logo} alt="Berry" width="100" />

      <h3 className="logo" style={{ color: 'black', marginRight: '3px' }}>
        SERVNOW
      </h3>
    </>
  );
};

export default Logo;
