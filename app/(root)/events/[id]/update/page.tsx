import React from 'react';
import EventForm from "@/components/shared/EventForm";
import {auth} from "@clerk/nextjs";
import {getEventById} from "@/lib/actions/event.action";
import {SearchParamProps} from "@/types";
import * as z from "zod";
import {eventFormSchema} from "@/lib/validator";

const UpdateEvent = async ({params: {id}}: SearchParamProps) => {
  const {sessionClaims} = auth()
  const userId = (sessionClaims?.metadata as { userId: string })?.userId
  const event = await getEventById(id)

  const defaultValues = {
    imageUrl: event?.imageUrl,
    name: event?.name,
    description: event?.description,
    startDateTime: new Date(event?.startDateTime),
    endDateTime: new Date(event?.endDateTime),
    isFree: event?.isFree,
    price: event?.price,
    organizer: event?.organizer?._id,
    location: event?.location,
    capacity: event?.capacity, url: event?.url,
    categoryId: event?.category?._id,
    title: event.title

  } as z.infer<typeof eventFormSchema>

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
      </section>

      <div className="wrapper my-8">
        <EventForm
          defaultValues={defaultValues}
          userId={userId}
          eventId={event?._id}
          type="Update"
        />
      </div>
    </>
  );
};

export default UpdateEvent;