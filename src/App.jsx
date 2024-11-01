import { useEffect, useState } from "react";
import "./index.css";
import moment from "moment";

import Prayer from "./components/Prayer";
function App() {
  const formattedDate = moment().format("h:mm A");
  const dateLibarary = moment().format("DD-MM-YYYY"); // 11/01/2024
  const [proyerTime, setProyerTime] = useState({});
  const [dateDay, setDateDay] = useState({});
  const [city, setcity] = useState("Cairo");
  const cities = [
    { name: "القاهرة", value: "Cairo" },
    { name: "الزقازيق", value: "Zagazig" },
    { name: "منيا القمح", value: "Minya Al Qamh" },
    { name: "الاسكندرية", value: "Alexandria" },
    { name: "الجيزة", value: "Giza" },
    { name: "المنصورة", value: "Mansoura" },
    { name: "اسوان", value: "Aswan" },
    { name: "الاقصر", value: "Luxor" },
  ];
  useEffect(() => {
    async function proyerTime() {
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/${dateLibarary}?city=${city}&country=Egypt`
        );
        const dataTime = await res.json();
        setProyerTime(dataTime.data.timings);
        setDateDay(dataTime.data.date.gregorian);
      } catch (error) {
        console.log(error);
      }
    }
    proyerTime();
  }, [city]);
  function formatTime(time) {
    if (!time) {
      return "00:00";
    }
    let [hours, minutes] = time.split(":").map(Number); //3:20
    const pers = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${pers}`;
  }
  return (
    <div className="body">
      <div className="conatner">
        <div className="header">
          <div className="top">
            <div className="city">
              <h3>المدينة</h3>
              <select onChange={(e) => setcity(e.target.value)}>
                {cities.map((e) => (
                  <option key={e.value} value={e.value}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="date">
              <h3>التاريخ</h3>
              <h4>{dateDay.date}</h4>
            </div>
          </div>
          <div className="time">
            <h5>الساعة</h5>
            <h4>{formattedDate}</h4>
          </div>
        </div>

        <div className="buttom">
          <Prayer name={"الفجر"} time={formatTime(proyerTime.Fajr)} />
          <Prayer name={"الظهر"} time={formatTime(proyerTime.Dhuhr)} />
          <Prayer name={"العصر"} time={formatTime(proyerTime.Asr)} />
          <Prayer name={"المغرب"} time={formatTime(proyerTime.Maghrib)} />
          <Prayer name={"العشاء"} time={formatTime(proyerTime.Isha)} />
        </div>
      </div>
    </div>
  );
}

export default App;
