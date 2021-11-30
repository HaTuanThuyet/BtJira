const { default: Axios } = require('axios')
const { DOMAIN_CYBERBUG, TOKEN, TOKEN_CYBER, TOKEN1 } = require('../../util/constants/settingSystem')


export const CyberbugsService = {
    signinCyberBugs: (userLogin) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Users/signin`,
            method: 'POST',
            data: userLogin

        })

    },


    getAllProjectCategory: () => {
        return Axios({
            url: 'https://jiranew.cybersoft.edu.vn/api/ProjectCategory',
            method: 'GET',
            headers: {
                'TokenCybersoft': `  ${TOKEN}`
            }

        })
    },

    createProject: (newProject) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Project/createProject`,
            method: 'POST',
            data: newProject,
            headers: {
                'TokenCybersoft': `  ${TOKEN}`
            }


        })
    },
    createProjectAuthorization: (newProject) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Project/createProjectAuthorize`,
            method: 'POST',
            data: newProject,
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem(TOKEN1),
                'TokenCybersoft': `  ${TOKEN}`

            }


        })
    },
    getListProjectSaga1: () => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Project/getAllProject`,
            method: 'GET',
            headers: {

                'Authorization': `Bearer ` + localStorage.getItem(TOKEN1),
                'TokenCybersoft': `  ${TOKEN}`,
            }


        })
    },
    updateProject: (projectUpdate) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Project/updateProject?projectId=${projectUpdate.id}`,
            method: 'PUT',
            data: projectUpdate,

            headers: {
                'Authorization': `Bearer ` + localStorage.getItem(TOKEN1),
                'TokenCybersoft': `  ${TOKEN}`,


            }
        })
    },
    deleteProject: (id) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Project/deleteProject?projectId=${id}`,
            method: 'DELETE',


            headers: {
                'Authorization': `Bearer ` + localStorage.getItem(TOKEN1),
                'TokenCybersoft': `  ${TOKEN}`,


            }
        })
    },
    getUserProject: (keyWord) => {
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Users/getUser?keyword=${keyWord}`,
            method: 'GET',


            headers: {
                'Authorization': `Bearer ` + localStorage.getItem(TOKEN1),
                'TokenCybersoft': `${TOKEN}`,


            }
        })
    },
    asignUserProject: (userProject) => {
        // console.log('cyber', `${TOKEN}`);
        // console.log('acess', localStorage.getItem(TOKEN1));
        return Axios({
            url: `${DOMAIN_CYBERBUG}/Project/assignUserProject`,
            method: 'POST',
            data: userProject,
            headers: {

                'Authorization': `Bearer ` + localStorage.getItem(TOKEN1),
                'TokenCybersoft': `${TOKEN_CYBER}`


            },

        })
    },

}










