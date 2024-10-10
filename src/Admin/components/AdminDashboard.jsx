import { Grid } from '@mui/material'
import React from 'react'
import Achivement from './Achivement'
import MonthlyOverview from './MonthlyOverview';
import ProductsTable from './ProductsTable';
import OrderTableView from '../view/OrderTableView';
import ProductTableView from '../view/ProductTableView';

const AdminDashboard = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Achivement />
        </Grid>
        <Grid item xs={12} md={8}>
          <MonthlyOverview />
        </Grid>
        <Grid item xs={12} md={6}>
          {" "}
          <OrderTableView />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductTableView/>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminDashboard
