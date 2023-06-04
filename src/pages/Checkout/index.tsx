/** @format */

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Grid, styled, Typography } from '@mui/material';
import { Delivery as DeliveryComponent } from '../../component/Delivery';
import { Payment as PaymentComponent } from '../../component/Payment';
import { PayOrder as PayOrderComponent } from '../../component/PayOrder';

const ComponentBox = styled(Box)<any>(({}) => ({
  display: 'flex',
  '& > :not(style)': {
    marginTop: '20px',
    marginBottom: '20px',
    padding: '20px',
    width: '100%',
  },
}));

const ComponentProjectTitle = styled(Typography)(() => ({
  color: '#5d6d7a',
  fontWeight: 700,
  fontSize: 'larger',
}));

const ComponentProjectDescription = styled(Typography)(() => ({
  color: '#6f7c88',
  paddingTop: '10px',
  paddingBottom: '10px',
  fontSize: '14px',
}));

const PaymentDeliveryWrapper = styled(Grid)(({ theme }) => ({
  paddingLeft: '20px',
  paddingTop: '40px',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: '0px',
  },
}));

const PaymentDeliveryInfoWrapper = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const PlaceOrderWrapper = styled(Grid)(() => ({}));

const Checkout = () => {
  return (
    <ComponentBox>
      <Paper elevation={1}>
        <PaymentDeliveryWrapper container spacing={2}>
          <PaymentDeliveryInfoWrapper item xs={12} sm={7} lg={7} xl={7}>
            <DeliveryComponent />
            <PaymentComponent />
          </PaymentDeliveryInfoWrapper>
          <PlaceOrderWrapper item xs={12} sm={5} lg={5} xl={5}>
            <PayOrderComponent />
          </PlaceOrderWrapper>
        </PaymentDeliveryWrapper>
      </Paper>
    </ComponentBox>
  );
};

export default Checkout;
