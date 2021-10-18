var minutes
var seconds
var sessionLength
var breakLength
var minutesInterval = -1
var secondsInterval = -1

const init = () => {
    setDefaults()
}

function pad(val) {
    return ('00' + val).slice(-2)
}

function setDefaults() {
    minutes = 25
    seconds = '00'
    breakLength = 5
    sessionLength = 25

    document.getElementById('time-left').innerHTML = minutes + ':' + seconds
    document.getElementById('session-length').innerHTML = sessionLength
    document.getElementById('break-length').innerHTML = breakLength
}


function decrementSessionLength() {
    if (sessionLength >=2) {
        sessionLength -= 1
        document.getElementById('time-left').innerHTML = pad(sessionLength) + ':' + seconds
        document.getElementById('session-length').innerHTML = sessionLength
    }
}

function incrementSessionLength() {
    if (sessionLength <= 59) {
        sessionLength += 1
        document.getElementById('time-left').innerHTML = pad(sessionLength) + ':' + seconds
        document.getElementById('session-length').innerHTML = sessionLength
    }
}

function decrementBreakLength() {
    if (breakLength !== 1) {
        breakLength -= 1
        document.getElementById('break-length').innerHTML = breakLength
    }
}

function incrementBreakLength() {
    if (breakLength < 60) {
        breakLength += 1
        document.getElementById('break-length').innerHTML = breakLength
    }
}

function resetSession(){
    document.getElementById('session-increment').disabled = false
    document.getElementById('session-decrement').disabled = false
    clearSessionInterval()
    setDefaults()
    document.getElementById('beep').pause()
    document.getElementById('beep').currentTime = 0
}

function clearSessionInterval(){
    clearInterval(minutesInterval)
    clearInterval(secondsInterval)
}

function breakDown() {
    breakLength = pad(breakLength - 1)
    seconds = 59
    document.getElementById('time-left').innerHTML = breakLength + ':' + '00'
    minutesInterval = setInterval(minutesTimer, 60000)
    secondsInterval = setInterval(secondsTimer, 1000)
    function minutesTimer(){
        breakLength > 1 ? breakLength -= 1 : breakLength = breakLength
        document.getElementById('time-left').innerHTML = pad(breakLength) + ':' + pad(seconds)
    }
    function secondsTimer(){
        seconds -= 1
        document.getElementById('time-left').innerHTML = pad(breakLength) + ':' + pad(seconds)
        if (seconds <= 0){
            if (breakLength <= 0) {
                clearSessionInterval()
                document.getElementById('beep').play()
            }
            seconds = 60
        }
    }

}

function toggleStartStop() {
    //if paused start timer
    if (minutesInterval == -1 && secondsInterval == -1) {
        countDown()
    } else {
        // else pause

        console.log(minutes, seconds)
        clearSessionInterval()
        minutesInterval = -1
        secondsInterval = -1
    }
}

function countDown() {
    document.getElementById('session-increment').disabled = true
    document.getElementById('session-decrement').disabled = true
    
    minutes = pad(sessionLength - 1)
    seconds = 59
    document.getElementById('time-left').innerHTML = minutes + ':' + seconds
    minutesInterval = setInterval(minutesTimer, 60000)
    secondsInterval = setInterval(secondsTimer, 1000)
    function minutesTimer(){
        minutes -= 1
        document.getElementById('time-left').innerHTML = pad(minutes) + ':' + pad(seconds)
    }
    function secondsTimer(){
        seconds -= 1
        document.getElementById('time-left').innerHTML = pad(minutes) + ':' + pad(seconds)
        if (seconds <= 0){
            if (minutes <= 0) {
                clearSessionInterval()
                document.getElementById('beep').play()
                breakDown()
            }
            seconds = 60
        }
    }
}

window.onload = init         
