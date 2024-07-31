import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Card from '@mui/material/Card';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem'; // Import MenuItem

const ResultsTable = () => {
  const [results, setResults] = useState([]);
  const [statusFilter, setStatusFilter] = useState(''); // State for status filter

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`https://servnow-server.onrender.com/api/bookinghistory`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []); // Update results when username changes

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
        title="Booking History"
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
            <MenuItem value="2">Service Completed</MenuItem>
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
                  <TableCell align="center">Status</TableCell>
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
                          style={{
                            color: 'red',
                            border: '1px solid red',
                            padding: '5px 42px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Pending
                        </Button>
                      )}
                      {result.status === 1 && (
                        <Button
                          style={{
                            fontSize: '15px',
                            color: 'orange',
                            border: '1px solid orange',
                            padding: '5px 10px ',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Ready to Delivery
                        </Button>
                      )}
                      {result.status === 2 && (
                        <Button
                          style={{ color: 'green', border: '1px solid green', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Service Completed
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </MainCard>
    </div>
  );
};

export default ResultsTable;
