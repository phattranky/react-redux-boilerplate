import React from 'react';
import { Link } from 'react-router';

import 'scss/components/layout/nav';

const Nav = () => (
  <ul className="menu">
    <li>
      <Link to="/github-repos">
        Search GitHub Repositories
      </Link>
    </li>
    <li>
      <Link to="/D3-visitor-dashboard">
        D3 Visitor Dashboard
      </Link>
    </li>
  </ul>
);

export default Nav;
