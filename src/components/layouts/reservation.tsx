'use client'
import React, { useState } from 'react'
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
import { Button } from '@/components/ui/button'
import { Col, Row } from 'antd'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ReservationData, reservationService } from '@/action/reservation'

const Reservation: React.FC = () => {
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState<Omit<ReservationData, 'date' | 'time'> & { time: string }>({
    customerName: '',
    customerEmail: '',
    time: '',
    person: '',
    description: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      customerName: '',
      customerEmail: '',
      time: '',
      person: '',
      description: ''
    })
    setDate(undefined)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) {
      toast.error('Please select a date')
      return
    }
    try {
      const reservationData: ReservationData = {
        ...formData,
        date: date,
        time: new Date(`${format(date, 'yyyy-MM-dd')}T${formData.time}:00`),
        person: formData.person
      }
      await reservationService.createReservation(reservationData)
      toast.success('Reservation created successfully!')
      resetForm()
    } catch (error) {
      console.error('Error creating reservation:', error)
      toast.error('Failed to create reservation. Please try again.')
    }
  }

  return (
    <div className="bg-gray-100" id='reservation'>
      <ToastContainer position="top-right" autoClose={5000} />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6 bg-gray-900 text-white">
              <h2 className="text-xl font-bold mb-2">RESERVE YOUR TABLE</h2>
              <h1 className="text-4xl font-serif mb-6 mt-6 ">Working hours (8.00 AM - 11.00 PM)</h1>
              <p className="mb-6 text-gray-300">We are excited to welcome you to ABC Restaurant! To ensure a seamless dining experience, please use our reservation system to book your table in advance.</p>
              <p className="mb-6 text-gray-300"> Whether you are planning a special celebration or just a casual meal, we are here to make your visit memorable.</p>
            </div>
            <div className="md:w-1/2 p-6 bg-gray-100">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <Row gutter={16}>
                  <Col span={12}>
                    <div>
                      <Label htmlFor="customerName">Name</Label>
                      <Input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        placeholder="Name"
                        required
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div>
                      <Label htmlFor="customerEmail">Email</Label>
                      <Input
                        type="email"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                      />
                    </div>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full md:w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
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
                          <Input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </Col>
                      <Col span={12}>
                        <div>
                          <Label htmlFor="person">Person</Label>
                          <Input
                            type="number"
                            name="person"
                            value={formData.person}
                            onChange={handleInputChange}
                            placeholder="Number of people"
                            required
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Type your message here."
                  />
                </div>
                <div>
                  <Button type="submit" className="w-full bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
                    Submit Reservation
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Reservation