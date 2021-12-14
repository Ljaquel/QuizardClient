import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/auth'
import Question from './playground/Question'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_USER, CREATE_RESULT, FETCH_RESULTS_QUERY, UPDATE_RESULT, UPDATE_QUIZ_MUTATION } from '../../Calls'
import QuizInSessionNav from './playground/QuizInSessionNav'
import moment from 'moment'
import { getLevel } from "../../util/level";

const badgesImages = {
  
}

const QuizInSession = ({ user, quiz, setScreen}) => {
  const { contextUserId } = useContext(AuthContext)
  const [record, setRecord] = useState([])
  const [time] = useState(quiz?.time)
  const [timer, setTimer] = useState("00:00:00")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answer, setAnswer] = useState(null)

  const { content, style, backgroundImage } = quiz
  const count = content.length

  useEffect(() => {
    document.addEventListener("keydown", handleDocumentKeyPress);
    return () => {
      document.removeEventListener("keydown", handleDocumentKeyPress);
    }
  })

  const [ updateUser ] = useMutation(UPDATE_USER, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { userId: contextUserId }
  });

  const [ updateQuiz ] = useMutation(UPDATE_QUIZ_MUTATION, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { quizId: quiz._id }
  });

  const [ createResult ] = useMutation(CREATE_RESULT, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { input: {} }
  });

  const [ updateResult ] = useMutation(UPDATE_RESULT, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { }
  });

  const { data, refetch } = useQuery(FETCH_RESULTS_QUERY, {
    onError(err) { console.log(JSON.stringify(err, null, 2)) },
    variables: { filters: { quizId: quiz._id, userId: contextUserId } }
  });

  useEffect(() => {
    refetch()
  }, [refetch]);

  const result = data?.getResults[0]

  const handleDocumentKeyPress = (e) => {
    if (e.keyCode === 13 && canGoNext) {
      console.log(answer)
      e.preventDefault();
      goNextQ();
    }
  };

  const goNextQ = () => {
    let newRecord = [...record]
    newRecord.push({ answer:answer, correct:answer===content[currentQuestion].answer })
    setRecord(newRecord)
    if(currentQuestion === count-1) {
      finishQuiz(newRecord)
    }
    else {
      setAnswer(null)
      setCurrentQuestion(currentQuestion+1)
    }
  }

  const finishQuiz = async (rec) => {
    let score = getScore(rec)
    let time = getTime(timer)
    let record = rec.map((x) => x.answer)

    if(result === null || result === undefined ) {
      let newResult = {
        userId: contextUserId,
        quizId: quiz._id,
        score: score,
        time: time,
        lastTime: time,
        timesTaken: 1,
        badge: score>=60 ?{
          key: score===100?'gold':score>=80?'silver':'bronze',
          title: score===100?'Gold Trophy':score>=80?'Silver Trophy':'Bronze Trophy',
          description: score===100?'For scoring 100 points':score>=80?'For scoring 80+ points':'For scoring 60+ points',
          quiz: quiz._id,
          createdAt: new Date().toISOString(),
        } : {},
        badges: [],
        record: record,
        last: score,
        lastRecord: record
      }
      createResult({ variables: { input: {...newResult} }})
      let points = user.points + score;
      let level = getLevel(user.level, points);
      let updates = { points, level };
      updateUser({ variables: { update: updates }})
      updateQuiz({ variables: { update: { timesPlayed: quiz.timesPlayed+1, usersThatPlayed: quiz.usersThatPlayed+1 } }})
    }
    else {
      if(result.score < score) {
        updateResult({ variables: { resultId: result._id, update: { score: score, time: time, record: rec.map((x) => x.answer), last: score, lastRecord: record, lastTime: time, timesTaken: result.timesTaken+1 } }})
        const points = user.points - result.score + score;
        const level = getLevel(user.level, points);

        let badge = score>=60 ?
        {
          key: score===100?'gold':score>=80?'silver':'bronze',
          title: score===100?'Gold Trophy':score>=80?'Silver Trophy':'Bronze Trophy',
          description: score===100?'For scoring 100 points':score>=80?'For scoring 80+ points':'For scoring 60+ points',
          quiz: quiz._id,
          createdAt: new Date().toISOString(),
        } : {}

        let updates = { points, level, badge };
        updateUser({ variables: { update: updates }})
        updateQuiz({ variables: { update: { timesPlayed: quiz.timesPlayed+1 } }})
      }
      else if(score <= result.score) {
        let updates = { last: score, lastRecord: record, lastTime: time, timesTaken: result.timesTaken+1 }
        if(score === result.score && time < result.time) updates = {...updates, time: time}
        updateResult({ variables: { resultId: result._id, update: updates }})
        updateQuiz({ variables: { update: { timesPlayed: quiz.timesPlayed+1 } }})
      }
    }
    setCurrentQuestion(currentQuestion+1)
    await new Promise(r => setTimeout(r, 1500));
    setScreen(3)
  }

  const canGoNext = answer >= 0 && answer !== null && answer !== undefined && currentQuestion >= 0 && currentQuestion < count

  const progressPercentage = Math.floor(currentQuestion/count*100) + "%"

  const getScore = (rec) => {
    let correct = 0
    for(let i = 0; i < count; i++) { if(rec[i].correct) correct = correct+1 }
    return Math.floor(correct/count*100)
  }

  const getTime = (timer) => {
    let time1 = moment(quiz.time, "hh:mm:ss");
    let time2 = moment(timer, "hh:mm:ss");
    let subtract = time1.subtract(time2);
    let format = moment(subtract).format("mm:ss")
    console.log('quiz.time: ' + quiz.time + ' timer: ' + timer + ' result: ' + subtract)
    return '00:'+format
  }

  const backgroundStyle = backgroundImage?.url ? 
    {backgroundImage: `url("${backgroundImage.url}")`, backgroundPosition: 'center', backgroundSize: 'cover', repeat: 'no-repeat'} :
    {backgroundColor: style?style.backgroundColor:"#abafbb"} 

  return (
    <>
      <QuizInSessionNav count={count} currentQuestion={currentQuestion} time={time} timerState={[timer, setTimer]} answer={answer} setScreen={setScreen}/>
      <div className="container-fluid text-white workspace-container p-5 pt-2 flex-grow-1" style={backgroundStyle}>
        <div className="container-fluid">
          <div className="row pb-5 pt-2">
            <div className="col"></div>
            <div className="col-8">
              <div className="progress" style={{height: "12px"}}>
                <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{width: progressPercentage}}
                  aria-valuenow="25" aria-valuemin="0" aria-valuemax={"100"}> {progressPercentage} </div>
              </div>
            </div>
            <div className="col"></div>
          </div>
          <div className="row py-5 justify-content-center">
            <div className="col-lg-6 col justify-content-center">
              {(currentQuestion >= 0) && (currentQuestion < count) && <Question question={content[currentQuestion]} style={style} answer={answer} setAnswer={setAnswer} /> }
              { currentQuestion === count && 
                <div className="row mt-5">
                  <div className="col"></div>
                  <div className="col-auto bg-dark p-5 rounded">
                    <h2>You have finished the Quiz!</h2>
                  </div>
                  <div className="col"></div>
                </div> }
            </div>
          </div>
          <div className="row pb-5 pt-2">
            <div className='col'></div>
            <div className="col-auto align-self-center">
              {currentQuestion !== count && <button className="btn btn-sm btn-light text-dark" disabled={!canGoNext} onClick={() => goNextQ() }>{currentQuestion === count-1 ? "Finish" : "Next Question"}</button> }
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuizInSession