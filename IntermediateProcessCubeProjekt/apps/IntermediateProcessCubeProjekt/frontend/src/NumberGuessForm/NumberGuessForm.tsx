import React from 'react';

import { CustomFormProps } from '../DialogRenderer';

import './NumberGuessForm.css';


export class NumberGuessForm extends React.Component<CustomFormProps, { value: number }> {
  constructor(props: any) {
    super(props);

    this.state = { value: -1 };
  }
  
  public render(): JSX.Element {
    return (
      <div className='test-class'>
        <h2>Rate eine Zahl zwischen 1 und 100.</h2>
        <input type='number' placeholder='1-100' onChange={this._handle_input_change.bind(this)} min='1' max='100' />
        <button onClick={this._handleFormSubmit.bind(this)}>
          Confirm
        </button>
      </div>
    );
  }

  private _handleFormSubmit(): void {
    if (this.state.value < 1 || this.state.value > 100) {
      alert('Du must eine Zahl zwischen 1 und 100 raten!');
      return;
    }
    this.props.finishUserTask({
      guess: this.state.value,
    });

  }

  private _handle_input_change(e: any): void {
    this.setState({ value: e.target.value });
  }
}
