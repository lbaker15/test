import {connect, useDispatch} from 'react-redux';
import { Dispatch } from 'redux';
import { addData, getData }from '../actions/index';
import { useEffect } from 'react';
import { RootState } from '../store';

type Props = {
    reducer: {items: object[]}
}
const Dashboard = ({reducer}: Props) => {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(addData([{'key': 'value'}, {}]))
    }, [dispatch])
    console.log(reducer)
    return (
        <div></div>
    )
}

const mapStateToProps = (state: RootState) => ({
    reducer: state.reducer
})

export default connect(mapStateToProps)(Dashboard)