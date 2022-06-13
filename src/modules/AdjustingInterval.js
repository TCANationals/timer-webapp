/**
* Self-adjusting interval to account for drifting
* From https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
*
* @param {function} workFunc  Callback containing the work to be done
*                             for each interval
* @param {int}      interval  Interval speed (in milliseconds)
* @param {function} errorFunc (Optional) Callback to run if the drift
*                             exceeds interval
*/
  export default function AdjustingInterval (workFunc, interval, errorFunc) {
    var that = this;
    var expected, timeout;
    this.interval = interval;

    this.start = function() {
        expected = (Math.floor(new Date().getTime() / 1000) * 1000) + this.interval;
        timeout = setTimeout(step, this.interval);
    }

    this.stop = function() {
        clearTimeout(timeout);
    }

    function step() {
        var drift = Date.now() - expected;
        if (drift > that.interval) {
            if (errorFunc) errorFunc();
        }
        workFunc();
        expected += that.interval * Math.floor(drift / that.interval);
        timeout = setTimeout(step, Math.max(0, that.interval-drift));
    }
  }
