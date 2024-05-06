import {
  IconTargetArrow,
  IconFileCode,
  IconTableShare,
  IconTypography,
  IconPalette,
  IconHistory,
  IconWindmill,
  IconBrandFeedly,
  IconSquarePlus,
  IconBrand4chan,
  IconEdit
} from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconHistory,
  IconSquarePlus,
  IconWindmill,
  IconTargetArrow,
  IconTableShare,
  IconFileCode,
  IconBrand4chan,
  IconBrandFeedly,
  IconEdit
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-shadow',
      title: 'New Service',
      type: 'item',
      url: '/utils/new-service',
      icon: icons.IconSquarePlus,
      breadcrumbs: false
    },
    {
      id: 'resultstable',
      title: 'Service History',
      type: 'item',
      url: '/utils/servicehistory',
      icon: icons.IconHistory,
      breadcrumbs: false
    },
    {
      id: 'Manage Booking',
      title: 'Manage Booking',
      type: 'item',
      url: '/utils/managebooking',
      icon: icons.IconBrand4chan,
      breadcrumbs: false
    },
    {
      id: 'Booking History',
      title: 'Booking History',
      type: 'item',
      url: '/utils/bookinghistory',
      icon: icons.IconHistory,
      breadcrumbs: false
    },
    {
      id: 'manageservices',
      title: 'Manage Services',
      type: 'collapse',
      icon: icons.IconEdit,
      children: [
        {
          id: 'addservice',
          title: 'Add Service',
          icon: icons.IconBrandFeedly,
          type: 'item',
          url: '/manageservices/addservices',
          breadcrumbs: false
        },
        {
          id: 'editservices',
          title: 'Edit Services',
          type: 'item',
          icon: icons.IconFileCode,
          url: '/manageservices/editservices',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default utilities;
