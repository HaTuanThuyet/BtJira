import React, { useEffect } from 'react'
import Contantmain from '../../components/CyberBugs/Main/Contantmain'
import Headermain from '../../components/CyberBugs/Main/Headermain'
import InfoMain from '../../components/CyberBugs/Main/InfoMain'
import { useDispatch, useSelector } from 'react-redux'

export default function IndexCyberBugs(props) {
    const {projectDetail} = useSelector(state => state.ProjectReducer);
    const dispatch = useDispatch();
    console.log('projectDetail',projectDetail);
    useEffect(() => {
        const projectId = props.match.params;
        dispatch({
            type:'GET_PROJECT_DETAIL',
            projectId
        })
    },[])

    // console.log(props.match.params.projectId);
    return (
        <div className="main">
                            
        <Headermain projectDetail={projectDetail}/>
        <InfoMain members={projectDetail.members}/>
        <Contantmain projectDetail={projectDetail} />
    </div>
    )
}
