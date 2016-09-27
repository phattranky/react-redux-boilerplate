import React from 'react';
import LineChart from './LineChart';
import StackedChart from './StackedChart';
import GroupedBarChart from './GroupedBarChart';

const D3VisitorDashboardView = () => (
  <div>
    <div>
      <LineChart />
    </div>
    <div>
      <StackedChart />
    </div>
    <div>
      <GroupedBarChart />
    </div>
  </div>
);

export default D3VisitorDashboardView;
