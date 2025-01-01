import './App.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useState } from 'react';
import interactionPlugin from "@fullcalendar/interaction";
import CreateEvent from './components/createEvent';

function App() {

  const [eventData, setEventData] = useState([])
  const [createEventPopUp, setCreateEventPopUp] = useState<boolean>(false)
  const [currentSelectedData, setCurrentSelectedDate] = useState('')
  const [selectedDateLocation, setSelectedDateLocation] = useState({})

  const socket = new WebSocket('ws://localhost:8080');

  function handle(event: any) {
    console.log(event)
    setCurrentSelectedDate(event.dateStr)
    setSelectedDateLocation({ top: event.jsEvent.clientY, left: event.jsEvent.clientX })
    setCreateEventPopUp(true)
  }

  function handleDate(eventData: { title: string, startDate: string, endDater: string }) {
    console.log(eventData)
    socket.send(JSON.stringify({ ...eventData, type: 'createEvent' }))
    socket.onmessage = (event) => {
      const eventData = JSON.parse(event.data)
      console.log(eventData)
      if (eventData.type == "EVENT_CREATED") {
        const { selectedDate: date, startTime: start, endTime: end, eventName: title } = eventData.event
        setEventData((prev) => [...prev, { date, start, end, title }] as any)
      }
    }
  }
  console.log(currentSelectedData)
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={eventData}
        dateClick={handle}
      />
      <div>
        {
          createEventPopUp && (
            <CreateEvent
              isOpen={createEventPopUp}
              currentSelectedData={currentSelectedData}
              onClose={() => setCreateEventPopUp(false)}
              onSave={handleDate}
              selectedDateLocation={selectedDateLocation}
            />
          )
        }
      </div>
    </>
  )
}

export default App
