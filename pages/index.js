import { useState, useEffect } from "react";

export default function Home() {
  const [timeTogether, setTimeTogether] = useState({});

  useEffect(() => {
    const startDate = new Date("2023-03-30T00:00:00");

    const calculateTimeTogether = () => {
      const now = new Date();
      const difference = now - startDate;

      const milliseconds = difference % 1000;
      const totalSeconds = Math.floor(difference / 1000);
      const seconds = totalSeconds % 60;
      const totalMinutes = Math.floor(totalSeconds / 60);
      const minutes = totalMinutes % 60;
      const totalHours = Math.floor(totalMinutes / 60);
      const hours = totalHours % 24;

      let tempDate = new Date(startDate);
      let years = now.getFullYear() - tempDate.getFullYear();

      tempDate.setFullYear(tempDate.getFullYear() + years);
      if (tempDate > now) {
        years--;
        tempDate.setFullYear(tempDate.getFullYear() - 1);
      }

      let months = 0;
      while (tempDate <= now) {
        tempDate.setMonth(tempDate.getMonth() + 1);
        if (tempDate <= now) months++;
      }
      tempDate.setMonth(tempDate.getMonth() - 1);

      const days = Math.floor((now - tempDate) / (1000 * 60 * 60 * 24));

      setTimeTogether({ years, months, days, hours, minutes, seconds, milliseconds });
    };

    const interval = setInterval(calculateTimeTogether, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Time Together with Alinuta ❤️</h1>
      <p style={styles.since}>Since <strong>March 30, 2023</strong></p>
      <div style={styles.timer}>
        {timeTogether.years} years, {timeTogether.months} months, {timeTogether.days} days,
        {timeTogether.hours} hours, {timeTogether.minutes} minutes, {timeTogether.seconds} seconds,{" "}
        {timeTogether.milliseconds} milliseconds
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    textAlign: "center",
    backgroundColor: "#ffe4e1",
    color: "#d147a3",
    height: "100vh",
    margin: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: { fontSize: "2.5rem", margin: "20px 0" },
  since: { fontSize: "1.2rem", margin: "10px 0" },
  timer: {
    fontSize: "1.5rem",
    margin: "20px 0",
    padding: "10px",
    background: "#fff0f6",
    border: "3px solid #d147a3",
    borderRadius: "10px",
    width: "fit-content",
  },
};
