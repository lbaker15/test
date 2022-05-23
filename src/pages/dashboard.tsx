import {connect, useDispatch} from 'react-redux';
import { Dispatch } from 'redux';
import { addData, getData }from '../actions/index';
import { useEffect, useState } from 'react';
import { RootState } from '../store';
import Time from './organisms/time';
import Metrics from './organisms/metrics';

type Props = {
    reducer: {items: object[]}
}
const Dashboard = ({reducer}: Props) => {
    const [interval, setInterval] = useState(Date.now())
    return (
        <div className="flex">
            <Time setInterval={setInterval} />
            <Metrics interval={interval} />
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    reducer: state.reducer
})

export default connect(mapStateToProps)(Dashboard)