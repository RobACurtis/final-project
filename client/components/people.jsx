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
        <div key={userId} className='d-flex card-container'>
          <img className='card-img mt-3 mx-2' src={profileImageUrl} alt="user photo" />
          <div className='card-info'>
            <h4 className='card-name'>{`${firstName} ${lastName}`}</h4>
            <p className='card-location'>{`${location}`}</p>
          </div>
        </div>
        </>
      )
    })
    return (
      <>
      <div className='user-card-container'>
        <div className='user-card-list'>
        <p className='members-title'>Surfr Members</p>
          <div className='d-flex flex-wrap'>
              {userCards}
          </div>
          </div>
      </div>
      </>
    );
  }
}
