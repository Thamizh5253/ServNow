import React, { useState, useEffect } from 'react';
import axios from 'axios';
// material-ui
import { Grid } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';

import { gridSpacing } from 'store/constant';
import { useContext } from 'react';
import UsernameContext from '../context/context';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

// ============================|| UTILITIES SHADOW ||============================ //

const NewService = () => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [formattedDate, setFormattedDate] = useState('');
  const [results, setResults] = useState([]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formatted = dayjs(date).format('DD-MM-YYYY');
    setFormattedDate(formatted);
  };

  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState('');
  const handleOpen = (type) => {
    setType(type);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const { username } = useContext(UsernameContext);
  const handleBookNowClick = async () => {
    if (!formattedDate) {
      alert('Date cannot be empty');
      return; // Exit the function if the date is empty
    }

    const bookingData = { type: type, status: 0, user: username, date: formattedDate };

    try {
      await axios.post('https://servnow-server.onrender.com/api/newservice', bookingData);
      toast.success('New Service placed successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
    } catch (error) {
      toast.error('Error in placing the order', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      console.error('Error sending booking data:', error);
    }
    handleClose();
    setSelectedDate(null);
    setFormattedDate('');
  };
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`https://servnow-server.onrender.com/api/manageservices`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);
  return (
    <MainCard title="New Service">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <SubCard title="New Service">
            <Grid container spacing={gridSpacing}>
              {results.map((item) => (
                <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                  <Card sx={{ maxWidth: 345, border: '1px solid black' }}>
                    <CardActionArea>
                      <CardMedia component="img" height="140" image={item.service_image} alt={item.service_name} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.service_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ₹{item.service_cost}
                        </Typography>
                        <Typography variant="h5" color="text.secondary">
                          Delivery in {item.expected_time} days
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="large" variant="contained" onClick={() => handleOpen(item.service_name)}>
                        Book Now
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </SubCard>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ ...style, mt: 2 }}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            Select a Date:
          </Typography>
          <Box sx={{ mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Date picker" value={selectedDate} onChange={handleDateChange} />
            </LocalizationProvider>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button size="large" variant="contained" onClick={() => handleBookNowClick()}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </MainCard>
  );
};

// PropTypes validation
NewService.propTypes = {
  // Add PropTypes validation here if required
};

export default NewService;
