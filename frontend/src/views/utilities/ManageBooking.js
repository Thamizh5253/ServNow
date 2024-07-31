import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import { toast } from 'react-toastify';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem'; // Import MenuItem

const ResultsTable = () => {
  const [open, setOpen] = React.useState(false);
  const [changeInTable, setchangeInTable] = React.useState(false);
  const [id, setId] = React.useState('');
  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleManageTask = async () => {
    // Increment the status by 1
    try {
      await axios.put(`https://servnow-server.onrender.com/api/changestatus/${id}`);
      toast.success('Status updated successfully!', {
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

    handleClose();
  };

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
  const [results, setResults] = useState([]);
  const [statusFilter, setStatusFilter] = useState(''); // State for status filter

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`https://servnow-server.onrender.com/api/managetask`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [changeInTable]); // Update results when username changes

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value); // Update status filter value
  };

  // Filter results based on the status filter value
  const statusFilteredResults = results.filter((result) => {
    // If no filter is selected, return true for all elements
    if (statusFilter === '') return true;
    return result.status === parseInt(statusFilter, 10);
  });

  return (
    <div>
      <MainCard
        title="Manage Booking"
        secondary={
          <TextField
            select
            label="Filter"
            id="outlined-size-small"
            defaultValue=""
            size="small"
            value={statusFilter}
            onChange={handleStatusChange}
            placeholder="All"
            sx={{ marginLeft: '20px', width: '150px' }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="0">Pending</MenuItem>
            <MenuItem value="1">Ready to Delivery</MenuItem>
          </TextField>
        }
      >
        <Card sx={{ overflow: 'hidden' }}>
          {/* Table */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell align="center">User</TableCell>
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Change Booking Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {statusFilteredResults.map((result, index) => (
                  <TableRow key={result._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{result.user}</TableCell>
                    <TableCell align="center">{result.type}</TableCell>
                    <TableCell align="center">{result.date}</TableCell>
                    <TableCell align="center">
                      {result.status === 0 && (
                        <Button
                          role="button" // Add role button to make it interactive
                          tabIndex={0} // Add tabIndex to make it focusable
                          style={{
                            color: 'red',
                            border: '1px solid red',
                            padding: '5px 42px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleOpen(result._id)}
                        >
                          Pending
                        </Button>
                      )}
                      {result.status === 1 && (
                        <Button
                          role="button" // Add role button to make it interactive
                          tabIndex={0} // Add tabIndex to make it focusable
                          style={{
                            fontSize: '15px',
                            color: 'orange',
                            border: '1px solid orange',
                            padding: '5px 10px ',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleOpen(result._id)}
                        >
                          Ready to Delivery
                        </Button>
                      )}
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
              Do you want to Change this?
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Button size="large" variant="contained" onClick={() => handleManageTask()} sx={{ marginRight: '15px' }}>
                Yes
              </Button>
              <Button
                size="large"
                variant="contained"
                onClick={() => handleClose()}
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
