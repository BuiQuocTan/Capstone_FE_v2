import HomeWorkIcon from '@mui/icons-material/HomeWork'
import '../style/admin.css'
import DataHome from '../components/DataHome'
import  DataAgent from '../components/DataAgent'
import { useState } from 'react'

function AdminPage() {
  const [swap, setSwap] = useState('home')
  
  const switchAdminHome = () => {
    setSwap('home')
  }
  const switchAdminAccount = () => {
    setSwap('agent')
  }
  return (
    <div className="admin">
      <div className="admin-left">
        <div className="titleAdmin">
          <HomeWorkIcon />
          <p>Admin</p>
        </div>
        <div className="listAdmin">
          <p className={swap === 'home' ? 'active' : ''} onClick={switchAdminHome}>
            Home
          </p>
          <p className={swap === 'agent' ? 'active' : ''} onClick={switchAdminAccount}>
            Agent Finder
          </p>
        </div>
      </div>
      <div className="admin-right">
        <div className="contentAdmin">
          {swap === 'home' && <DataHome />}
          {swap === 'agent' && <DataAgent />}
        </div>
      </div>
    </div>
  )
}

export default AdminPage
