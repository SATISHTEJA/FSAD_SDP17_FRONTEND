import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Mainlayout from './Layouts/Mainlayout'

import Home from './Pages/Home'
import  Contact  from './Pages/Contact'
import About from './Pages/About'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Forgetpass from './Pages/Forgetpass'

import Admindashboard from './Pages/Admindashboard'
import Postinternship from './Pages/Postinternship'
import Applications from './Pages/Applications'
import TrackProgress from './Pages/TrackProgress'
import Evaluations from './Pages/Evaluations'
import Adminprofile from './Pages/Adminprofile'

import Studentdashboard from './Pages/Studentdashboard'
import BrowseInternships from './Pages/BrowseInternships'
import MyApplications from './Pages/MyApplications'
import MyTasks from './Pages/MyTasks'
import Feedback from './Pages/Feedback'
import ApplyInternship from './Pages/ApplyInternship'
import InternshipDetails from './Pages/InternshipDetails'
import Studentprofile from './Pages/Studentprofile'

import Management from './Cardpages/Management'
import Pio from './Cardpages/Pio'
import Profileinfo from './Cardpages/Profileinfo'
import Mentor from './Cardpages/Mentor'
import Progress from './Cardpages/Progress'
import Tasks from './Cardpages/Tasks'

const App = () => {
  return (
    <Routes>
      {/* Layout Route */}
      <Route element={<Mainlayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path="/Forgetpass" element={<Forgetpass />} />

      {/* Admin Routes */}
      <Route path="/admin-dashboard" element={<Admindashboard />} />
      <Route path="/post-internship" element={<Postinternship />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/track-progress" element={<TrackProgress />} />
      <Route path="/evaluations" element={<Evaluations />} />
      <Route path="/admin-profile" element={<Adminprofile />} />

      {/* Student Routes */}
      <Route path="/student-dashboard" element={<Studentdashboard />} />
      <Route path="/browse-internships" element={<BrowseInternships/>}/>
      <Route path="/myapplications" element={<MyApplications/>}/>
      <Route path="/feedback" element={<Feedback/>}/>
      <Route path='/mytasks' element={<MyTasks/>}/>
      <Route path="/apply/:id" element={<ApplyInternship/>}/>
      <Route path="/internship/:id" element={<InternshipDetails/>}/>
      <Route path="/student-profile" element={<Studentprofile />} />

      {/* Card Pages */}
      <Route path="/pio" element={<Pio />} />
      <Route path="/management" element={<Management />} />
      <Route path="/profileinfo" element={<Profileinfo />} />
      <Route path="/mentor" element={<Mentor />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  )
}

export default App
