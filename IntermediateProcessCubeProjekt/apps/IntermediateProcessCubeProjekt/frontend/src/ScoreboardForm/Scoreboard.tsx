import React, { Key } from 'react';

import { CustomFormProps } from '../DialogRenderer';

import './Scoreboard.css';


export class ScoreboardForm extends React.Component<CustomFormProps, { value: number }> {
  constructor(props: any) {
    super(props);

    this.state = { value: -1 };
  }



  public render(): JSX.Element {
    const scores = this.props.userTask?.tokens.at(-1)?.payload.scores;

    const greater_less_scores = scores.filter((score: { mode: string; }) => score.mode === 'g');
    const warmer_colder_scores = scores.filter((score: { mode: string; }) => score.mode === 'w');

    const arithmetic_mean = (scores: { score: number; }[]): number | string => {
      if (scores.length === 0) return 'No Games Played';
      let sum = 0;
      scores.forEach((element: { score: number; }) => {
        sum += element.score;
      });
      return sum / scores.length;
    };

    const full_arithmetic_mean = arithmetic_mean(scores);
    const greater_less_mean = arithmetic_mean(greater_less_scores);
    const warmer_colder_mean = arithmetic_mean(warmer_colder_scores);


    return (
      <div className='wrapper'>
        <h2>Scoreboard</h2>
        <hr />
        <h4>Gespielte Spiele: {scores.length}</h4>
        <table>
          <thead>
            <tr>
              <th>Modus</th>
              <th>Versuche</th>
            </tr>
          </thead>
          <tbody>
            {scores.map(
              (score: {
                [x: string]: Key; mode: string; score: number
              }) => {
                let mode = 'ERROR: Mode String is invalid!';
                if (score.mode === 'g') mode = 'Größer/Kleiner';
                else if (score.mode === 'w') mode = 'Wärmer/Kälter';
                return (
                  <tr key={score.id}>
                    <td>{mode}</td>
                    <td>{score.score}</td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
        <hr />
        <h4>Durchschnitte</h4>
        <table>
          <thead>
            <tr>
              <th>
                Modus
              </th>
              <th>
                Durchschnitt
              </th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Alle Spiele</td> <td>{full_arithmetic_mean}</td></tr>
            <tr><td>Größer/Kleiner</td> <td>{greater_less_mean}</td></tr>
            <tr><td>Wärmer/Kälter</td> <td>{warmer_colder_mean}</td></tr>
          </tbody>
        </table>
        <hr />
        <button onClick={this._handleFormSubmit.bind(this)}>
          Spiel beenden
        </button>
      </div>
    );
  }

  private _handleFormSubmit(): void {
    this.props.finishUserTask({});

  }

  private _handle_input_change(e: any): void {
    this.setState({ value: e.target.value });
  }
}
