import React, { Fragment, useCallback, useEffect, useState } from 'react';
import Loader from '../atoms/loader';
import RecentEpoch from '../atoms/recent-epoch';
import TimeDiff from '../atoms/time-diff';

const Time = ({ }) => {
    const [now, setNow] = useState<number>(0)
    const [epoch, setEpoch] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        newTime()
    }, [])
    const newTime = () => {
        setLoading(true)
        fetch('http://localhost:3000/time', {
            headers: {
                'authorization': 'mysecrettoken'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setEpoch(data.epoch)
                    logTime()
                    setLoading(false)
                    setTimeout(() => { newTime() }, 30000)
                }
            })
    }
    const logTime = () => {
        let now = Date.now() / 1000;
        setNow(now)
        setTimeout(() => { logTime() }, 1000)
    }
    return (
        <div>
            <div className="left">
                    <Fragment>
                        <RecentEpoch epoch={epoch} loading={loading} />
                        <TimeDiff now={now} epoch={epoch} loading={loading} />
                    </Fragment>
                    {loading && 
                    <Loader left={true} />
                    }
            </div>


        </div>
    )
}

export default Time;