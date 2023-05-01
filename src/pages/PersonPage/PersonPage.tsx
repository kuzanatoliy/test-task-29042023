import { useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import {
  fetchPerson,
  selectPersonStatus,
  selectPerson,
  useDispatch,
  useSelector,
} from '../../store';

import * as styles from './PersonPage.styles';
import { ERequestStatus } from '../../types';

export const PersonPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const status = useSelector(selectPersonStatus);
  const person = useSelector(selectPerson);

  if (status === ERequestStatus.ERROR) {
    navigate('/error');
  }

  useEffect(() => {
    dispatch(fetchPerson({ id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container sx={styles.container}>
      <Box sx={styles.content}>
        {status === ERequestStatus.LOADING ? (
          <Typography variant='body1'>Loading...</Typography>
        ) : (
          <>
            <Typography variant='h2'>{person?.name}</Typography>
            <Box>
              <Typography variant='body1' component='span'>
                {'Birth year: '}
              </Typography>
              <Typography variant='body1' component='span'>
                {person?.birth_year}
              </Typography>
            </Box>
            <Box>
              <Typography variant='body1' component='span'>
                {'Eye color: '}
              </Typography>
              <Typography variant='body1' component='span'>
                {person?.eye_color}
              </Typography>
            </Box>
            <Box>
              <Typography variant='body1' component='span'>
                {'Gender: '}
              </Typography>
              <Typography variant='body1' component='span'>
                {person?.gender}
              </Typography>
            </Box>
          </>
        )}
      </Box>
      <Box sx={styles.nav}>
        <Button variant='contained' onClick={() => navigate('/home')}>
          Back
        </Button>
      </Box>
    </Container>
  );
};
