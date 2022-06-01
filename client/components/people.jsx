import React from 'react';

export default class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };
  }

  componentDidMount() {
    fetch('/api/explore-people')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    if (!this.state.users) return null;
    const users = this.state.users;
    let userId = 0;
    const userCards = users.map(user => {
      userId++;
      const {firstName, lastName, location, profileImageUrl} = user;
      return (
        <>
        <div key={userId} className='d-flex'>
          <img src={profileImageUrl} alt="user photo" />
          <div>
            <h4>{`${firstName} ${lastName}`}</h4>
            <p>{`${location}`}</p>
          </div>
        </div>
        </>
      )
    })
    return (
      <>
      {userCards}
      </>
    );
  }
}
