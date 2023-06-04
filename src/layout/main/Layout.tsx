import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Grid, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import BackgroundLayout from '../backgroundLayout';

const ComponentBox = styled(Box)(({}) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

const ComponentAppBar = styled(AppBar)(({}) => ({
  backgroundColor: 'white',
  color: 'black',
  padding: '0 calc(max((100vw - min(760px, 100%)) / 5, 10px))',
  boxShadow:
    '0px 2px 4px -1px rgba(0,0,0,0.03), 0px 4px 5px 0px rgba(0,0,0,0.03), 0px 1px 10px 0px rgba(0,0,0,0.03)',
}));

const ComponentToolbar = styled(Toolbar)(({}) => ({
  paddingLeft: '0px !important',
  paddingRight: '0px !important',
}))

const ComponentInnerBox = styled(Box)(({}) => ({
  flex: 1,
  minHeight: 'calc(100vh)',
  padding: '0 calc(max((100vw - min(760px, 100%)) / 5, 10px))',
}))

const ComponentFooterGrid = styled(Grid)(({}) => ({
  padding: '0 calc(max((100vw - min(760px, 100%)) / 5, 10px))',
  paddingTop: '30px',
  paddingBottom: '40px',
  background: '#fafafa'
}))

const ComponentLazyLoadImage = styled(LazyLoadImage)(({}) => ({
  cursor: 'pointer',
  height: "50px",
  width: "162px",
}))

export default function Layout(props: any) {
  return (
    <ComponentBox>
      <ComponentAppBar position="sticky">
        <ComponentToolbar>
        </ComponentToolbar>
      </ComponentAppBar>

      <BackgroundLayout>
        <ComponentInnerBox>
          {props.children}
        </ComponentInnerBox>
      </BackgroundLayout>

      <ComponentFooterGrid container spacing={1} />
    </ComponentBox>
  );
}
