$( document ).ready(function() {
    let minutes = 25
    let seconds = '00'
    let sessionLength = 25
    let breakLength = 5
    let minutes_interval = setInterval(minutesTimer, 60000)
    let seconds_interval = setInterval(secondsTimer, 1000)

    const init = () => {
        setDefaults()
    }
    window.onload = init
    
    function pad(val) {
        return ('00' + val).slice(-2)
    }

    function setDefaults() {
        let timeLeft = document.getElementById('time-left')
        let breakLength = document.getElementById('break-length')
        let sessionLength = document.getElementById('session-length')

        timeLeft.innerHTML = minutes + ':' + seconds
        breakLength.innerHTML = 5
        sessionLength.innerHTML = minutes
    }

    $('start').click(function(){
        minutesTimer()
        secondsTimer()
    })
    
    const minutesTimer = () => {
        minutes -= 1
        document.getElementById('time-left').innerHTML = minutes + ':' + seconds
    }
    
    const secondsTimer = () => {
        seconds -= 1
        document.getElementById('time-left').innerHTML = pad(minutes) + ':' + pad(seconds)
        if (seconds <= 0){
            if (minutes <= 0) {
                clearInterval(minutes_interval)
                clearInterval(seconds_interval)
                document.getElementById('beep').play()
                breakDown()
            }
            seconds = 60
        }
    }

    
    console.log( "ready!" );
});
