import * as React from 'react';
import Calendar from './Calendar';
import './index.css';
import * as Moment from 'moment';
import 'moment/locale/ru';

export interface Props {
  selection: {
    start: Moment.Moment | undefined;
    end: Moment.Moment | undefined;
  },
  onSelect: (start: Moment.Moment | undefined, end: Moment.Moment | undefined) => void;
}

interface State {
  firstMonth: Moment.Moment;
  secondMonth: Moment.Moment;
  isStartSelected: boolean;
}

export default class DoubleCalendar extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      isStartSelected: false,
      firstMonth: props.selection.start !== undefined ? Moment(props.selection.start) : Moment(),
      secondMonth: props.selection.end !== undefined ? Moment(props.selection.end) : Moment().month(Moment().month() + 1)
    }
  }

  onDayClick = (day: Moment.Moment) => {
    const { selection } = this.props

    if(this.state.isStartSelected === false) {
      selection.start = Moment(day)
      selection.end = Moment(day)
    } else if (selection.start !== undefined) {
      if (selection.start.isBefore(day, 'day')) {
        selection.end = Moment(day)
      } else {
        selection.start = Moment(day)
        selection.end = Moment(day)
      }      
    }

    this.setState({
      isStartSelected: !this.state.isStartSelected
    })

    this.props.onSelect(selection.start, selection.end)
  }

  setFirstMonth = (month: Moment.Moment) => {
    const { secondMonth } = this.state
    if (month.isBefore(secondMonth, 'month')) {
      this.setState({
        firstMonth: month
      })
    }
  }

  setSecondMonth = (month: Moment.Moment) => {
    const { firstMonth } = this.state
    if (month.isAfter(firstMonth, 'month')) {
      this.setState({
        secondMonth: month
      })
    }
  }

  public render() {
    return (
      <div className="calendar-wrapper">
        <h3 className="calendar-header">ВЫБЕРИТЕ ПЕРИОД ОТОБРАЖЕНИЯ ДАННЫХ</h3>
        <div className="double-calendar">     
          <Calendar selection={ this.props.selection } onDayClick={ this.onDayClick } month={ this.state.firstMonth } setMonth={ this.setFirstMonth } />
          <Calendar selection={ this.props.selection } onDayClick={ this.onDayClick } month={ this.state.secondMonth } setMonth={ this.setSecondMonth } />
        </div>
      </div>
    );
  }
}


