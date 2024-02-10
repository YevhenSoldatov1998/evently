import React from 'react';
import {Event} from '@/types'
import Card from "@/components/shared/Card";

type CollectionProps = {
  data: Event[],
  emptyTitle: string,
  emptyStateSubtext: string,
  limit: number,
  page: number,
  totalPages?: number,
  collectionType?: 'Events_Organizer' | 'My_Tickers' | 'All_Events',
  urlParamName?: string
}
const Collection = ({
                      data,
                      emptyTitle,
                      emptyStateSubtext,
                      page,
                      totalPages = 0,
                      collectionType,
                      urlParamName,
                      limit
                    }: CollectionProps) => {
  return (
    <>
      {data?.length > 0 ? (
        <div className='flex flex-col items-center gap-10'>
          <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
            {data.map((event, index) => {
              const hasOrderLink = collectionType === 'Events_Organizer';
              const hidePrice = collectionType === 'My_Tickers';

              return (
                <li key={event?._id}
                    className='flex justify-center'
                >
                  <Card
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />

                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div
          className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center'>
          <h3 className='p-bold-20 md:h5-bold'>{emptyTitle}</h3>
          <h3 className='p-regular-14'>{emptyStateSubtext}</h3>
        </div>
      )}
    </>
  );
};

export default Collection;