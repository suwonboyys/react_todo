import React, { useState } from 'react';

const Clock = () => {
  const [time, setTime] = useState([]);

  const currentTime = () => {
    const date = new Date();
    const years = String(date.getFullYear()).substring(2, 4);
    const months = String(date.getMonth()).padStart(2, '0');
    const days = String(date.getDay()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    // const seconds = String(date.getSeconds()).padStart(2, '0');
    setTime(`${years}/${months}/${days} ${hours}:${minutes}`);
  };

  const startTime = () => {
    setInterval(currentTime, 1000);
  };

  startTime();

  return (
    <>
      <h2 className="time">{time}</h2>
    </>
  );
};

export default Clock;
