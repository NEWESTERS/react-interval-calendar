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
  public state = {
    isStartSelected: false,
    firstMonth: this.props.selection.start ? Moment(this.props.selection.start) : Moment(),
    secondMonth: this.props.selection.end ? Moment(this.props.selection.end) : Moment().month(Moment().month() + 1)
  } as State;

  onDayClick = (day: Moment.Moment) => {
    const { selection } = this.props;
    let { isStartSelected: startSelect } = this.state;

    if(!startSelect) {
      selection.start = Moment(day);
      selection.end = Moment(day);
      startSelect = true;
    } else if (selection.start) {
      if (selection.start.isBefore(day, 'day')) {
        selection.end = Moment(day);
        startSelect = false;
      } else {
        selection.start = Moment(day);
        selection.end = Moment(day);
        startSelect = true;
      }      
    };

    this.setState({
      isStartSelected: startSelect
    });

    this.props.onSelect(selection.start, selection.end);
  }

  setFirstMonth = (month: Moment.Moment) => {
    const { secondMonth } = this.state;

    if (month.isBefore(secondMonth, 'month')) {
      this.setState({
        firstMonth: month
      })
    }
  }

  setSecondMonth = (month: Moment.Moment) => {
    const { firstMonth } = this.state;

    if (month.isAfter(firstMonth, 'month')) {
      this.setState({
        secondMonth: month
      })
    }
  }

  checkNearMonths = (isLeftCalendar: boolean) => {
    const { secondMonth } = this.state;
    let firstMonth = Moment(this.state.firstMonth);

    firstMonth.add(1, 'month');

    if (firstMonth.isSame(secondMonth, 'month')) {
      return isLeftCalendar ? "right" : "left";
    } else {
      return "none";
    }
  }

  public render() {
    return (
      <div className="calendar-wrapper">
        <h3 className="calendar-header">ВЫБЕРИТЕ ПЕРИОД ОТОБРАЖЕНИЯ ДАННЫХ</h3>
        <div className="double-calendar">     
          <Calendar selection={ this.props.selection } onDayClick={ this.onDayClick } month={ this.state.firstMonth } disabledArrow={ this.checkNearMonths(true) } setMonth={ this.setFirstMonth } />
          <Calendar selection={ this.props.selection } onDayClick={ this.onDayClick } month={ this.state.secondMonth } disabledArrow={ this.checkNearMonths(false) } setMonth={ this.setSecondMonth } />
        </div>
      </div>
    );
  }
}


