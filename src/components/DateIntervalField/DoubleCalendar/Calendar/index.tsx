import * as React from 'react';
import './index.css';
import * as Moment from 'moment';
import 'moment/locale/ru';

export interface Props {
  selection: {
    start: Moment.Moment | undefined;
    end: Moment.Moment | undefined;
  };
  month: Moment.Moment;
  setMonth: (month: Moment.Moment) => void;
  onDayClick: (day: Moment.Moment) => void;
}

class Calendar extends React.Component<Props> {
  // Генерация матрицы месяца
  getDaysForMonth = () => {
    const weeks = 6,
        arr = [],
        offset = +this.props.month.date(1).format('e'),
        days = this.props.month.daysInMonth()
    let buf = [],
        num

    for(let i = 0; i < weeks; i++) {
        buf = []
        for(let j = 0; j < 7; j++) {
            num = i * 7 + j + 1;
            if (num > offset && num - offset <= days) {
                buf.push(Moment(this.props.month).date(num - offset))
            }
            else {
                buf.push(undefined)
            }
        }
        arr.push(buf)
    }

    return arr
  }

  setNextMonth = () => {
    const currentMonth = Moment(this.props.month)
    currentMonth.add(1, 'month')

    this.props.setMonth(currentMonth)
  }

  setPreviousMonth = () => {
    const currentMonth = Moment(this.props.month)
    currentMonth.subtract(1, 'month')

    this.props.setMonth(currentMonth)
  }

  render() {
    return (
      <div className="calendar">
        <div className="month">
            <div className="control arrow-button left" onClick={ this.setPreviousMonth } />
            <div className="control title">{ this.props.month.format('MMMM YYYY') }</div>
            <div className="control arrow-button right" onClick={ this.setNextMonth } />
        </div>
        <div className="days">
            {   
                <div className="week">
                    {   
                        // Рендеринг дней недели в шапке
                        ["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"].map( (day, i) => {
                            return <div key={ i } className="day label">{ day }</div> 
                        })
                    }
                </div>
            }
            {
                this.getDaysForMonth().map( (week, i) => {
                    return (
                        <div key={ i } className="week">
                            {
                                week.map( (day, j) => {
                                    if (day !== undefined) {
                                        let className = "day";
                                        // Выбор варианта выделения
                                        if (this.props.selection.start !== undefined && this.props.selection.end !== undefined) {
                                            if (day.isAfter(this.props.selection.start, 'day') && day.isBefore(this.props.selection.end, 'day'))
                                                { className += " inner-selected" }
                                            else {
                                                if (day.isSame(this.props.selection.start, 'day'))
                                                    { className += " start-selected" }
                                                if (day.isSame(this.props.selection.end,'day'))
                                                    { className += " end-selected" }
                                            }
                                            // Скругление выделения в первый и последний день месяца
                                            if (day.date() == 1 && this.props.selection.start.isBefore(day, 'day'))
                                                { className += " first-child" }                                  
                                            else if (day.date() == this.props.month.daysInMonth() && this.props.selection.end.isAfter(day, 'day'))
                                                { className += " last-child" }
                                        }

                                        // Стиль для выходных
                                        if ((i * 7 + j) % 7 >= 5) {
                                            { className += " weekend" }
                                        }
                                        // Рендеринг элемента с днём
                                        return <div key={ i * 7 + j } className={ className } onClick={ () => this.props.onDayClick(day) }>{ day.date() }</div>
                                    } else {
                                        // Рендеринг заглушки
                                        return <div key={ i * 7 + j } className="day placeholder" />
                                    }
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
      </div>
    );
  }
}

export default Calendar;