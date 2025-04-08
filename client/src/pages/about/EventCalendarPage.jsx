import React, { useState } from 'react';
import styled from 'styled-components';
import VGBBanner from '../../components/VGBBanner'; // Adjust the import path as necessary
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default react-calendar styles

const EventCalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Handle date change
  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <PageContainer>
      <VGBBanner 
        title="Event Calendar" 
        subtitle="Stay updated with our upcoming events" 
        backgroundImage="https://web-assets.same.dev/1306262657/3509351711.png" // You may change the background image as needed
      />
      <ContentWrapper>
        <CalendarContainer>
          <Calendar 
            onChange={onDateChange}
            value={selectedDate}
          />
        </CalendarContainer>
        <EventDetails>
          <h2>Selected Date: {selectedDate.toDateString()}</h2>
          <p>
            Event details for this date will be displayed here. You can replace this
            placeholder text with a list of events or further event information.
          </p>
        </EventDetails>
      </ContentWrapper>
    </PageContainer>
  );
};


// Styled Components
const PageContainer = styled.div`
  padding-bottom: 60px;
  background-color: #f8f9fa;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
`;

const CalendarContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  text-align: center;

  /* Customize react-calendar styles if needed */
  .react-calendar {
    width: 100%;
    border: none;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }
  .react-calendar__tile {
    padding: 10px 6.6667px;
  }
  .react-calendar__navigation {
    margin-bottom: 20px;
  }
`;

const EventDetails = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    color: #cd232e;
    margin-bottom: 20px;
  }
  p {
    color: #444;
    line-height: 1.8;
  }
`;
export default EventCalendarPage;