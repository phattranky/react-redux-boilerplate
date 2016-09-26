import React from 'react';
import LineChart from './LineChart';
import StackedChart from './StackedChart';

const D3VisitorDashboardView = () => (
  <div>
    <div>
      <LineChart />
    </div>
    <div>
      <StackedChart />
    </div>
  </div>
);

export default D3VisitorDashboardView;
