import React, { useEffect, useState } from 'react';

type Props = {
    now: number, epoch: number, loading: boolean
}
type Time = {
    secs: string | null, mins: string | null, hours: string | null
}
const TimeDiff = ({ now, epoch, loading }: Props) => {
    const [time, setTime] = useState<Time>({ secs: null, mins: null, hours: null })
    useEffect(() => {
        if (!loading && epoch > 0 && now > 0) {
            let timediff = now - epoch;
            let seconds = Math.round(timediff);
            let mins = seconds / 60
            let hours = mins / 60
            let converted_secs = seconds - Math.floor(mins) * 60;
            let converted_mins = mins - Math.floor(hours) * 60;
            if (mins < 1) {
                let s = (seconds < 10) ? `0${seconds}` : seconds;
                let m = '00';
                let h = '00';
                setTime({ secs: String(s), mins: String(m), hours: String(h) })
            } else if (mins > 0 && hours < 1) {
                let s = (converted_secs < 10) ? `0${converted_secs}` : converted_secs;
                let m = (mins < 10) ? `0${Math.round(mins)}` : Math.round(mins);
                let h = '00'
                setTime({ secs: String(s), mins: String(m), hours: String(h) })
            } else if (mins > 0 && hours > 1) {
                let s = (converted_secs < 10) ? `0${converted_secs}` : converted_secs;
                let m = (converted_mins < 10) ? `0${converted_mins}` : converted_mins;
                let h = (hours < 10) ? `0${hours}` : hours
                setTime({ secs: String(s), mins: String(m), hours: String(h) })
            }
        }
    }, [now, epoch])
    return (
        <div className="left__time">
            <h2>Difference between client time & most recent server epoch:</h2>
            {time.hours && time.mins && time.secs ?
                <h4>{time.hours} : {time.mins} : {time.secs}</h4>
                :
                <h4>Calculating</h4>
            }
        </div>
    )
}

export default React.memo(TimeDiff);