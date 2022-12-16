import React from 'react'
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import {Link} from 'react-router-dom'

import '../style/footer.css'

function footer() {
  return (
    <div className="footer">
        <div className="footer-content">
          <div className="footer-introduce">
            <h1>Real Estate Website</h1>
            <p>Phone number: 0935423169
              <br />
              Email: nguyenngocthuan2@dtu.edu.vn
              <br />
              Address:31 Nguyễn Hoàng, Đà Nẵng city
            </p>
          </div>
          <div className="aboutUs">
            <h1>About Website</h1>
            <p>The real estate website was designed by four Duy Tan university students</p>
          </div>
          <div className="help">
            <h1>Helps</h1>
            <p>If you have any problems in the process of experiencing the website, please send us comments via the link <Link to="/contact">Contact Us</Link> .Thank you</p>
          </div>
        </div>
        <div className="footer-home">
          <HouseSidingIcon />
          <h1>REB <span>Follow us</span></h1>
          <a  href="https://www.facebook.com/ngocthuan.nguyen.54584" target="_blank" rel="noreferrer"><FacebookOutlinedIcon /></a>
          <a href='https://www.instagram.com/tiger_unlucky/'target="_blank" rel="noreferrer"> <InstagramIcon /></a>
          <a   href='https://twitter.com/thun06350390' target="_blank" rel="noreferrer" ><TwitterIcon /></a>
          <p>&copy; 2022-2023 REB</p>
          <HomeIcon />
        </div>
      </div>
  )
}

export default footer