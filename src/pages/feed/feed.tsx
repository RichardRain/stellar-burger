import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useState } from 'react';
import { useSelector } from '../../services/store';
import { getFeed, getFeedLoading } from '@slices';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(getFeed) ?? [];
  const isLoading = useSelector(getFeedLoading);

  const handleGetFeeds = () => {
    console.log('handleGetFeeds');
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
