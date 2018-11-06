import * as React from 'react';
import DoubleCalendar from './DoubleCalendar';
import './index.css';
import * as Moment from 'moment';
import 'moment/locale/ru';

interface State {
  selection: {
    start: Moment.Moment | undefined;
    end: Moment.Moment | undefined;
  };
  isOpened: boolean;
}

export default class DateIntervalField extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)

    Moment.locale('ru')

    this.state = {
      selection: {
        start: undefined,
        end: undefined
      },
      isOpened: false
    }
  }

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
    const start = this.state.selection.start,
        end = this.state.selection.end

    if (start == undefined || end == undefined) { return '' }

    return `${start.format('DD.MM.YYYY')} - ${end.format('DD.MM.YYYY')}`
  }

  public render() {
    return (
        <div>
            <div className="field">
                <input className="date-interval-field" type="text" value={ this.selectionFormat() } onClick={ () => { this.setState({ isOpened: !this.state.isOpened }) } } readOnly />
                { this.state.selection.start !== undefined && <div className={ "clear-button" } onClick={ this.clearSelection } ></div> }   
            </div>
            { this.state.isOpened && <DoubleCalendar onSelect={this.calendarOnSelect.bind(this)} selection={this.state.selection} /> }
        </div>
    );
  }
}


