const { default: Axios } = require('axios')
const { DOMAIN_CYBERBUG, TOKEN, TOKEN_CYBER, TOKEN1 } = require('../../util/constants/settingSystem')


export const UsersService = {
    getListUserSaga: () => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Users/getUser`,
            method: 'GET',
            headers: {

                'Authorization': `Bearer ` + localStorage.getItem(TOKEN1),
                'TokenCybersoft': `  ${TOKEN}`,
            }


        })
    },
    deleteUser: (id) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Users/deleteUser?id=${id}`,
            method: 'DELETE',


            headers: {
                'Authorization': `Bearer ` + localStorage.getItem(TOKEN1),
                'TokenCybersoft': `  ${TOKEN}`,


            }
        })
    },
    UpdateUserSaga: (usersUpdate) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}//Users/editUser?userId=${usersUpdate.userId}`,
            method: 'PUT',
            data: usersUpdate,

            headers: {
                'Authorization': `Bearer ` + localStorage.getItem(TOKEN1),
                'TokenCybersoft': `  ${TOKEN}`,


            }
        })
    },
   
}


