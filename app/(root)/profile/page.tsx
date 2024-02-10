import {Button} from '@/components/ui/button';
import React from 'react';
import Link from "next/link";
import Collection from "@/components/shared/Collection";
import {auth} from "@clerk/nextjs";
import {getEventsByUser} from "@/lib/actions/event.action";

const ProfilePage = async () => {
  const {sessionClaims} = auth()
  const userId = (sessionClaims?.metadata as { userId: string })?.userId
  const organizedEvents = await getEventsByUser({
    userId, page: 1
  })
  return (
    <>
      <section className='bg-primary-50 bg-dotten-pattern bg-cober bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>My Tickets</h3>
          <Button size="lg" asChild className={'button hidden sm:flex'}>
            <Link href={`/#events`}>
              Explore More Events
            </Link>
          </Button>
        </div>
      </section>
      {/*<section className='wrapper my-8'>*/}
      {/*  <Collection*/}
      {/*    data={events?.data ?? []}*/}
      {/*    emptyTitle="No event tickets purchased yet"*/}
      {/*    emptyStateSubtext="No worries, you can explore more events and purchase tickets."*/}
      {/*    collectionType="My_Tickers"*/}
      {/*    limit={3}*/}
      {/*    page={1}*/}
      {/*    urlParamName={'ordersPage'}*/}
      {/*    totalPages={2}*/}
      {/*  />*/}
      {/*</section>*/}

      <section className='bg-primary-50 bg-dotten-pattern bg-cober bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>Events organized</h3>
          <Button size="lg" asChild className={'button hidden sm:flex'}>
            <Link href={`/events/create`}>
              Create new event
            </Link>
          </Button>
        </div>
      </section>
      <section className='wrapper my-8'>
        <Collection
          data={organizedEvents?.data ?? []}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organizer"
          limit={6}
          page={1}
          urlParamName={'eventsPage'}
          totalPages={2}
        />
      </section>
    </>
  );
};

export default ProfilePage;