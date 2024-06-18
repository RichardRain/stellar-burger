import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserData } from '@slices';

export const AppHeader: FC = () => {
  const user = useSelector(getUserData);
  const userName = user?.name ?? '';
  return <AppHeaderUI userName={userName} />;
};
