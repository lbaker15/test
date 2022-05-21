import React, { useEffect, useState } from 'react';
import Loader from '../atoms/loader';

const Metrics = () => {
    const [metrics, setMetrics] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const ref = React.useRef(null)
    useEffect(() => {
        newMets()
    }, [])
    const newMets = () => {
        setLoading(true)
        fetch('http://localhost:3000/metrics', {
            headers: {
                'authorization': 'mysecrettoken'
            }
        })
        .then(res => res.text())
        .then(data => {
            let error = (data.substring(2, 7) === 'error') ? true : false;
            if (!error) {
                setMetrics(data)
                setLoading(false)
                setTimeout(() => { newMets() }, 30000)
            }
        })
    }
    return (
        <div className="right">
            {loading && <Loader left={false} />}
            <h2>Most recent metrics</h2>
            <div ref={ref}>
                {metrics}
            </div>
        </div>
    )
}

export default Metrics;