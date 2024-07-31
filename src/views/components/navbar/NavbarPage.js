import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
import menu from "../../Images/menu.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import {
  authActions,
  selectuid,
} from "../../store/auth-slice";
import question from "../../Images/question.png";
import login from "../../Images/enter.png";
import university from "../../Images/university.png";
import profilePicture from "../../Images/userprofile.png";
import moduleIcon from "../../Images/bookb.png";
import professor from "../../Images/professor.png";
import collapse from "../../Images/downArrow.png";
import addUser from "../../Images/addUser.png";
import table from "../../Images/table.png";
import addModule from "../../Images/addModule.png";
import bell from "../../Images/bell.png";
import manage from "../../Images/manage.png";
import program from "../../Images/program.png";
import classroom from "../../Images/classroom.png";
import { AccountCircleOutlined, AppRegistration, ArticleOutlined, CollectionsBookmarkOutlined, FeaturedPlayListOutlined, GradingOutlined, GroupOutlined, GroupWork, GroupWorkOutlined, GroupWorkTwoTone, Groups2Outlined, Groups3Outlined, Home, HomeOutlined, LibraryBooksOutlined, LogoutOutlined, Person, Person2Outlined, PersonAdd, PersonAddOutlined, PersonOutlined, PresentToAll, Schedule, TableBarOutlined, TableChart, TableChartOutlined, TypeSpecimenOutlined } from "@mui/icons-material";
import { errorActions } from "../../store/error-slice";
import { Avatar, MenuItem, Select } from "@mui/material";
import APS from "../../Images/aps logo-02.png";
import { useAuth } from "../../../controllers/auth/authController";
import useFirebaseController from "./controllers/navbar";

const Navbar = () => {
  const noNotification = useSelector((state) => state.notify.noNotification);
  const [loading, setLoading] = useState(true);
  const [activatedList, setActivatedList] = useState([]);
  const { signOut } = useAuth();
  const { handleAuthStateChanged, subscribeToNotifications } = useFirebaseController();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const accountType = useSelector((state) => state.auth.accountType);
  const profile = useSelector((state) => state.profile.profile);
  const uid = useSelector(selectuid);

  const isUniversityAccount = isLoggedIn && accountType === "University";
  const isCollegeAccount = isLoggedIn && accountType === "College";
  const isDepartmentAccount = isLoggedIn && accountType === "Department";
  const isProfessorAccount = isLoggedIn && accountType === "Professor";
  const isStudentAccount = isLoggedIn && accountType === "student";
  const isCommitteMember = isLoggedIn && profile?.role?.some(role => ["checkingCommitte", "examCommitte"].includes(role));

  useEffect(() => {
    dispatch(authActions.changeAccountType({ accountType: "guest" }));
  }, []);

  useEffect(() => {
    handleAuthStateChanged(location, uid, setLoading);
  }, [location, uid]);

  useEffect(() => {
    if (accountType && isCollegeAccount) {
      const unsubscribe = subscribeToNotifications(accountType, profile);
      return () => unsubscribe();
    }
  }, [accountType, profile]);

  const showAsideListHandler = () => {
    setShowAsideList((state) => !state);
  };

  const logoutHandler = () => {
    signOut();
    setShowAsideList(false);
    navigate("/");
  };

  const collapseHandler = (s) => {
    if (!activatedList.includes(s)) {
      setActivatedList((prev) => [...prev, s]);
    } else {
      setActivatedList((prev) => prev.filter((l) => l !== s));
    }
  };

  const profileLink = isUniversityAccount
    ? "/UniversityProfile"
    : isCollegeAccount
    ? "/CollegeProfile"
    : isDepartmentAccount
    ? "/DepartmentProfile"
    : isProfessorAccount
    ? "/ProfessorProfile"
    : "/StudentProfile";
  return (
    <>
      <div className={backdrop} onClick={showAsideListHandler} />
      <nav className={classes.nav}>
        <ul className={classes.navList}>
          <div>
          
            <li className={classes.logo}>
              <Link to="/">APS</Link>
            </li>
          </div>
          <div>
          {!isLoggedIn && (
            <li>
              <Link to="/">what's APS</Link>
            </li>
             )}
              { (isProfessorAccount||isStudentAccount) && (
            <li>
              <Link to={isProfessorAccount?"/ProfessorHome":"/Home"}>Home</Link>
            </li>
             )}
              {isLoggedIn && (
            <li>
              <Link to={profileLink}>Profile</Link>
            </li>
             )}
    
         
            <li>
              <Link to="/Universities">Universities using it</Link>
            </li>
            {!loading && !isLoggedIn && (
              <li>
                <Link to="/Login">Login</Link>
              </li>
            )}
          </div>

          <div>
            <li className={classes.line}></li>
            <li>
              <button onClick={showAsideListHandler}>
                <img src={menu} alt="menu icon" />
              </button>
            </li>
          </div>
        </ul>
        <div className={`${active} ${classes.asideList}`}>
        
        <ul >
                <li><Link to="/"  onClick={showAsideListHandler}>APS</Link></li>
               {!isLoggedIn && <li><Link to="/Login" onClick={showAsideListHandler}><img src={login} alt="" className={classes.login}/>Login</Link> <div className={classes.innerLine}/></li>}
                <li><Link to="/" onClick={showAsideListHandler}><img src={question} alt=""/>what's APS</Link><div className={classes.innerLine}/></li>
                <li><Link to="/Universities" onClick={showAsideListHandler}><img src={university} alt=""/>Universities using it</Link><div className={classes.innerLine}/></li>
                {isCollegeAccount && <li><Link to="/CollegeProfile"><img src={profilePicture} alt=""/>College Profile</Link></li>}
                {isCollegeAccount && <li><Link to="/AddStudent"><PersonAddOutlined sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Add Student</Link></li>}
                {isCollegeAccount && <li><Link to="/StudentsTable"><GroupOutlined sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Students Table</Link></li>}
                {isDepartmentAccount && <li><Link to="/DepartmentProfile"><img src={profilePicture} alt=""/>Department Profile</Link></li>}
                {isStudentAccount && <li><Link to="/Home"><HomeOutlined sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Home</Link></li>}
                {isStudentAccount && <li><Link to="/StudentProfile"><AccountCircleOutlined sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Profile</Link></li>}
                {isStudentAccount && <li><Link to="/StudentModules"><img src={moduleIcon} alt=""/> Modules</Link></li>}
                {isStudentAccount && <li><Link to="/ModuleRegistartion"><CollectionsBookmarkOutlined sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Modules Registartion</Link></li>}
                {isStudentAccount && <li><Link to="/StudentPresence"><PersonOutlined sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Attendance</Link></li>}
                {isStudentAccount && <li><Link to="/Library"><LibraryBooksOutlined sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Library</Link></li>}
                {isProfessorAccount && <li><Link to="/ProfessorHome"><Home sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Home</Link></li>}
                {isProfessorAccount && <li><Link to="/ProfessorProfile"><AccountCircleOutlined sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Profile</Link></li>}
                {isProfessorAccount && <li><Link to="/Assesments"><GradingOutlined sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Assesments</Link></li>}
                {isProfessorAccount && <li><Link to="/ProfessorModules"><CollectionsBookmarkOutlined sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Modules</Link></li>}
                {isProfessorAccount && <li><Link to="/StudentsAttendance"><GroupOutlined sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Students Attendance</Link></li>}
                {isCommitteMember && <li><Link to="/ProffesorCommitte"><Groups3Outlined sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Committee</Link></li>}
               {isUniversityAccount && <li><Link to="/UniversityProfile"><img src={profilePicture} alt=""/>University Profile</Link></li>}
               {isDepartmentAccount && <li><Link to="/Classrooms"><img src={classroom} alt=""/>Classrooms Table</Link></li>}
               {isDepartmentAccount && <li><Link to="/Schedule"><Schedule sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Schedule</Link></li>}
               {isDepartmentAccount && <li><Link to="/Division"><Groups3Outlined sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Divisions</Link></li>}
               { isDepartmentAccount && <div className={classes.container}>
              <li onClick={()=>collapseHandler('pr')} className={activatedList.includes('pr')? classes.activeList :""}><img src={program} alt=""/> Program  <img src={collapse}/></li>
              { activatedList.includes('pr') &&
              <>
               <li><Link to="/ProgramModules"><img src={moduleIcon} alt=""/> Program Modules</Link></li>
            <li><Link to="/AddProgramModule"><img src={addModule} alt=""/> Add Module</Link> </li> 
           <li><Link to="/StudentsModuleRegisteration"><AppRegistration sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Student Registartion</Link></li>
            {isDepartmentAccount && <li><Link to="/ProgramManage"><img src={manage} alt=""/> Manage Program</Link></li>}

            </>
            }  </div> 
            }
              { isDepartmentAccount && <div className={classes.container}>
              <li onClick={()=>collapseHandler('m')} className={activatedList.includes('m')? classes.activeList :""}><img src={moduleIcon} alt=""/> Modules  <img src={collapse}/></li>
              { activatedList.includes('m') &&
              <>
               <li><Link to="/AddModule"><img src={addModule} alt=""/> Add Module</Link></li>
            <li><Link to="/ModuleTable"><img src={table} alt=""/> Modules Table</Link></li> 
            </>
            }  </div> 
            }
             { isDepartmentAccount && <div className={classes.container}>
              <li onClick={()=>collapseHandler('st')} className={activatedList.includes('m')? classes.activeList :""}><Groups2Outlined sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Students  <img src={collapse}/></li>
              { activatedList.includes('st') &&
              <>
              
               <li><Link to="/DepartmentStudentsAttendance"><Person2Outlined sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Students' Attendance</Link></li>
            <li><Link to="/DepartmentStudentsGrades"><TableChartOutlined sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Students' Grades</Link></li> 
            <li><Link to="/StudentsAdvancment"><TypeSpecimenOutlined sx={{verticalAlign:"bottom",padding:"0 !important",margin:"0 !important"}}/> Students' Advancement</Link></li> 
            </>
            }  </div> 
            }
            { isDepartmentAccount &&  <div className={classes.container}>
               <li onClick={()=>collapseHandler('p')} className={activatedList.includes('p')? classes.activeList :""}><img src={professor} alt=""/> Professors <img src={collapse}/></li>
               { activatedList.includes('p') &&
               <>
               <li><Link to="/AddProfessor"><img src={addUser} alt=""/> Add Proffessor</Link></li>
               <li><Link to="/ProfessorList"><img src={table} alt=""/> Professors Table</Link></li>
               </>}
               </div>}
               { isDepartmentAccount &&  <div className={classes.container}>
               <li onClick={()=>collapseHandler('e')} className={activatedList.includes('e')? classes.activeList :""}><FeaturedPlayListOutlined sx={{verticalAlign:"middle",padding:"0 !important",margin:"0 !important"}}/> Exams <img src={collapse}/></li>
               { activatedList.includes('e') &&
               <>
             <li><Link to="/ExamCommite"><GroupOutlined sx={{verticalAlign:"middle",padding:"0 !important",margin:"0 !important"}}/> Exam Commite</Link></li>
             <li><Link to="/Exams"><ArticleOutlined sx={{verticalAlign:"middle",padding:"0 !important",margin:"0 !important"}}/> Exams</Link></li>
             <li><Link to="/Grades"><GradingOutlined sx={{verticalAlign:"middle",padding:"0 !important",margin:"0 !important"}}/> Grades</Link></li>
               </>}
               </div>}
               {isCollegeAccount   && <li><Link to="/Notifications" ><img src={bell} alt=""/>Notifications{<span className={classes.notifications}>{noNotification >0 ? noNotification:"" }</span>}</Link></li>}
                { isLoggedIn && <li><button onClick={logoutHandler}> <LogoutOutlined sx={{verticalAlign:"text-top",padding:"0 !important",margin:"0 !important"}}/> Logout</button></li>}
        </ul></div>
    </nav>
</>
);
}
export default Navbar;