import React, { Component } from 'react';
import axios from 'axios';
import Board from './components/Board';
import Add from './components/Add';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      comments: {},
    }
    this.getComments = this.getComments.bind(this);
    this.addComment = this.addComment.bind(this);
    this.addReply = this.addReply.bind(this);
  }

  // this will populate the board with comments and their replies
  getComments() {
    axios({
      url: 'public-board/.json',
      baseURL: 'https://shoulder-angel.firebaseio.com/',
      method: "GET",
    }).then((response) => {
      // array of comment objects
      this.setState({ comments: response.data })
      // will need key and reply key
    }).catch((error) => {
      console.log(error);
    });
  }

  addComment(comment) {
    let newComment = {
       comment: comment,
       replies: {}
      };
    axios({
      url: 'public-board/.json',
      baseURL: 'https://shoulder-angel.firebaseio.com/',
      method: "POST",
      data: newComment
    }).then(() => {
      this.getComments();
    }).catch((error) => {
      console.log(error);
    });
  }

  addReply(reply, alignment, key) {
    let newReply = {
       reply: reply,
       alignment: alignment
      };
    axios({
      // takes the firebase id of the board's current comment
      url: `${key}/replies.json`,
      baseURL: 'https://shoulder-angel.firebaseio.com/public-board/',
      method: "POST",
      data: newReply
    }).then(() => {
      this.getComments();
    }).catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.getComments();
  }

  render() {
    return (
        <div className="App">
          <Board
            onNewReply={this.addReply}
            comments={this.state.comments}
          />
          <Add onNewComment={this.addComment} />
        </div>
    );
  }
}

export default App;
