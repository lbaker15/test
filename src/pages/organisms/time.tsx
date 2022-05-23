import React, { Fragment, useCallback, useEffect, useState } from 'react';
import Loader from '../atoms/loader';
import RecentEpoch from '../atoms/recent-epoch';
import TimeDiff from '../atoms/time-diff';

const Time = ({ setInterval }: any) => {
    const [now, setNow] = useState<number>(0)
    const [epoch, setEpoch] = useState<number>(100)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState('')
    useEffect(() => {
        newTime()
    }, [])
    const getData = (): Promise<any> => {
        return fetch('https://testing-test-upx.herokuapp.com/time', {
            headers: {
                'authorization': 'mysecrettoken'
            }
        })
    }
    const newTime = async () => {
        setLoading(true)
        setInterval(Date.now())
        try {
            getData()
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        setEpoch(data.epoch)
                        logTime()
                        setLoading(false)
                        setTimeout(() => { console.log('timeout'); newTime() }, 30000)
                    } else {
                        setError('Error fetching data')
                    }
                })
        } catch (err) {
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