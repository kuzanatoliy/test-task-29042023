import { useDispatch as useOriginDispatch } from 'react-redux';

import { TDispatch } from '../store';

export const useDispatch = useOriginDispatch<TDispatch>;
