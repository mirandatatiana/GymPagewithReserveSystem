"use client"
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingHistoryList from "./_components/BookingHistoryList"
import GlobalApi from '@/app/_service/GlobalApi'
import { useSession } from 'next-auth/react'
import moment from 'moment'

function MyBooking() {

    const {data}=useSession();
    const [bookingHistory,setBookingHistory]=useState([]);
    useEffect(()=>{
        data&&GetUserBookingHistory();
    },[data])

    /**
     * Used to Get User Booking History
     */
    const GetUserBookingHistory=()=>{
        GlobalApi.GetUserBookingHistory(data.user.email).then(resp=>{
            setBookingHistory(resp.bookings);
        })
    }

    const filterData=(type)=>{
        const result=bookingHistory.filter(item=>
            type=='booked'?
            new Date(item.date)>new Date()
            :new Date(item.date)<new Date());

            return result;
    }

    return (
        <div className='my-10 mx-5 md:mx-36'>
           <h2 className='font-bold text-[20px] my-2'>My Bookings</h2>
            <Tabs defaultValue="booked" className="w-full">
            
                <TabsContent value="booked">
                    <BookingHistoryList 
                    bookingHistory={bookingHistory}
                    type='booked'
                    />
                </TabsContent>
            
            </Tabs>

        </div>
    )
}

export default MyBooking