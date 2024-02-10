'use client'

import React from 'react';
import {Event} from '@/types';
import {SignedIn, SignedOut, useUser} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import Checkout from "@/components/shared/Checkout";
import Link from "next/link";

const CheckoutButton = ({event}: { event: Event }) => {
  const {user} = useUser()
  const hasEventFinished = new Date(event?.endDateTime) < new Date()
  const userId = user?.publicMetadata?.userId as string
  debugger
  return (
    <div className='flex items-center gap-3'>
      {hasEventFinished ? (
        <p className='p-2 text-red-400'>Sorry, tickets are no longer available.</p>
      ) : <>
        <SignedOut>
          <Button asChild className='button rounded-full' size='lg'>
            <Link href='/sign-in'>
              Get Tickets
            </Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <Checkout event={event} userId={userId}/>
        </SignedIn>
      </>
      }
    </div>
  );
};

export default CheckoutButton;