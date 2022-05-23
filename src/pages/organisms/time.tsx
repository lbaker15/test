import React, { Fragment, useCallback, useEffect, useState } from 'react';
import Loader from '../atoms/loader';
import RecentEpoch from '../atoms/recent-epoch';
import TimeDiff from '../atoms/time-diff';

const Time = ({ }) => {
    const [now, setNow] = useState<number>(0)
    const [epoch, setEpoch] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState('')
    useEffect(() => {
        newTime()
    }, [])
    const getData = (): Promise<any> => {
        return fetch('http://localhost:3000/time', {
            headers: {
                'authorization': 'mysecrettoken'
            }
        })
    }
    const newTime = async () => {
        setLoading(true)
        try {
            let res = await getData()
            let data = await res.json();
            if (!data.error) {
                setEpoch(data.epoch)
                logTime()
                setLoading(false)
                setTimeout(() => { newTime() }, 30000)
            } else {
                setError('Error fetching data')
            }
        } catch(err) {
            setError('Error in fetch')
        }
    }
    const logTime = () => {
        let now = Date.now() / 1000;
        setNow(now)
        setTimeout(() => { logTime() }, 1000)
    }
    if (error.length < 1) {
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
    } else {
        return <div className="left">{error}</div>
    }
}

export default Time;