import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Divider, List, Typography } from '@mui/material';
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';
import { useContext } from 'react';
import UsernameContext from '../../../../../views/context/context';

const NavGroup = ({ item }) => {
  const theme = useTheme();

  // Access the role from context
  const { role } = useContext(UsernameContext);
  // Filter menu items based on role
  const filteredItems = item.children?.filter((menu) => {
    if (role === 'admin') {
      return menu.id === 'Manage Booking' || menu.id === 'Booking History' || menu.id === 'manageservices' || menu.title === 'Dashboard';
    } else if (role === 'user') {
      return menu.id === 'resultstable' || menu.id === 'util-shadow' || menu.title === 'Dashboard';
    }
    return false;
  });

  // Create menu items
  const items = filteredItems?.map((menu) => {
    switch (menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
              {item.title}
              {item.caption && (
                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
