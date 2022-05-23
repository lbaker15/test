import React, { useEffect, useState } from 'react';
import Loader from '../atoms/loader';
type Obj = {
    text: string, heading: string
}
const Metrics = ({interval}: any) => {
    const [metrics, setMetrics] = useState<Obj[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const ref = React.useRef(null)
    const [error, setError] = useState('')
    useEffect(() => {
        newMets()
    }, [interval])
    const newMets = () => {
        setLoading(true)
        fetch('https://testing-test-upx.herokuapp.com/metrics', {
            headers: {
                'authorization': 'mysecrettoken'
            }
        })
            .then(res => res.text())
            .then(data => {
                let error = (data.substring(2, 7) === 'error') ? true : false;
                if (!error) {
                    let arr = data.split('# HELP ');
                    arr.shift()
                    let mainArr = new Array;
                    Promise.all(arr.map(item => {
                        let data = item.split('# TYPE ')
                        let split = data[1].split('\n');
                        let heading = split[0]
                        split.shift()
                        let txt = split.join(' ')
                        let obj = { heading: heading, text: txt }
                        mainArr.push(obj)
                    }))
                        .then(() => {
                            setMetrics(mainArr)
                            setLoading(false)
                            // setTimeout(() => { newMets() }, 30000)
                        })

                } else {
                    setError('Error fetching metrics')
                }
            })
            .catch(err => setError('Error in fetch'))
    }
    if (error.length < 1) {
        return (
            <div className="right">
                {loading && <Loader left={false} />}
                <h2>Most recent metrics</h2>
                <div ref={ref}>
                    {metrics.map((item, index) => {
                        // console.log(item)
                        return <div key={'key' + index} className="metric-card">
                            {item.heading.length > 0 ?
                            <h2>{String(item.heading)}</h2>
                            : <h2>No Title</h2>
                            }
                            {item.text.length > 1 ?
                            <p>{String(item.text)}</p>
                            : <p>No Values</p>
                            }
                        </div>
                    })}
                </div>
            </div>
        )
    } else {
        return <div className="right">{error}</div>
    }
}

export default Metrics;