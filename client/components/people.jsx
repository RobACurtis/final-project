import React from 'react';

export default class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
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
    const userCards = users.map(user => {
      const { firstName, lastName, location, profileImageUrl, userId } = user;
      return (
        <a href={`#photographer-profile?userId=${userId}`} key={`${userId}-link`} >
        <div key={`${userId}-container`} className='d-flex card-container'>
          <img key={ `${userId}-img`} className='card-img mt-3 mx-2' src={profileImageUrl} alt="user photo" />
          <div key={`${userId}-card-info`} className='card-info'>
            <h4 key={`${userId}-card-name`} className='card-name'>{`${firstName} ${lastName}`}</h4>
            <p key={`${userId}-card-location`} className='card-location'>{`${location}`}</p>
          </div>
        </div>
        </a>
      );
    });

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
