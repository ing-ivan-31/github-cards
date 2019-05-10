import React from 'react';
import axios from 'axios';

const testData = [
  { name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook" },
  { name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu" },
  { name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook" },
];

const CardList = (props) => (
  <div>
    {props.profiles.map( (profile, index)  => <Card key={index} {...profile} />)}
  </div>
);

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} alt={profile.name} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  //userNameInput = React.createRef();// Refs are for get the values from inputs this only one form you need the attribute ref={this.userNameInput} in input
  // With state we get the current status in the app
  state = { userName: ''};
  
  // Handle the submit form
  handleSubmit = (event) => {
    event.preventDefault();
    
    // Axios return a promise and async is need it 
    (
      async () => {
        const response =  await axios.get(`https://api.github.com/users/${this.state.userName}`);
        this.props.onSubmit(response.data)
        this.setState({userName: ''})
    })();
    
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
        placeholder="Github username" 
        value={this.state.userName} 
        onChange={event => this.setState({ userName:event.target.value })} 
        required />
        <button>Add card</button>
      </form>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: testData
    };
  }

  // this Arrow function was attache to event and can access since Form
  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]  // Concat operation for add new user
    }))
  }

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

export default App;
