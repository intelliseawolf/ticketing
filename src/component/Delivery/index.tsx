import { Grid, styled, Typography } from '@mui/material';
import { deliveryDescription, deliveryTitle } from '../../constants';

const ComponentDeliveryDescription = styled(Typography)(() => ({
  color: '#6f7c88',
  paddingTop: '10px',
  paddingBottom: '10px',
  fontSize: '14px'
}))

const DeliveryComponent = styled(Grid)(() => ({
  width: '100%',
  padding: '20px',
  border: '1px solid #d6d6d6',
  borderRadius: '3px',
  marginBottom: '10px'
}))

export const Delivery = () => {
  return (
    <DeliveryComponent>
      <Grid display={'flex'} alignItems={'center'}>
        <Typography variant='h6' sx={{ fontWeight: 600, paddingBottom: '5px' }}>
          Delivery 
        </Typography>
        <img
            src={'/success.png'}
            alt={'success-icon'}
            loading="lazy"
            height={'30px'}
            width={'35px'}
            style={{ paddingBottom: '5px' }}
          />
      </Grid>
      <Typography sx={{ fontWeight: 600 }}>
        Mobile Entry - Free
      </Typography>
      <ComponentDeliveryDescription>
        {deliveryTitle} <br/>
        {deliveryDescription}
      </ComponentDeliveryDescription>
    </DeliveryComponent>
  )
}
