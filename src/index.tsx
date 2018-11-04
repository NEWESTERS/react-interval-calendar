import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DoubleCalendar from './components/DoubleCalendar/index';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <div className="calendar-wrapper">
    <h3>ВЫБЕРИТЕ ПЕРИОД ОТОБРАЖЕНИЯ ДАННЫХ</h3>
    <DoubleCalendar />
  </div>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
