import React, { useEffect, useState, useContext } from 'react'
import noteContext from "../context/notes/noteContext";
import Sound from './alarm.mp3';
import { useAuth0 } from "@auth0/auth0-react";
import { Howl } from 'howler';
export default function Alarm(props) {
  // console.log(props.type)

  const { loginWithRedirect } = useAuth0();
  const { logout, user, isAuthenticated, isLoading } = useAuth0();
  const note = props.notes;
  const [hh, sethh] = useState(0);
  const [mm, setmm] = useState(0);
  const [ss, setss] = useState(0);
  const [use, setuse] = useState(false);

  const [useAlarm, setuseAlarm] = useState(false);

  const [time, settime] = useState({ Hrs: 0, Min: 0, Sec: 0 });
  const context = useContext(noteContext);
  const { mailing } = context;
  const ref = context.ref;
  const mode = context.mode;
  useEffect(() => {

    var s1 = note.title + "sec";
    var s2 = note.title + "min";
    var s3 = note.title + "hrs";
    if (localStorage.getItem(s1) !== null || localStorage.getItem(s2) !== null || localStorage.getItem(s3) !== null) {
      var num1 = +localStorage.getItem(s3);
      sethh(num1);
      var num2 = +localStorage.getItem(s2);
      setmm(num2);
      var num3 = +localStorage.getItem(s1);
      setss(num3);
      setuse(true);
    }
    //console.log("     s   ========>  " + s1 + s2 + s3);
    //console.log(use + "use is thhhis  " + localStorage.getItem(s1) + " " + localStorage.getItem(s2) + " " + localStorage.getItem(s3));
  }, [useAlarm, use])


  const handelClick = (e) => {
    e.preventDefault();
    if ((time.Hrs !== 0 && time.Hrs !== "0") || (time.Min !== 0 && time.Min !== "0") || (time.Sec !== 0 && time.Sec !== "0")) {
      //console.log(time.Hrs + " " + time.Min + " " + time.Sec);
      var s1 = note.title + "sec";
      var s2 = note.title + "min";
      var s3 = note.title + "hrs";
      localStorage.setItem(s1, time.Sec);
      localStorage.setItem(s2, time.Min);
      localStorage.setItem(s3, time.Hrs);
      sethh(time.Hrs);
      setmm(time.Min);
      setss(time.Sec);
      setuse(true);
    }
    settime({ Hrs: 0, Min: 0, Sec: 0 });
  }

  const handelOnChange = (e) => {
    settime({ ...time, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    var s1 = note.title + "sec";
    var s2 = note.title + "min";
    var s3 = note.title + "hrs";
    const sound = new Howl({
      src: [Sound],
      loop: true,
    });
    let myInterval = setInterval(() => {

      if (use === true) {


        if (ss > 0) {
          localStorage.setItem(s1, (ss - 1).toString());
          setss(ss - 1);

        }
        if (ss === 0) {
          if (mm === 0) {
            if (hh === 0 && mm === 0 && ss === 0) {

              sound.play();
              clearInterval(myInterval);
              localStorage.removeItem(s1);
              localStorage.removeItem(s2);
              localStorage.removeItem(s3);
              window.alert("YOU ARE DONE WITH " + note.title);
              sound.pause();
              var str = new String(" WE ARE FROM MY-NOTES ! YOU HAVE TO READ  ");
              str = str + note.title;
              if (ref.current === false) { mailing(user.email, str, " YOUR NOTES 📖: " + note.description + '\n\n\n Please feel free to connect with developer -Akshit Tomar akshitt125@gmail.com'); }
              setuse(false);
            }
            else {
              localStorage.setItem(s3, (hh - 1).toString());
              sethh(hh - 1);

              setmm(59);

              localStorage.setItem(s2, '59');
              setss(59);
              localStorage.setItem(s1, '59');

            }
          } else {
            localStorage.setItem(s2, (mm - 1).toString());
            setmm(mm - 1);

            setss(59);
            localStorage.setItem(s1, '59');
          }
        }
      } else {
        clearInterval(myInterval);

      }
    }, 999)
    return () => {
      clearInterval(myInterval);
    };
  }, [mm, ss, hh]);









  return (
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      {props.show === "true" &&
        <div className='container'>
          {hh === 0 && mm === 0 && ss === 0
            && <div style={{ fontSize: "60%" }}className=''>
              <div className="dropdown  container ">
                <button className={mode==="dark"?"btn btn-outline-light btn-sm dropdown-toggle ":"btn btn-outline-dark btn-sm dropdown-toggle"} type="button" id={`${hh === 0 && mm === 0 && ss === 0 ? "dropdownMenuButton1" : ""}`} data-bs-toggle="dropdown" aria-expanded="false">
                  Add Timer<i className={useAlarm === true ? "fa fa-bell-o fa-shake" : "fa fa-bell-o"} aria-hidden="true"></i>
                </button>
                <ul className={mode==="dark"?"dropdown-menu bg-dark-subtle":"dropdown-menu "} aria-labelledby="dropdownMenuButton1">
                  <a href='/'></a>
                  <li><input type="number" className="dropdown-item" aria-label="Hrs" name='Hrs' value={time.Hrs === 0 ? "hh" : time.Hrs} placeholder="hh" onChange={handelOnChange} max="24" min="0" /></li>
                  <li><input type="number" className="dropdown-item" aria-label="Min" name='Min' value={time.Min === 0 ? "mm" : time.Min} placeholder="mm" onChange={handelOnChange} max="60" min="0" /></li>
                  <li><input type="number" className="dropdown-item" aria-label="Sec" name='Sec' value={time.Sec === 0 ? "ss" : time.Sec} placeholder="ss" onChange={handelOnChange} max="60" min="0" /></li>
                  <li> <small> <button style={{ color: "#004480", backgroundColor: "#d4dcf1",fontSize:"" ,fontFamily:"fantasy"}} disabled={time.Hrs === 0 && time.Min === 0 && time.Sec === 0} type="submit" className={mode==="dark"?"btn btn-secondary dropdown-item":"btn  dropdown-item"} onClick={handelClick}>ADD TIMER <i className="fa-solid fa-fade fa-stopwatch"></i></button></small></li>

                </ul>
              </div></div>}
          {(hh !== 0 || mm !== 0 || ss !== 0) &&
            <h6>
              <div className="dropdown container"><button className={mode==="dark"?"btn btn-outline-light btn-sm dropdown-toggle":"btn  btn-sm btn-outline-dark dropdown-toggle"} type="button" id={`${hh === 0 && mm === 0 && ss === 0 ? "dropdownMenuButton1" : ""}`} data-bs-toggle="dropdown" aria-expanded="false">Time Left:{hh < 10 ? `0${hh}` : hh}:{mm < 10 ? `0${mm}` : mm}:{ss < 10 ? `0${ss + "   "}    ` : ss + "   "}    <i className="fa-solid fa-trash" onClick={() => {
                var s1 = note.title + "sec";
                var s2 = note.title + "min";
                var s3 = note.title + "hrs";
                localStorage.removeItem(s1);
                localStorage.removeItem(s2);
                localStorage.removeItem(s3);
                sethh(0);
                setmm(0);
                setss(0);
                setuse(false);
              }}></i></button> <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">

                  <li><input type="number" className="dropdown-item" aria-label="Hrs" name='Hrs' value={time.Hrs} placeholder={hh} onChange={handelOnChange} max="24" min="0" /></li>
                  <li><input type="number" className="dropdown-item" aria-label="Min" name='Min' value={time.Min} placeholder={mm} onChange={handelOnChange} max="60" min="0" /></li>
                  <li><input type="number" className="dropdown-item" aria-label="Sec" name='Sec' value={time.Sec} placeholder={ss} onChange={handelOnChange} max="60" min="0" /></li>
                  <li> <small> <button style={{ color: "#004480", backgroundColor: "#d4dcf1" }} disabled={time.Hrs === 0 && time.Min === 0 && time.Sec === 0} type="submit" className="btn btn-secondary dropdown-item" onClick={handelClick}><h6><small>EDIT TIMER <i className="fa-solid fa-wand-magic-sparkles"></i></small></h6></button></small></li>

                </ul></div></h6>
          }
        </div>}
      {/* <div>
        <audio controls autoplay loop>
          <source src={Sound} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div> */}

    </div>
  )
}
