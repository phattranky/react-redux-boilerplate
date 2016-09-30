import React from 'react';
import LineChart from './LineChart';
import StackedChart from './StackedChart';
import GroupedBarChart from './GroupedBarChart';
import DivergingBarChart from './DivergingBarChart';

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
    <div>
      <DivergingBarChart />
    </div>
  </div>
);

export default D3VisitorDashboardView;
