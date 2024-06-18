import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed, getFeedLoading } from '@slices';
import { fetchFeed } from '@slices';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getFeed) ?? [];
  const isLoading = useSelector(getFeedLoading);

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  return (
    <>
      {!isLoading ? (
        <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />
      ) : (
        <Preloader />
      )}
    </>
  );
};
