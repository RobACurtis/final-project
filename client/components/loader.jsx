import React from 'react';

export default class Loader extends React.Component {
  render() {
    return (
    <>
    <div className={`${this.props.show} ${this.props.container}` }>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </div>
      </div>
    </>
    );
  }
}
