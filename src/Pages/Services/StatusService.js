const { default: Axios } = require('axios')
const { DOMAIN_CYBERBUG, TOKEN, TOKEN_CYBER, TOKEN1 } = require('../../util/constants/settingSystem')


export const StatusService = {
    getAllStatus: () => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Status/getAll`,
            method: 'GET',
            headers: {
                'TokenCybersoft': `  ${TOKEN}`
            }


        })
    },
 
}


