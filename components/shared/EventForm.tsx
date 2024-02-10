'use client'

import React, {useState} from 'react';

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {eventFormSchema} from "@/lib/validator";
import {eventDefaultValues} from "@/constants";
import Dropdown from "@/components/shared/Dropdown";
import {Textarea} from "@/components/ui/textarea";
import FileUploader from "@/components/shared/FileUploader";
import Image from "next/image";
import ReactDatePicker from "react-datepicker";
import {Checkbox} from "@/components/ui/checkbox";
import "react-datepicker/dist/react-datepicker.css";
import {useUploadThing} from '@/lib/uploadthing'
import {handleError} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {createEvent, updateEvent} from "@/lib/actions/event.action";

type EventFormProps = {
  userId: string,
  type: 'Create' | 'Update',
  eventId?: string,
  defaultValues?: z.infer<typeof eventFormSchema>
}
const EventForm = ({userId, type, eventId, defaultValues = eventDefaultValues}: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const router = useRouter()
  const {startUpload} = useUploadThing('imageUploader')
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const eventData = values;
    let uploadedImageUrl = values.imageUrl

    if (files.length > 0) {
      const uploadedImages = await startUpload(files)
      if (!uploadedImages) {
        return;
      }
      uploadedImageUrl = uploadedImages[0].url
    }
    if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: {...values, imageUrl: uploadedImageUrl},
          userId,
          path: '/profile'
        })
        if (newEvent) {
          form.reset()
          router.push(`/events/${newEvent._id}`)
        }
      } catch (e) {
        handleError(e)
      }
    } else if (type === "Update") {
      if (!eventId) {
        router.back()
        return;
      }
      try {
        const updatedEvent = await updateEvent({
          event: {...eventData, imageUrl: uploadedImageUrl, _id: eventId},
          userId,
          path: `/events/${eventId}`
        })
        if (updatedEvent) {
          form.reset()
          router.push(`/events/${updatedEvent._id}`)
        }
      } catch (e) {
        handleError(e)
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8">

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input placeholder="Event title" {...field} className='input-field'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({field}) => (
              <FormItem className='w-full'>
                <Dropdown
                  onChangeHandler={field.onChange}
                  value={field.value}
                />
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Textarea placeholder="Description" {...field}
                            className='textarea rounded-2xl h-72'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({field}) => (
              <FormItem className='w-full'>
                <FormControl>
                  <FileUploader imageUrl={field.value} onFieldChange={field.onChange} setFiles={setFiles}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>
          <FormField
            control={form.control}
            name="location"
            render={({field}) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex-center pl-2 h-[54px] w-full overflow-hidden rounded-full bg-gray-100 py-2'>
                    <Image src='/assets/icons/location-grey.svg'
                           width={24}
                           height={24}
                           alt='calendar'/>
                    <Input placeholder="Event location or Online" {...field} className='input-field'/>
                  </div>
                </FormControl>

                <FormMessage/>
              </FormItem>
            )}
          />
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>


          <FormField
            control={form.control}
            name="startDateTime"
            render={({field}) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex-center pl-2 h-[54px] w-full overflow-hidden rounded-full bg-gray-100 py-2'>
                    <Image src='/assets/icons/calendar.svg'
                           width={24}
                           height={24}
                           alt='calendar'/>
                    <p className='ml-3 whitespace-nowrap text-grey-600'>Start date:</p>

                    <ReactDatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel={"Time:"}
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />

                  </div>
                </FormControl>

                <FormMessage/>
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="endDateTime"
            render={({field}) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex-center pl-2 h-[54px] w-full overflow-hidden rounded-full bg-gray-100 py-2'>
                    <Image src='/assets/icons/calendar.svg'
                           width={24}
                           height={24}
                           alt='calendar'/>
                    <p className='ml-3 whitespace-nowrap text-grey-600'>End date:</p>

                    <ReactDatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel={"Time:"}
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />

                  </div>
                </FormControl>

                <FormMessage/>
              </FormItem>
            )}
          />

        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({field}) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex-center pl-2 h-[54px] w-full overflow-hidden rounded-full bg-gray-100 py-2'>
                    <Image src='/assets/icons/dollar.svg'
                           width={24}
                           height={24}
                           alt='dollar'/>

                    <Input type="number"
                           placeholder="Price"
                           {...field}
                           className="p-regular-16 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 border-0
                    bg-grey-50"/>
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({field}) => (
                        <FormItem className="mr-2">
                          <FormControl>
                            <div className='flex items-center'>
                              <label htmlFor="isFree"
                                     className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free
                                Ticket</label>
                              <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500"/>
                            </div>
                          </FormControl>

                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>

                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({field}) => (
              <FormItem className='w-full'>
                <FormControl>
                  <div className='flex-center pl-2 h-[54px] w-full overflow-hidden rounded-full bg-gray-100 py-2'>
                    <Image src='/assets/icons/link.svg'
                           width={24}
                           height={24}
                           alt='link'/>
                    <Input placeholder="URL" {...field} className='input-field'/>
                  </div>
                </FormControl>

                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
          type="submit"
          size="lg">{type} Event</Button>
      </form>
    </Form>
  );
};

export default EventForm;