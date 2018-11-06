import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DateIntervalField from './components/DateIntervalField';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <div>
    <DateIntervalField />
  </div>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
