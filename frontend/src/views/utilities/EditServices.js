import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const ResultsTable = () => {
  // const { username } = useContext(UsernameContext);
  const [results, setResults] = useState([]);
  const [changeInTable, setchangeInTable] = useState(false);
  const [imgurl, setUrl] = useState('');
  const [id, setId] = useState('');
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  // const [statusFilter, setStatusFilter] = useState(''); // State for status filter
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
      toast.success('New Image Uploaded successfully', {
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
  const handleEditSubmit = async (event) => {
    event.preventDefault();

    console.log(formData);

    try {
      const response = await fetch('http://localhost:5000/api/storeEditedData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, formData: formData })
      });
      // console.log(response);
      if (response.ok) {
        toast.success('Service Edited successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        });
        setchangeInTable(!changeInTable);
        handleEditClose();
        // console.log('Service Edited successfully');
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
        // console.log('Please provide required Datas');
      }
    } catch (error) {
      console.error('Error while Adding:', error);
    }
  };
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/manageservices`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [changeInTable]);

  // Update results when username changes
  const handleOpen = (id) => {
    // console.log(id);
    setUrl(id);
    setOpen(true);
  };

  const handleDeleteModal = (id) => {
    // console.log(id);
    setId(id);
    setOpenDelete(true);
  };
  const handleEditModal = async (id) => {
    //fetching data to Edit
    try {
      const response = await axios.get(`http://localhost:5000/api/fetchServiceForEdit/${id}`);
      setFormData(response.data);
      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
    console.log(id);
    setId(id);
    setOpenEdit(true);
  };
  const handleClose = () => setOpen(false);
  const handleDeleteClose = () => setOpenDelete(false);
  const handleEditClose = () => setOpenEdit(false);

  const handleDelete = async () => {
    // Increment the status by 1
    try {
      await axios.put(`http://localhost:5000/api/deleteService/${id}`);
      // console.log('Service deleted successfully');
      toast.success('Service Deleted successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      setchangeInTable(!changeInTable);
    } catch (error) {
      console.error('Error updating status:', error);
    }

    handleDeleteClose();
  };
  // // Filter results based on the status filter value
  // const statusFilteredResults = results.filter((result) => {
  //   // If no filter is selected, return true for all elements
  //   if (statusFilter === '') return true;
  //   return result.status === parseInt(statusFilter, 10);
  // });

  return (
    <div>
      <MainCard title="Manage Service">
        <Card sx={{ overflow: 'hidden' }}>
          {/* Table */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell align="center">Service Name</TableCell>
                  <TableCell align="center">Service Cost</TableCell>
                  <TableCell align="center">Expected Days</TableCell>
                  <TableCell align="center">Service Image</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={result._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{result.service_name}</TableCell>
                    <TableCell align="center">{result.service_cost}</TableCell>
                    <TableCell align="center">{result.expected_time}</TableCell>
                    <TableCell align="center">
                      <Button
                        style={{
                          color: 'red',
                          border: '1px solid red',
                          padding: '5px 42px',
                          borderRadius: '4px',
                          cursor: 'pointer'
                          // display: 'inline-block'
                        }}
                        onClick={() => handleOpen(result.service_image)}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Grid>
                        <Button size="medium" variant="contained" onClick={() => handleEditModal(result._id)} sx={{ marginRight: '15px' }}>
                          Edit
                        </Button>
                        {/* </Grid>
                      <Grid> */}
                        <Button
                          sx={{ color: 'white', bgcolor: 'red', '&:hover': { backgroundColor: 'red' } }}
                          onClick={() => handleDeleteModal(result._id)}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={{ ...style, mt: 2 }}>
            <Typography id="modal-modal-title" variant="h3" component="h2">
              Your Image:
            </Typography>

            {/* Image Display */}
            <img src={imgurl} alt="Service_Image" style={{ maxWidth: '100%', marginTop: '20px' }} />

            <Box sx={{ mt: 2 }}>
              <Button
                size="large"
                variant="contained"
                onClick={() => handleClose()}
                sx={{ bgcolor: 'red', '&:hover': { backgroundColor: 'red' } }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
        <Modal open={openEdit} onClose={handleEditClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={{ ...style, mt: 2, width: '80%' }}>
            <Grid container spacing={2} direction="column">
              <Typography id="modal-modal-title" variant="h3" component="h2">
                Edit Service:
              </Typography>
              <Grid item sx={{ margin: '20px 0' }}>
                <TextField
                  label="Service Name"
                  variant="outlined"
                  name="service_name"
                  value={formData.service_name}
                  onChange={(e) => handleChange(e)}
                  style={{ width: '75%' }}
                />
              </Grid>
              <Grid item sx={{ margin: '20px 0' }}>
                <TextField
                  label="Service Cost"
                  variant="outlined"
                  name="service_cost"
                  value={formData.service_cost}
                  onChange={(e) => handleChange(e)}
                  style={{ width: '75%' }}
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
                  style={{ width: '75%' }}
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
                style={{ marginBottom: '10px', width: '75%' }}
              />
              <Grid container justify="center">
                <Grid item>
                  <img src={formData.service_image} alt="Preview" height={'100px'} width={'100px'} />
                </Grid>
              </Grid>
              <Grid>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" color="primary" onClick={handleSendFile}>
                    Upload New Image
                  </Button>
                </Box>
              </Grid>

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
        <Modal open={openDelete} onClose={handleDeleteClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={{ ...style, mt: 2 }}>
            <Typography id="modal-modal-title" variant="h3" component="h2">
              Do you want to Delete this?
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Button size="large" variant="contained" onClick={() => handleDelete()} sx={{ marginRight: '15px' }}>
                Yes
              </Button>
              <Button
                size="large"
                variant="contained"
                onClick={() => handleDeleteClose()}
                sx={{ bgcolor: 'red', '&:hover': { backgroundColor: 'red' } }}
              >
                No
              </Button>
            </Box>
          </Box>
        </Modal>
      </MainCard>
    </div>
  );
};

export default ResultsTable;
