import React from 'react';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      images: null
    };
  }

  componentDidMount() {
    const userId = this.props.id;
    fetch('/api/explore-people/' + userId)
      .then(res => res.json())
      .then(user => this.setState({ user }));
  }

  render() {
      return (
     <div>hello wworld</div>
    )
}
}
