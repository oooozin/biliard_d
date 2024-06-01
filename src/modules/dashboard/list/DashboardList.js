import { useCallback, useEffect, useState } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import { Breadcrumb } from '../../../shares/Breadcrumbs'
import AnalyticEcommerce from '../../../shares/AnalyticEcommerce';
import { dashboardService } from '../dashboardService';
import { useDispatch, useSelector } from 'react-redux';
import StackBars from '../../../shares/StackBars';
import SkeletonDashboard from '../../../shares/SkeletonDashboard';

export const DashboardList = () => {

  const [isLoading, setIsLoading] = useState(true)
  const { total_data, chart_data } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  const loadingData = useCallback(async () => {
    await dashboardService.totaldata(dispatch);
    setIsLoading(false)
  }, [dispatch]);

  useEffect(() => {    
      loadingData();
  }, [loadingData]);

  return (
    <div>
      <Breadcrumb />
      {isLoading? <SkeletonDashboard /> : (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>

          <Grid item xs={12} sx={{ mb: -3.65, mt: 1 }}>
            <Typography sx={{ fontWeight: 'bold' }} variant="h5">Total Count</Typography>
          </Grid>

          {total_data.map((data,index)=>(
            <Grid item xs={3} sm={3} md={3} lg={3} key={index}>
              <AnalyticEcommerce title={data.name} count={data.count} />
            </Grid>
          ))}

          <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

          <Grid item xs={12} sx={{ mb: -3.65, mt: 1 }}>
            <Typography sx={{ fontWeight: 'bold' }} variant="h5">Item List</Typography>
          </Grid>

          {chart_data.map((data, index)=>(
            <Grid item xs={12} sm={12} md={12} lg={6} key={index}>
              <Typography variant="h6">{data.name}</Typography>
              <StackBars dataset={data.data}/>
            </Grid> 
          ))} 

        </Grid>
      )}
    </div>
  );
};