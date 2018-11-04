import * as React from 'react';
import Calendar from './Calendar';
import './index.css';
import * as Moment from 'moment';
import 'moment/locale/ru';

interface State {
  left: {
    selection: Array<number>;
    days: number;
    offset: number;
    month: string;
  },

  right: {
    selection: Array<number>;
    days: number;
    offset: number;
    month: string;
  }
}

export default class DoubleCalendar extends React.Component<{}, State> {
  constructor(props: any) {
    super(props)

    Moment.locale('ru')

    const currentMonth = Moment(),
        nextMonth = Moment().month(currentMonth.month() + 1),
        nextNextMonth = Moment().month(nextMonth.month() + 1),

        currentMonthDays = nextMonth.diff(currentMonth, 'days'),
        nextMonthDays = nextNextMonth.diff(nextMonth, 'days')

    this.state = {
      left: {
        selection: [16, currentMonthDays + 1],
        days: currentMonthDays,
        offset: 1,
        month: currentMonth.format('MMMM YYYY')
      },
    
      right: {
        selection: [0, 10],
        days: nextMonthDays,
        offset: 3,
        month: nextMonth.format('MMMM YYYY')
      }
    }
  }

  // public state = {
  //   left: {
  //     selection: [14, 32],
  //     days: 31,
  //     offset: 1,
  //     month: Moment().format('MMMM')
  //   },
  
  //   right: {
  //     selection: [0, 10],
  //     days: 31,
  //     offset: 6,
  //     month: Moment().month(Moment().month() + 1).format('MMMM')
  //   }
  // }

  leftOnDayClick = (day: number) => {
    const selection = [day, 32]
    let prevState = this.state.left

    prevState.selection = selection
    this.setState({
      left: prevState
    })
  }

  rightOnDayClick = (day: number) => {
    const selection = [0, day]
    let prevState = this.state.right

    prevState.selection = selection
    this.setState({
      right: prevState
    })
  }

  public render() {
    return (
      <div className="double-calendar">
        <Calendar data={ this.state.left } onDayClick={ this.leftOnDayClick } />
        <Calendar data={ this.state.right } onDayClick={ this.rightOnDayClick } />
      </div>
    );
  }
}
