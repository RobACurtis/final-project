import React from 'react';

export default class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    };
    this.profilePage = this.profilePage.bind(this);
  }

  componentDidMount() {
    fetch('/api/explore-people')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  profilePage(e) {
    const targetId = event.target.id.split('-');
    const id = targetId[0];
    fetch('/api/explore-people/' + id)
      .then(res => res.json())
      .then(user => console.log(user));

  }

  render() {
    if (!this.state.users) return null;
    const users = this.state.users;
    const userCards = users.map(user => {
      const { firstName, lastName, location, profileImageUrl, userId } = user;
      return (
        <a href={`#people/${userId}`} id={`${userId}-link`} key={`${userId}-link`} >
        <div  id={`${userId}-container`} key={`${userId}-container`} className='d-flex card-container'>
          <img id={`${userId}-img`} key={ `${userId}-img`} className='card-img mt-3 mx-2' src={profileImageUrl} alt="user photo" />
          <div id={`${userId}-card-info`} key={`${userId}-card-info`} className='card-info'>
            <h4 id={`${userId}-fullname`} key={`${userId}-card-name`} className='card-name'>{`${firstName} ${lastName}`}</h4>
            <p id={`${userId}-location`} key={`${userId}-card-location`} className='card-location'>{`${location}`}</p>
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
          <div className='d-flex flex-wrap hello'>
              {userCards}
          </div>
          </div>
      </div>
      </>
    );
  }
}
