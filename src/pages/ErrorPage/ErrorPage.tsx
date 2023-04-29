import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

import * as styles from './ErrorPage.styles';

export const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <Container sx={styles.container}>
      <Typography variant='h2' component='h2'>
        404 - Page not found
      </Typography>
      <Typography variant='body1'>
        The page cannot be reached. Check if it exists
      </Typography>
      <Button
        variant='contained'
        onClick={() => navigate('/home')}
        endIcon={<ArrowForward />}
      >
        Go to home
      </Button>
    </Container>
  );
};
