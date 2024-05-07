import PropTypes from 'prop-types';
import logo from './logo.png';

// ==============================|| LOGO SVG ||============================== //

const Logo = ({ height, width }) => {
  return (
    <>
      <img height={height} src={logo} alt="Berry" width={width} />

      <h2 className="logo" style={{ color: 'black', marginRight: '3px', marginLeft: '10px' }}>
        SERVNOW
      </h2>
    </>
  );
};

Logo.propTypes = {
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Accept number or string for height
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]) // Accept number or string for width
};

Logo.defaultProps = {
  height: 80, // Default height if not provided
  width: 110 // Default width if not provided
};

export default Logo;
