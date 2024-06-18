import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getUserOrders, fetchUserOrders, fetchFeed } from '@slices';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getUserOrders) || [];

  useEffect(() => {
    dispatch(fetchUserOrders());
    dispatch(fetchFeed());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
