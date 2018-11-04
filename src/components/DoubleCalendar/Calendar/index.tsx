import * as React from 'react';
import './index.css';

export interface Props {
  data: {
    selection: Array<number>;
    days: number;
    offset: number;
    month:string;
  },
  onDayClick: (day: number) => void
}

class Calendar extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  generateDays = (offset: number, days: number) => {
    const weeks = Math.ceil((days + offset) / 7),
        arr = []
    let buf = [],
        num

    for(let i = 0; i < weeks; i++) {
        buf = []
        for(let j = 0; j < 7; j++) {
            num = i * 7 + j + 1;
            if (num > offset && num - offset <= days) {
                buf.push(num - offset)
            }
            else {
                buf.push(-1)
            }
        }
        arr.push(buf)
    }

    return arr
  }

  render() {
    return (
      <div className="calendar">
        <div className="month">
            <div className="arrow-button">&lt;</div>
            <div className="title">{this.props.data.month}</div>
            <div className="arrow-button">&gt;</div>
        </div>
        <div className="days">
            {   
                <div className="week">
                    {
                        ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'].map( (day, i) => {
                            return <div key={ i } className="day label">{ day }</div> 
                        })
                    }
                </div>
            }
            {
                this.generateDays(this.props.data.offset, this.props.data.days).map( (week, i) => {
                    return (
                        <div key={ i } className="week">
                            {
                                week.map( (day, j) => {
                                    if (day != -1) {
                                        let className = "day";

                                        if (day > this.props.data.selection[0] && day < this.props.data.selection[1])
                                            { className += " inner-selected" }
                                        else if (day == this.props.data.selection[0])
                                            { className += " start-selected" }
                                        else if (day == this.props.data.selection[1])
                                            { className += " end-selected" };

                                        if ((day == 1) && this.props.data.selection[0] == 0)
                                            { className += " first-child" }                                  
                                        else if ((day == this.props.data.days) && (this.props.data.selection[1] == day + 1))
                                            { className += " last-child" }

                                        if ((i * 7 + j) % 7 >= 5) {
                                            { className += " weekend" }
                                        }

                                        return <div key={ i * 7 + j } className={ className } onClick={ _ => this.props.onDayClick(day) }>{ day }</div>
                                    } else {
                                        return <div key={ i * 7 + j } className="day"></div>
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