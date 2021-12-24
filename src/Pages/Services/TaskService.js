const { default: Axios } = require('axios')
const { DOMAIN_CYBERBUG, TOKEN, TOKEN_CYBER, TOKEN1 } = require('../../util/constants/settingSystem')


export const TaskService = {
    createTask: (taskObject) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Project/createTask`,
            method: 'POST',
            data: taskObject,
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem(TOKEN1),
                'TokenCybersoft': `  ${TOKEN}`,
            }
        })
    },
    getTaskDetail: (taskId) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Project/getTaskDetail?taskId=${taskId}`,
            method: 'GET',
          
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem(TOKEN1),
                'TokenCybersoft': `  ${TOKEN}`,
            }
        })
    },
    updateStatusTask: (taskStatusUpdate) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Project/updateStatus`,
            method: 'PUT',
            data:taskStatusUpdate,
          
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem(TOKEN1),
                'TokenCybersoft': `  ${TOKEN}`,
            }
        })
    },
    updateTask: (tastUpdateApi) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Project/updateTask`,
            method: 'POST',
            data:tastUpdateApi,
          
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem(TOKEN1),
                'TokenCybersoft': `  ${TOKEN}`,
            }
        })
    },
}





