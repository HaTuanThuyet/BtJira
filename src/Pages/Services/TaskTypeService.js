const { default: Axios } = require('axios')
const { DOMAIN_CYBERBUG, TOKEN, TOKEN_CYBER, TOKEN1 } = require('../../util/constants/settingSystem')


export const TaskTypeService = {
    getAllTaskType: () => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/TaskType/getAll`,
            method: 'GET',
           
            headers: {
         
                'TokenCybersoft': `  ${TOKEN}`

            }


        })
    },
}

