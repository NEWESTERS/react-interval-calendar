import * as React from 'react';
import DoubleCalendar from './DoubleCalendar';
import './index.css';
import * as Moment from 'moment';
import 'moment/locale/ru';
import { Popup } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


interface State {
  selection: {
    start: Moment.Moment | undefined;
    end: Moment.Moment | undefined;
  };
}

export default class DateIntervalField extends React.Component<{}, State> {
  public state = {
    selection: {
      start: undefined,
      end: undefined
    }
  } as State;

  calendarOnSelect = (start: Moment.Moment | undefined, end: Moment.Moment | undefined) => {
    this.setState({
        selection: {
            start: start,
            end: end
        }
    })
  }

  clearSelection = () => {
      this.setState({
          selection: {
              start: undefined,
              end: undefined
          }
      })
  }

  selectionFormat = () => {
    const { start, end } = this.state.selection;

    if (start === undefined || end === undefined) { return '' };

    return `${start.format('DD.MM.YYYY')} - ${end.format('DD.MM.YYYY')}`;
  }

  public render() {
    return (
        <div className="date-interval-field" >
          <div className="field">
            <Popup trigger= {
              <input className="date-interval-field-input" type="text" value={ this.selectionFormat() } readOnly />   
            } on="click" position="bottom center" >
              <DoubleCalendar onSelect={ this.calendarOnSelect } selection={ this.state.selection } />
            </Popup>
            { this.state.selection.start && <div className={ "clear-button" } onClick={ this.clearSelection } /> }
          </div>
        </div>
    );
  }
}


