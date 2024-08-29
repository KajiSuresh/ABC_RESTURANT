'use client'
import Head from 'next/head'
import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from '../ui/button'
import { Col, Row } from 'antd'



const Reservation = () => {
  const [date, setDate] = React.useState<Date>()
  return (
    <div className="bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6 bg-gray-900 text-white">
              <h2 className="text-xl font-bold mb-2">RESERVE YOUR TABLE</h2>
              <h1 className="text-4xl font-serif mb-6 mt-6 ">Working hours (8.00 AM - 11.00 PM)</h1>
              <p className="mb-6 text-gray-300">We are excited to welcome you to ABC Restaurant! To ensure a seamless dining experience, please use our reservation system to book your table in advance.</p>
              <p className="mb-6 text-gray-300"> Whether you are planning a special celebration or just a casual meal, we’re here to make your visit memorable.</p>
              {/* <div className="space-x-4">
                <button className="bg-yellow-500 text-black px-4 py-2 rounded">RESERVATION</button>
                <button className="border border-white px-4 py-2 rounded">CONTACT US</button>
              </div> */}
            </div>
            <div className="md:w-1/2 p-6 bg-gray-100">
              <form className="space-y-4">
                <Row gutter={16}>
                  <Col span={12}>
                    <div>
                      <Label htmlFor="username">UserName</Label>
                      <Input type="name" placeholder="Name" />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input type="email" placeholder="Email" />
                    </div>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                  <Label htmlFor="date">Date</Label>
                    <Popover >
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[310px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </Col>
                  <Col span={12}>
                  <Row gutter={16}>
                  <Col span={12}>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input type="number" placeholder="Time" />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div>
                      <Label htmlFor="personn">Person</Label>
                      <Input type="number" placeholder="Person" />
                    </div>
                  </Col>
                  </Row>
                  </Col>

                </Row>
                <div>
                  <Label htmlFor="picture">Description</Label>
                  <Textarea placeholder="Type your message here." />
                </div>

                <div>
                  <button type="submit" className="w-full bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* <div className="mt-8 bg-white shadow-lg rounded-lg">
          <div className=" grid grid-cols-2 md:grid-cols-4 gap-6 text-center p-6">
            <div>
              <h2 className="text-4xl font-bold">200+</h2>
              <p className="text-gray-600">VISITORS DAILY</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold">400+</h2>
              <p className="text-gray-600">DELIVERIES MONTHLY</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold">100%</h2>
              <p className="text-gray-600">POSITIVE FEEDBACK</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold">40+</h2>
              <p className="text-gray-600">AWARDS AND HONORS</p>
            </div>
          </div>
        </div> */}


      </main>
    </div>
  )
}

export default Reservation
