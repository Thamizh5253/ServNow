import { Card, TextField, Button, Grid, Box } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import MainCard from 'ui-component/cards/MainCard';

// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';

const AddService = () => {
  const [formData, setFormData] = useState({
    service_name: '',
    service_cost: '',
    expected_time: '',
    service_image: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [preview, setPreview] = useState('');

  const handleSendFile = async (e) => {
    e.preventDefault();

    if (!preview) return;

    try {
      const res = await axios.post('http://localhost:5000/img/upload', {
        image_url: preview
      });
      toast.success('Image Uploaded successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
        // transition: Bounce
      });

      // console.log(res.data.data);
      setFormData({
        ...formData,
        service_image: res.data.data
      });
      // console.log(formData);
    } catch (err) {
      // console.log(err);
      toast.error('There is a problem, Try Again!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
        // transition: Bounce
      });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!preview) {
      console.log('provide all data');
    }
    console.log(formData);

    try {
      const response = await fetch('http://localhost:5000/api/addService', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log(response);
      if (response.ok) {
        toast.success('Service Added successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });

        console.log('Service Added successfully');
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
  return (
    <MainCard title="Add New Service">
      <Card sx={{ overflow: 'hidden' }}>
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Grid container spacing={2} direction="column">
            <Grid item sx={{ margin: '20px 0' }}>
              <TextField
                label="Service Name"
                variant="outlined"
                name="service_name"
                value={formData.service_name}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item sx={{ margin: '20px 0' }}>
              <TextField
                label="Service Cost"
                variant="outlined"
                name="service_cost"
                value={formData.service_cost}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item sx={{ margin: '20px 0' }}>
              <TextField
                label="Expected Delivery Time"
                variant="outlined"
                name="expected_time"
                value={formData.expected_time}
                onChange={(e) => handleChange(e, null, null)}
                placeholder="(ex: ' 1 ' or ' 2 ' or ' 3 ' or ' same day ' )"
                style={{ width: '50%' }}
              />
            </Grid>
          </Grid>
          <Grid item sx={{ margin: '20px 0' }}>
            <TextField
              type="file"
              onChange={handleFileUpload}
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              style={{ marginBottom: '10px', width: '50%' }}
            />
            <Grid container justify="center">
              {preview && (
                <Grid item>
                  <img src={preview} alt="Preview" height={'100px'} width={'100px'} />
                </Grid>
              )}
            </Grid>
            <Grid>
              <Button variant="contained" color="primary" onClick={handleSendFile}>
                Upload Image
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Grid item sx={{ margin: '20px 0' }}>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Card>
    </MainCard>
  );
};

export default AddService;
