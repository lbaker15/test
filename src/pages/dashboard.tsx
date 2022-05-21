import {connect, useDispatch} from 'react-redux';
import { Dispatch } from 'redux';
import { addData, getData }from '../actions/index';
import { useEffect } from 'react';
import { RootState } from '../store';
import Time from './organisms/time';
import Metrics from './organisms/metrics';

type Props = {
    reducer: {items: object[]}
}
const Dashboard = ({reducer}: Props) => {
    let dispatch = useDispatch();

    useEffect(() => {

    }, [dispatch])

    return (
        <div className="flex">
            <Time />
            <Metrics />
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    reducer: state.reducer
})

export default connect(mapStateToProps)(Dashboard)