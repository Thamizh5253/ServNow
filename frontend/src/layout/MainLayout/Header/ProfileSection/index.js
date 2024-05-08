import React, { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';

import Modal from '@mui/material/Modal';
// material-ui
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';

import {
  Avatar,
  Box,
  Grid,
  Button,
  Chip,
  ClickAwayListener,
  Divider,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import User1 from 'assets/images/users/user-round.svg';

// assets
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconLogout, IconSettings, IconLock } from '@tabler/icons-react';

import axios from 'axios';
import { useContext } from 'react';
import UsernameContext from '../../../../views/context/context';

// ==============================|| PROFILE MENU ||============================== //
// const UserContext = createContext();
const ProfileSection = () => {
  const navigate = useNavigate();

  const { username, setProfile, profile, setAuth } = useContext(UsernameContext);

  const [formData, setFormData] = useState({
    email: '',
    fname: '',
    lname: '',
    mobile: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openEditPassword, setOpenEditPassword] = React.useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleChangePassword = (event) => {
    const { name, value } = event.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
    // console.log(passwordData);
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleToggleNewPasswordVisibility = () => {
    setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  const handleEditModal = async () => {
    //fetching data to Edit
    try {
      const response = await axios.get(`http://localhost:5000/api/fetchEditAccountInfo/${username}`);
      setFormData(response.data);
    } catch (err) {
      console.log(err);
    }

    setOpenEdit(true);
  };

  const handlePassWordModal = async () => {
    setOpenEditPassword(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/storeEditedUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, formData: formData })
      });
      if (response.ok) {
        toast.success('User Data Edited successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
        handleEditClose();
      } else {
        toast.error(` Please provide required Datas !`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
      }
    } catch (error) {
      console.error('Error while Adding:', error);
    }
  };

  const handleEditSubmitPassword = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/changepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, passwordData: passwordData })
      });
      if (response.ok) {
        toast.success('Password updated successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
        handleEditClosePassword();
      } else {
        const errorMessage = await response.text(); // Get the response message
        toast.error(errorMessage || 'An error occurred while updating the password', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
      }
    } catch (error) {
      console.error('Error while Adding:', error);
    }
  };

  //closing the modal
  const handleEditClose = () => setOpenEdit(false);
  const handleEditClosePassword = () => {
    setOpenEditPassword(false);
    // Reset passwordData to its initial state
    setPasswordData({
      currentPassword: '',
      newPassword: ''
    });
    handleTogglePasswordVisibility();
    handleToggleNewPasswordVisibility();
  };
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/fetchusername/${username}`);
        const data = await response.json();

        if (data) {
          const user = data[0].fname + ' ' + data[0].lname;
          setProfile(user);
        }
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchUsername();
  }, [username]);
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleLogout = () =>
    axios
      .get('http://localhost:5000/logout')
      .then((res) => {
        navigate('/pages/login/login3');
        setAuth(false);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            src={User1}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">Hello,</Typography>
                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                          {profile}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                  <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                    <Box sx={{ p: 2 }}>
                      <Divider />

                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%'
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5
                          }
                        }}
                      >
                        <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px` }} onClick={handleEditModal}>
                          <ListItemIcon>
                            <IconSettings stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                        </ListItemButton>{' '}
                        <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px` }} onClick={handlePassWordModal}>
                          <ListItemIcon>
                            <IconLock stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Change Password</Typography>} />
                        </ListItemButton>
                        <ListItemButton
                          sx={{ borderRadius: `${customization.borderRadius}px` }}
                          // selected={selectedIndex === 4}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>
                            <IconLogout stroke={1.5} size="1.3rem" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                        </ListItemButton>
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>

      <Modal open={openEdit} onClose={handleEditClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ ...style, mt: 2, width: '80%' }}>
          <Grid container spacing={2} direction="column">
            <Typography id="modal-modal-title" variant="h3" component="h2">
              Edit Account Details:
            </Typography>
            <Grid item sx={{ margin: '20px 0' }}>
              <TextField
                label="First Name"
                variant="outlined"
                name="fname"
                value={formData.fname}
                onChange={(e) => handleChange(e)}
                style={{ width: '36%' }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                name="lname"
                value={formData.lname}
                onChange={(e) => handleChange(e)}
                style={{ width: '36%', marginLeft: '24px' }}
              />
            </Grid>
            <Grid item sx={{ margin: '20px 0' }}>
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
                style={{ width: '75%' }}
                disabled
              />
            </Grid>

            <Grid item sx={{ margin: '20px 0' }}>
              <TextField
                label="Mobile Number"
                variant="outlined"
                name="mobile"
                value={formData.mobile}
                onChange={(e) => handleChange(e, null, null)}
                style={{ width: '75%' }}
              />
            </Grid>
          </Grid>
          <Grid item sx={{ margin: '20px 0' }}>
            <Grid sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handleEditSubmit} sx={{ mr: 2 }}>
                Submit
              </Button>
              <Button
                size=""
                variant="contained"
                onClick={() => handleEditClose()}
                sx={{ bgcolor: 'red', '&:hover': { backgroundColor: 'red' } }}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={openEditPassword}
        onClose={handleEditClosePassword}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, mt: 2, width: '30%' }}>
          <Grid container spacing={2} direction="column">
            <Typography id="modal-modal-title" variant="h3" component="h2">
              Change Password:
            </Typography>

            <Grid item sx={{ margin: '20px 0' }}>
              <TextField
                label="Current Password"
                variant="outlined"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleChangePassword}
                type={showPassword ? 'text' : 'password'}
                style={{ width: '90%' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Grid item sx={{ margin: '20px 0' }}>
                <TextField
                  label="New Password"
                  variant="outlined"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleChangePassword}
                  type={showNewPassword ? 'text' : 'password'}
                  style={{ width: '90%' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleToggleNewPasswordVisibility} edge="end">
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ margin: '20px 0' }}>
            <Grid sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handleEditSubmitPassword} sx={{ mr: 2 }}>
                Submit
              </Button>
              <Button
                size=""
                variant="contained"
                onClick={() => handleEditClosePassword()}
                sx={{ bgcolor: 'red', '&:hover': { backgroundColor: 'red' } }}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileSection;
