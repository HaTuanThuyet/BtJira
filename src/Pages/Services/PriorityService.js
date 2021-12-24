const { default: Axios } = require('axios')
const { DOMAIN_CYBERBUG, TOKEN, TOKEN_CYBER, TOKEN1 } = require('../../util/constants/settingSystem')


export const PriorityService = {
    getAllPriority: () => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Priority/getAll`,
            method: 'GET',
            headers: {
                'TokenCybersoft': `  ${TOKEN}`

            }

        })
    },
    createTask: (taskObject) => {
        return Axios({
            url: `https://jiranew.cybersoft.edu.vn/api/Project/createTask`,
            method: 'POST',
            data: taskObject,
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem(TOKEN1),
                'TokenCybersoft': `  ${TOKEN}`,
            }
        })
    },
}


