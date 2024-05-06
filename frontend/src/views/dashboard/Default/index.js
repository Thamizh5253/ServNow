import { useEffect, useState } from 'react';
import React from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
// import EarningCard from './EarningCard';
// import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalService from './TotalService';
import Pending from './Pending';
import Completed from './Completed';
import Ready from './Ready';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { useContext } from 'react';
import UsernameContext from '../../context/context';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const { username, role } = useContext(UsernameContext);

  const [isLoading, setLoading] = useState(true);
  const [totalService, setTotalService] = useState(0);
  const [pending, setPending] = useState(0);
  const [ready, setReady] = useState(0);
  const [completed, setCompleted] = useState(0);
  // useEffect(() => {
  //   setLoading(false);
  // }, []);
  useEffect(() => {
    setLoading(false);

    const fetchResults = async () => {
      if (role === 'admin') {
        try {
          const response = await fetch(`http://localhost:5000/api/admin/totalservice/count/`);
          const data = await response.json();
          // console.log(data.counted);
          setTotalService(data.counted);
          // console.log(totalService);
        } catch (error) {
          console.error('Error fetching results:', error);
        }
        try {
          const response = await fetch(`http://localhost:5000/api/admin/status/count/`);
          const data = await response.json();
          // console.log(totalService);
          setPending(data.pending);
          setCompleted(data.completed);
          setReady(data.ready);
        } catch (error) {
          console.error('Error fetching results:', error);
        }
      }
      // for normal user
      else {
        try {
          const response = await fetch(`http://localhost:5000/api/totalservice/count/${username}`);
          const data = await response.json();
          // console.log(data.counted);
          setTotalService(data.counted);
          // console.log(totalService);
        } catch (error) {
          console.error('Error fetching results:', error);
        }
        try {
          const response = await fetch(`http://localhost:5000/api/status/count/${username}`);
          const data = await response.json();
          // console.log(totalService);
          setPending(data.pending);
          setCompleted(data.completed);
          setReady(data.ready);
        } catch (error) {
          console.error('Error fetching results:', error);
        }
      }
    };

    fetchResults();
  }, [username]);
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalService isLoading={isLoading} totalService={totalService} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <Pending isLoading={isLoading} pending={pending} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <Ready isLoading={isLoading} ready={ready} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <Completed isLoading={isLoading} completed={completed} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <PopularCard isLoading={isLoading} /> */}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
