import React from 'react';

export default class Loader extends React.Component {
  render() {
    return (
    <>
    <div className={`loading-container ${this.props.show}` }>
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
