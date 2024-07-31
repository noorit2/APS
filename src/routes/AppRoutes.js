import Root from '../views/components/Root';
import Error from '../views/components/Error';
import MainPage from '../views/MainPage';
import Login from '../views/LoginPage/Login';
import UniversityProfile from '../views/Profiles/UniversityProfile';
import UniversityAccounts from '../views/Universities/components/UniversityAccounts'; // Assuming the path is correct
import CollegeProfile from '../views/Profiles/CollegeProfile/CollegeProfile';
import DepartmentProfile from '../views/Profiles/DepartmentProfile/DepartmentProfile';
import AddNewModule from '../views/LibraryPage/modules/AddNewModule';
import AddProffessor from '../views/LibraryPage/modules/AddProffessor';
import ModulesTable from '../views/LibraryPage/modules/ModulesTable';
import EditModule from '../views/LibraryPage/modules/EditModule';
import ProgramManage from '../views/LibraryPage/modules/ProgramManage';
import ProfessorTable from '../views/LibraryPage/modules/ProfessorTable';
import ClassroomsTable from '../views/LibraryPage/modules/ClassroomsTable';
import Notifications from '../views/NotificationsPage/Notifications';
import ProgramModulesTable from '../views/LibraryPage/modules/ProgramModulesTable';
import AddProgramModule from '../views/LibraryPage/modules/AddProgramModule';
import AddStudent from '../views/Profiles/CollegeProfile/AddStudent';
import StudentsTable from '../views/Profiles/CollegeProfile/StudentsTable';
import EditStudent from '../views/Profiles/CollegeProfile/EditStudent';
import Schedule from '../views/DepartmentProfile/schedule/Schedule';
import ExamComitte from '../views/DepartmentProfile/Exam/ExamComitte';
import Exams from '../views/DepartmentProfile/Exam/Exams';
import Grades from '../views/DepartmentProfile/Exam/Grades';
import Home from '../views/ProfessorProfile/Home/Home';
import StudentModules from '../views/StudentProfile/Modules/StudentModules';
import ModulesRegisteration from '../views/StudentProfile/Modules/ModulesRegisteration';
import StudentPrecense from '../views/StudentProfile/StudentPresence/StudentPrecense';
import StudentProfile from '../views/StudentProfile/StudentProfile';
import Assesments from '../views/StudentProfile/Assesments/Assesments';
import ProfessorModules from '../views/ProfessorProfile/Modules/ProfessorModules';
import ProfessorHome from '../views/ProfessorProfile/Home/ProfessorHome';
import StudentsAttendance from '../views/ProfessorProfile/StudentsAttendance/StudentsAttendance';
import Divsions from '../views/DepartmentProfile/Divisions/Divsions';
import Library from '../views/LibraryPage/Library';
import StudentsModuleRegisteration from '../views/StudentProfile/Modules/StudentsModuleRegisteration';
import ProfessorProfile from '../views/ProfessorProfile/ProfessorProfile';
import ViewDepartmentProfile from '../views/Profiles/DepartmentProfile/ViewDepartmentProfile';
import DepartmentStudentsAttendance from '../views/DepartmentProfile/Students/DepartmentStudentsAttendance';
import DepartmentStudentsGrades from '../views/DepartmentProfile/Students/DepartmentStudentsGrades';
import ProfessorCommitte from '../views/DepartmentProfile/Committe/ProfessorCommitte';
import StudentAdvancment from '../views/StudentProfile/StudentAdvancment';
import ViewCollegeProfile from '../views/Profiles/CollegeProfile/ViewCollegeProfile';
import ViewUniversityProfile from '../views/Profiles/UniversityProfile/ViewUniversityProfile';
import ViewProfessorProfile from '../views/Profiles/ProfessorProfile/ViewProfessorProfile';
import ViewStudentProfile from '../views/Profiles/StudentProfile/ViewStudentProfile';
import Changeusername from '../views/Profiles/ChangeUsername/Changeusername';


export const AppRoutes= [
    {
      path: "/",
      element: <Root/>,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <MainPage />,
        },
        {
          path: "/Login",
          element: <Login />,
        },
        {
          path: "/UniversityProfile",
          element: <UniversityProfile />,
        },
        {
          path: "/Universities",
          element: <UniversityAccounts />,
        },
        {
          path: "/CollegeProfile",
          element: <CollegeProfile />,
        },
        {
          path: "/DepartmentProfile",
          element: <DepartmentProfile />,
        },
        {
          path: "/AddModule",
          element: <AddNewModule />,
        },
        {
          path: "/AddProfessor",
          element: <AddProffessor />,
        },
        {
          path: "/ModuleTable",
          element: <ModulesTable />,
        },
        {
          path: "/EditModule",
          element: <EditModule />,
        },

        {
          path: "/ProgramManage",
          element: <ProgramManage />,
        },
        {
          path: "/ProfessorList",
          element: <ProfessorTable />,
        },
        {
          path: "/Classrooms",
          element: <ClassroomsTable />,
        },
        {
          path: "/Notifications",
          element: <Notifications />,
        },
        {
          path: "/ProgramModules",
          element: <ProgramModulesTable />,
        },
        {
          path: "/AddProgramModule",
          element: <AddProgramModule />,
        },
        {
          path: "/AddStudent",

          element: <AddStudent />,
        },
        {
          path: "/StudentsTable",
          element: <StudentsTable />,
        },
        {
          path: "/EditStudent",
          element: <EditStudent />,
        },
        {
         
        },
        {
          path:"/Schedule",
        
          element:<Schedule/>
        },
        {
          path:"/ExamCommite",
          element:<ExamComitte/>
      
        },
        {
          path:"/Schedule",
         element:<Schedule/>
        },
        {
          path:"/Exams",
          element:<Exams/>
        },
        {
          path:"/Grades",
          element:<Grades/>
        },
        {
          path:"/Home",
          element:<Home/>
        },
        {
          path:"/StudentModules",
          element:<StudentModules/>
        },  {
          path:"/ModuleRegistartion",
          element:<ModulesRegisteration/>
        },
        {
          path:"/StudentPresence",
          element:<StudentPrecense/>
        },
        {
          path:"/StudentProfile",
          element:<StudentProfile/>
        },
        {
          path:"/Assesments",
          element:<Assesments/>
        },
        {
          path:"/ProfessorModules",
          element:<ProfessorModules/>
        },
        {
          path:"/ProfessorHome",
          element:<ProfessorHome/>
        },
        {
          path:"/StudentsAttendance",
          element:<StudentsAttendance/>
        },
        {
          path:"/Division",
          element:<Divsions/>
        },
        {
          path:"/Library",
          element:<Library/>
        },
        {
          path:"/StudentsModuleRegisteration",
          element:<StudentsModuleRegisteration/>
        },
        {
          path:"/ProfessorProfile",
          element:<ProfessorProfile/>
        },
        {
          path:"ViewDepartmentProfile",
          element:<ViewDepartmentProfile/>
        },
        {
          path:"DepartmentStudentsAttendance",
          element:<DepartmentStudentsAttendance/>
        },
        {
          path:"DepartmentStudentsGrades",
          element:<DepartmentStudentsGrades/>
        },
        {
          path:"ProffesorCommitte",
          element:<ProfessorCommitte/>
        },
        {
          path:"StudentsAdvancment",
          element:<StudentAdvancment/>
        },
        {
          path:"ViewCollegeProfile",
          element:<ViewCollegeProfile/>
        },
        {
          path:"ViewUniversityProfile",
          element:<ViewUniversityProfile/>
        },
        {
          path:"ViewProfessorProfile",
          element:<ViewProfessorProfile/>
        },
        {
          path:"ViewStudentProfile",
          element:<ViewStudentProfile/>
        },
        {
          path:"ChangeUsername",
          element:<Changeusername/>
        },
    ]}
];