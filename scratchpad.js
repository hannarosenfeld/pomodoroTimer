        <script>
         var minutes = 25
         var seconds = '00'
         var sessionLength = 25
         var breakLength = 5
         
         const init = () => {
             setDefaults()
         }

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

         function decrementSessionLength() {
             if (sessionLength >=2) {
                 sessionLength -= 1
                 document.getElementById('time-left').innerHTML = pad(sessionLength) + ':' + seconds
                 document.getElementById('session-length').innerHTML = sessionLength
             }
         }

         function incrementSessionLength() {
             if (sessionLength >= 59) {
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

         function breakDown() {
             document.getElementById('time-left').innerHTML = pad(breakLength) + ':' + pad(seconds)
         }

         function minutesTimer(){
             minutes -= 1
             document.getElementById('time-left').innerHTML = minutes + ':' + seconds
         }
         
         function secondsTimer(){
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
         
         function setSessionTimer() {
             var minutes_interval = setInterval(minutesTimer, 60000)
             var seconds_interval = setInterval(secondsTimer, 1000)
             minutesTimer()
             secondsTimer()
         }

         function countDown() {
             minutes = pad(sessionLength - 1)
             seconds = 59
             document.getElementById('time-left').innerHTML = minutes + ':' + seconds
             setSessionTimer()
         }

window.onload = init         
</script>
