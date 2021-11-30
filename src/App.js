import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoadingComponent from './components/GlobalSetting/LoadingComponent/LoadingComponent';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import About from './Pages/About/About';

import Contact from './Pages/Contact/Contact';
import createProject from './Pages/CreateProject/createProject';
import Detail from './Pages/Detail/Detail';
import Frofile from './Pages/Frofile/Frofile';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import Todolist from './Pages/Todolist/Todolist';
import TodolistRFC from './Pages/Todolist/TodolistRFC';
import indexCyberBugs from './redux/sagas/indexCyberBugs';
import { CyberBugsTemplate } from './templates/HomeTemPlate/CyberBugsTemplate';
import HomeTemPlace from './templates/HomeTemPlate/HomeTemPlate';
import { UserLoginTemplate } from './templates/HomeTemPlate/UserLoginTemplate';
import ProjectManagement from './Pages/ProjectManagement/ProjectManagement';
import ModalCyberbugs from './HOC/CyberbugsHOC/ModalCyberbugs';
// import Notification from './components/Nitification/Notification';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'ADD_HISTORY',
      history: history
    })
  }, [])



  return (
    <>
      <LoadingComponent />
      <ModalCyberbugs/>
     
      <Switch>


        <HomeTemPlace exact path="/home" Component={Home} />
        <HomeTemPlace exact path="/" Component={Home} />

        <HomeTemPlace exact path="/about" Component={About} />
        <HomeTemPlace exact path="/contact" Component={Contact} />
        <UserLoginTemplate exact path="/login" Component={Login} />
        <HomeTemPlace exact path="/todolist" Component={Todolist} />
        <HomeTemPlace exact path="/todolistrfc" Component={TodolistRFC} />
        <CyberBugsTemplate exact path='/cyberbugs' Component={indexCyberBugs} />
        <CyberBugsTemplate exact path='/createproject' Component={createProject} />
        <CyberBugsTemplate exact path='/projectmanagement' Component={ProjectManagement} />




        <HomeTemPlace exact path="/detail/:id" Component={Detail} />
        <HomeTemPlace exact path="/profile" Component={Frofile} />

        {/* <Route path="*" component={PageNotFound}/> */}

      </Switch>






    </>

  );
}

export default App;
