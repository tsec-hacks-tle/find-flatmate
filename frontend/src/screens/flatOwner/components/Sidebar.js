import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className='sidebar-wrapper'>
      <nav id='sidebar'>
        <ul className='list-unstyled components'>
          <li>
            <a
              href='#productSubmenu'
              data-toggle='collapse'
              aria-expanded='false'
              className='dropdown-toggle'>
              <i className='fa fa-product-hunt'></i> Rooms
            </a>
            <ul className='collapse list-unstyled' id='productSubmenu'>
              <li>
                <Link to='/owner/rooms'>
                  <i className='fa fa-clipboard'></i> All
                </Link>
              </li>

              <li>
                <Link to='/owner/createRooms'>
                  <i className='fa fa-plus'></i> Create
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to='/admin/reviews'>
              <i className='fa fa-star'></i> Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
