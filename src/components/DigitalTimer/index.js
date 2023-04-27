// Write your code here

import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeLimitInMinutes: 25,
  timeElapsedInSeconds: 0,
}
class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  onIncreaseValue = () => {
    this.setState(prevState => ({
      timeLimitInMinutes: prevState.timeLimitInMinutes + 1,
    }))
  }

  onDecreaseValue = () => {
    const {timeLimitInMinutes} = this.state
    if (timeLimitInMinutes > 1) {
      this.setState(prevState => ({
        timeLimitInMinutes: prevState.timeLimitInMinutes - 1,
      }))
    }
  }

  renderTimerLimitController = () => {
    const {timeElapsedInSeconds, timeLimitInMinutes} = this.state
    const isButtonDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="time-limit-label">Set Timer Limit</p>
        <div className="timer-limit-controller">
          <button
            type="button"
            className="limit-controller-button"
            disabled={isButtonDisabled}
            onClick={this.onIncreaseValue}
          >
            +
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timeLimitInMinutes}</p>
          </div>
          <button
            type="button"
            className="limit-controller-button"
            disabled={isButtonDisabled}
            onClick={this.onDecreaseValue}
          >
            -
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  timeIncrementInSeconds = () => {
    const {timeLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timeLimitInMinutes,
    } = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.timeIncrementInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state

    const playOrPauseImage = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const playOrPauseLabel = isTimerRunning ? 'Pause' : 'Start'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          type="button"
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            alt={startOrPauseAltText}
            className="timer-controller-icon"
            src={playOrPauseImage}
          />
          <p className="timer-controller-label">{playOrPauseLabel}</p>
        </button>

        <button
          type="button"
          className="timer-controller-btn"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  renderTimerFormat = () => {
    const {timeLimitInMinutes, timeElapsedInSeconds} = this.state

    const totalRemainingSeconds = timeLimitInMinutes * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const timeLabel = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container ">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">{this.renderTimerFormat()}</h1>
              <p className="timer-state">{timeLabel}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
