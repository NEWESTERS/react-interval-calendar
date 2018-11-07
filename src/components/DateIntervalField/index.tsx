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
  private node: HTMLDivElement;
  constructor(props: any) {
    super(props)

    this.state = {
      selection: {
        start: undefined,
        end: undefined
      },
      isOpened: false
    }
  }

  handleOutsideClick = (e: Event) => {
    // ignore clicks on the component itself
    if (this.node.contains(e.target as HTMLElement)) {
      return;
    }
    
    this.changeIsOpened();
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

  changeIsOpened = () => {
    const { isOpened } = this.state

    if (!isOpened) {
      document.addEventListener('click', this.handleOutsideClick);
    } else {
      document.removeEventListener('click', this.handleOutsideClick);
    }

    this.setState({
      isOpened: !isOpened
    })
  }

  selectionFormat = () => {
    const { start, end } = this.state.selection

    if (start === undefined || end === undefined) { return '' }

    return `${start.format('DD.MM.YYYY')} - ${end.format('DD.MM.YYYY')}`
  }

  public render() {
    return (
        <div className="date-interval-field" >
            <div className="field">
                <input className="date-interval-field-input" type="text" value={ this.selectionFormat() } onClick={ this.changeIsOpened } readOnly />
                { this.state.selection.start !== undefined && <div className={ "clear-button" } onClick={ this.clearSelection } /> }   
            </div>
            <div ref={ (el: HTMLDivElement) => {this.node = el} }>{ this.state.isOpened && <DoubleCalendar onSelect={ this.calendarOnSelect } selection={ this.state.selection } /> }</div>
        </div>
    );
  }
}


