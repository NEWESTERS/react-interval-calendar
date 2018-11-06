import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DoubleCalendar from './index';
import * as Moment from 'moment';

it('renders without crashing', () => {
  const div = document.createElement('div'),
    selection = {
      start: Moment(),
      end: Moment()
    },
    onSelect = () => {}
    
  ReactDOM.render(<DoubleCalendar selection={ selection } onSelect={ onSelect } />, div);
  ReactDOM.unmountComponentAtNode(div);
});
