import React from 'react';

import { StartDialogProps, StartDialogRendererState } from '../DialogRenderer';

export class ExampleStartDialog extends React.Component<StartDialogProps, StartDialogRendererState> {
  input = '';

  public render(): JSX.Element {
    return (
      <div>
        <h2>Zahlenraten</h2>
        <h3>Wie heißt du?</h3>
        <input type='text' placeholder='Name' onChange={this._handle_input_change.bind(this)} />
        <button onClick={() => this._handleOnClick()}>Spiel Starten</button>
      </div>
    );
  }

  private _handleOnClick(): void {
    this.props.startProcess('Zahlenraten', {
      name: this.input,
    });
  }

  private _handle_input_change(e: any): void {
    this.input = e.target.value;
  }
}
