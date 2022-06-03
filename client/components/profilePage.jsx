import React from 'react';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      user: {
        firstName: null,
        lastName: null,
        email: null,
        location: null
      },
      imageUrls: []
    };
  }

  componentDidMount() {
    fetch('/api/photographer-profile/' + this.state.userId)
      .then(res => res.json())
      .then(user => {
        const firstName = user[0].firstName;
        const lastName = user[0].lastName;
        const email = user[0].email;
        const location = user[0].location;
        const imageUrls = user.map(imageUrl => {
          return imageUrl.imageUrl;
        });
        this.setState({
          user: { firstName, lastName, email, location },
          imageUrls
        });
      });
  }

  render() {
    return (
     <div>hello wworld</div>
    );
  }
}
