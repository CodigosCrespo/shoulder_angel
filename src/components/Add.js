import React, { Component } from 'react';

class Add extends Component {
constructor() {
  super();
  this.state = {
    commentValue: ''
  }
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleCommentChange = this.handleCommentChange.bind(this);
}

handleCommentChange(event) {
  this.setState({ commentValue: event.target.value })
}

handleSubmit(event) {
  event.preventDefault();
  let { commentValue } = this.state;
  this.props.onNewComment(commentValue);
  this.setState({
    commentValue: ''
  })
}

  render() {
    return(
      <div className="add-form">
        <form onSubmit={this.handleSubmit}>
          <div className="comment-form">
            <h2>Add your own question or confession to discuss!</h2>
            <p>
              <label>Off into the nether your question goes. Hopefully your shoulder angel is awake!</label><br />
              <textarea
                placeholder="I have been on the fence about..."
                value={this.state.commentValue}
                onChange={this.handleCommentChange}
                >
              </textarea>
            </p>

            <p>
            <input type="submit" value="Submit" />
            </p>
          </div>
        </form>
      </div>
    )
  }
}

export default Add;
