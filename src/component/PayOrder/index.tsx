import React from 'react';
import { Button, Grid, Modal, styled, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useAppContext } from '../../contexts/AppContext';
import { useMemo, useState } from 'react';

const PayOrderComponent = styled(Grid)(() => ({
  width: '100%',
  padding: '20px',
  border: '1px solid #d6d6d6',
  borderRadius: '3px',
  marginBottom: '10px'
}))

export const PayOrder = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const { selectedTickets } = useAppContext();
  const selectedTicketsArr = Object.values(selectedTickets);

  const serviceFee = 44.8, processingFee = 56;

  const total = useMemo(() => {
    return selectedTicketsArr.reduce((res: number, ticket: any) => {
      const { price, quantity } = ticket;
      return res + price * quantity;
    }, serviceFee + processingFee)
  }, [selectedTickets]);

  return (
    <PayOrderComponent>
      <Grid display={'flex'} justifyContent={"space-between"}>
        <Typography variant='h6' sx={{ fontWeight: 600, paddingBottom: '20px' }}>
          Total 
        </Typography>
        <Typography variant='h6' sx={{ fontWeight: 600, paddingBottom: '5px' }}>
          ${total}
        </Typography>
      </Grid>
      <Grid sx={{paddingBottom: '20px'}}>
        <Typography sx={{ fontWeight: 600, paddingBottom: '5px' }}>
          Tickets
        </Typography>
        {
          selectedTicketsArr.map(({id, name, price, quantity}: any) => <Grid key={id} display={'flex'} justifyContent={"space-between"}>
          <Typography variant='h6' sx={{ fontSize: '14px', paddingBottom: '5px' }}>
            {name}: ${price} * {quantity}
          </Typography>
          <Typography variant='h6' sx={{   fontSize: '14px', paddingBottom: '5px' }}>
            ${price*quantity}
          </Typography>
        </Grid>)
        }
      </Grid>
      <Grid sx={{paddingBottom: '20px'}}>
        <Typography sx={{ fontWeight: 600, paddingBottom: '5px' }}>
          Notes From Seller
        </Typography>
        <Grid display={'flex'} justifyContent={"space-between"}>
          <Typography variant='h6' sx={{ fontSize: '14px', paddingBottom: '5px' }}>
            xfr XFER Proof of at least one dose of COVID-19 vaccination for ages 5 to 11 and guests ages 12 and up will be required to show proof of two COVID-19 vaccine doses or one dose of the Johnson & Johnson vaccine. Masks must be worn.
          </Typography>
        </Grid>
      </Grid>
      <Grid sx={{paddingBottom: '20px'}}>
        <Typography sx={{ fontWeight: 600, paddingBottom: '5px' }}>
          Fees
        </Typography>
        <Grid display={'flex'} justifyContent={"space-between"}>
          <Typography variant='h6' sx={{ fontSize: '14px', paddingBottom: '5px' }}>
            Service Fee
          </Typography>
          <Typography variant='h6' sx={{   fontSize: '14px', paddingBottom: '5px' }}>
            ${serviceFee}
          </Typography>
        </Grid>
        <Grid display={'flex'} justifyContent={"space-between"}>
          <Typography variant='h6' sx={{ fontSize: '14px', paddingBottom: '5px' }}>
            Order Processing Fee
          </Typography>
          <Typography variant='h6' sx={{ fontSize: '14px', paddingBottom: '5px' }}>
            ${processingFee}
          </Typography>
        </Grid>
      </Grid>
      <Grid sx={{paddingBottom: '20px'}}>
        <Typography sx={{ fontWeight: 600, paddingBottom: '5px' }}>
          Delivery
        </Typography>
        <Grid display={'flex'} justifyContent={"space-between"}>
          <Typography variant='h6' sx={{ fontSize: '14px', paddingBottom: '5px' }}>
            Mobile Entry
          </Typography>
          <Typography variant='h6' sx={{ fontSize: '14px', paddingBottom: '5px' }}>
            Free
          </Typography>
        </Grid>
      </Grid>
      <Grid sx={{paddingBottom: '20px'}}>
        <Typography sx={{ fontWeight: 600, paddingBottom: '5px', color: '#3975d9' }}>
          Cancel Order
        </Typography>
      </Grid>
      <Grid sx={{paddingBottom: '20px'}}>
        <Typography sx={{ fontWeight: 600, paddingBottom: '5px', fontSize: '14px' }}>
          * All Sales Final - No Refunds
        </Typography>
      </Grid>
      <Grid sx={{paddingBottom: '20px'}} display={'flex'} flexDirection={'row'}>
        <Checkbox {...label} defaultChecked />
        <Typography variant='h6' sx={{ fontSize: '14px', paddingBottom: '5px', display: 'flex', alignItems: 'center' }}>
          I have read and agree to the current <a style={{ color: '#3975d9' }}> Terms of Use</a>
        </Typography>
      </Grid>
      <Grid sx={{ paddingBottom: '20px' }}>
        <Button sx={{ backgroundColor: '#3a7e2a', color: 'white' }} fullWidth>Place Order</Button>
      </Grid>
      <Grid sx={{paddingBottom: '20px'}}>
        <Typography sx={{ fontWeight: 600, paddingBottom: '5px', fontSize: '14px' }}>
          * Exception may apply see our Terms of Use.
        </Typography>
      </Grid>
    </PayOrderComponent>
  )
}