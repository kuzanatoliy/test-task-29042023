import { useSelector as useOriginSelector } from 'react-redux';

import type { TRootState } from '../store';

export const useSelector = useOriginSelector<TRootState>;
