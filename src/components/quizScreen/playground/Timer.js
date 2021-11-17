import React, { useState, useRef, useEffect } from 'react'
import SModal from './SModal.js'

const Timer = ({ time, timerState, setScreen}) => {
  const [show, setShow] = useState(false);
  const [timer, setTimer] = timerState
  const intervalRef = useRef(null)

  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor( (total/1000) % 60)
    const minutes = Math.floor( (total/1000/60) % 60)
    const hours = Math.floor( (total/1000*60*60) % 24)
    return { total, hours, minutes, seconds }
  }

  const startTimer = (deadline) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(deadline)
    if(total>=0) {
      setTimer(
        (hours > 9 ? hours : '0'+hours) + ':' +
        (minutes > 9 ? minutes : '0'+minutes) + ':' +
        (seconds > 9 ? seconds : '0'+seconds)
      )
    }else {
      setShow(true)
      clearInterval(intervalRef.current)
    }
  }

  const clearTimer = (endTime) => {
    setTimer(time)
    if(intervalRef.current) clearInterval(intervalRef.current)
    const id = setInterval(() => {
      startTimer(endTime)
    }, 1000)
    intervalRef.current = id
  }

  const getDeadlineTime = () => {
    let deadline = new Date()
    deadline.setSeconds(deadline.getSeconds() + parseInt(time[1])*60*60 + parseInt(time.substring(3, 5))*60 ) 
    return deadline
  }

  useEffect(() => {
    clearTimer(getDeadlineTime())
    return () => {if(intervalRef.current) clearInterval(intervalRef.current)}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <SModal setScreen={setScreen}  show={show} setShow={setShow}/>
      <span className="badge rounded-pill bg-white text-dark" style={{fontSize: "15px"}}>{timer}</span>
    </div>
  )
}

export default Timer
