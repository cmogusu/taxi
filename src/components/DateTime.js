import React from 'react';


type Props = {};

class DateTime extends React.Component<Props> {
  onChange = () => {
    console.log('hello there');
  }

  render() {
    return (
      <React.Fragment>
        <input type="date" onChange={this.onChange} placeholder="write date" />
        <input type="time" onChange={this.onChange} placeholder="write time" />
      </React.Fragment>
    );
  }
}


export default DateTime;
