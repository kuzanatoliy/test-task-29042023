import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDebounce } from 'react-use';

import {
  fetchPersons,
  selectPersonsStatus,
  selectPersons,
  selectNextPersonsUrl,
  selectPreviousPersonsUrl,
  personsResetAction,
  useDispatch,
  useSelector,
} from '../../store';
import * as styles from './HomePage.styles';
import { ERequestStatus } from '../../types';
import { extractIdFromUrl } from '../../utils';

const DELAY = 500;

export const HomePage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get('search') || '');
  const navigate = useNavigate();
  const status = useSelector(selectPersonsStatus);
  const persons = useSelector(selectPersons);
  const nextUrl = useSelector(selectNextPersonsUrl);
  const previousUrl = useSelector(selectPreviousPersonsUrl);

  if (status === ERequestStatus.ERROR) {
    navigate('/error');
  }

  useDebounce(
    () => {
      dispatch(fetchPersons({ search }));
      setSearchParams({ search });
    },
    DELAY,
    [search]
  );

  useEffect(
    () => () => {
      dispatch(personsResetAction());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Container sx={styles.container}>
      <TextField
        defaultValue={search}
        onChange={(e) => setSearch(e.target.value)}
        id='search-input'
        label='Search'
        placeholder='Type search quary'
        size='small'
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <Box sx={styles.content}>
        {status === ERequestStatus.LOADING ||
        status === ERequestStatus.NOT_STARTED ? (
          <Typography variant='body1'>Loading...</Typography>
        ) : persons.length ? (
          <Grid container spacing={4}>
            {persons.map((person) => (
              <Grid key={person.created} item xs={3}>
                <Button
                  onClick={() =>
                    navigate(`/person/${extractIdFromUrl(person.url)}`)
                  }
                  variant='outlined'
                  fullWidth
                >
                  {person.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant='body1'>Not founded</Typography>
        )}
      </Box>
      <Box sx={styles.nav}>
        <Button
          onClick={() => dispatch(fetchPersons({ url: previousUrl as string }))}
          disabled={!previousUrl}
        >
          Back
        </Button>
        <Button
          onClick={() => dispatch(fetchPersons({ url: nextUrl as string }))}
          disabled={!nextUrl}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};
