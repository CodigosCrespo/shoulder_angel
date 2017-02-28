import React, { Component } from 'react';

class Board extends Component {
  constructor() {
    super();
    this.state = {
      replyValue: '',
      alignmentValue: 'angel',
      currentComment: 'Randomizing...',
      currentRepliesObj: {}
    }
    this.populateComment = this.populateComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReplyChange = this.handleReplyChange.bind(this);
    this.handleAlignmentChange = this.handleAlignmentChange.bind(this);
    this.repopulateComment = this.repopulateComment.bind(this);
  }

  componentDidMount() {
    this.populateComment(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.populateComment(nextProps);
  }

  handleReplyChange(event) {
    this.setState({ replyValue: event.target.value })
  }

  handleAlignmentChange(event) {
    this.setState({ alignmentValue: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    let { replyValue, alignmentValue, currentKey } = this.state;
    this.props.onNewReply(replyValue, alignmentValue, currentKey);
    this.setState({
      replyValue: ''
    })
  }

  populateComment(props) {
    let { comments } = props;
    if (Object.keys(comments).length >= 1) {
      // gets initial randomized index, sets state for access
      const randomIndex = Math.floor(Math.random() * (Object.keys(comments).length));
      this.setState({ currentIndex: randomIndex });
      // gets inital key based on randomized index, sets state for access
      const randomKey = Object.keys(comments)[randomIndex];
      this.setState({ currentKey: randomKey });
      // gets initial random comment with random key & index, sets state for access
      const randomComment = comments[randomKey];
      const currentComment = randomComment.comment;
      this.setState({ currentComment });
      // get initial array of replies
      const currentRepliesObj = randomComment.replies;
      this.setState({ currentRepliesObj })
      // stores the rest for our randomize button
      this.setState({ commentsObj: comments });
    }
  }

  repopulateComment(props) {
    let comments = this.state.commentsObj;
    // re-randomizing index value
    const randomIndex = Math.floor(Math.random() * (Object.keys(comments).length));
    this.setState({ currentIndex: randomIndex });
    // setting new key
    const randomKey = Object.keys(comments)[randomIndex];
    this.setState({ currentKey: randomKey });
    // setting new board comment
    const randomComment = comments[randomKey];
    const currentComment = randomComment.comment;
    this.setState({ currentComment });
    // setting new array of replies
    const currentRepliesObj = randomComment.replies;
    this.setState({ currentRepliesObj })
  }

  populateAngel() {
    let replies = this.state.currentRepliesObj;
    let content;
    if (replies) {
      let angelList = [];
      // eslint-disable-next-line
      Object.keys(replies).map((key) => {
        // sort through the current comment and separates the replies by the alignment value
        if (replies[key].alignment === "angel") {
          angelList.push(replies[key].reply)
        }
      })
      // take the sorted array above, and outputs it below;
      content = (
        angelList.map((item, index) =>
        <li key={index} value={index}>{item}</li>
        )
      )
    } else {
      content = '😇💬 Add some replies!';
    }
    return content;
  }

  populateDevil() {
    let replies = this.state.currentRepliesObj;
    let content;
    if (replies) {
      let devilList = [];
      // eslint-disable-next-line
      Object.keys(replies).map((key) => {
        // sort through the current comment and separates the replies by the alignment value
        if (replies[key].alignment === "devil") {
          devilList.push(replies[key].reply)
        }
      })
      // take the sorted array above, and outputs it below;
      content = (
        devilList.map((item, index) =>
        <li key={index} value={index}>{item}</li>
        )
      )
    } else {
      content = '😈💬 Add some replies!';
    }
    return content;
  }

  render() {
    return(
      <div className="board">
        <h2>Anonymous Confession Board:</h2>
        <div className='board-text'>
          <h1>
            {this.state.currentComment}
          </h1>
          <div className='board-text-button'>
            <button onClick={()=> this.repopulateComment()}>RANDOMIZE BUTTON</button>
          </div>
        </div>

        <div className="board-replies">
          <div className="flex-wrapper">
            <div className='angel-shoulder'>
              <h3>Shoulder Angels</h3>
              <p>Super-ego (the source of self-censorship):</p>
              <ul>
                {this.populateAngel()}
              </ul>
            </div>

            <div className='devil-shoulder'>
              <h3>Shoulder Devils</h3>
              <p>Id (the primal, instinctive desires of the individual):</p>
              <ul>
                {this.populateDevil()}
              </ul>
            </div>
          </div>
        </div>

          <form onSubmit={this.handleSubmit}>
            <div className="reply-form">
              <h2>Poof! A wild shoulder angel appears!</h2>
              <p>
                Got something to say? What shoulder are you on?
              </p>
                <div
                  value={this.state.alignmentValue}
                  className="radio"
                  onChange={this.handleAlignmentChange}
                >
                  <label>
                    <input type="radio" name="alignmentValue" value="angel"
                      defaultChecked={true} /> 😇 Angel
                  </label>
                  <label>
                    <input type="radio" name="alignmentValue" value="devil" /> 😈 (Fallen) Angel
                  </label>
                  <label>
                    <input type="radio" name="alignmentValue" value="devil" /> 🤖 Beep boop
                  </label>
                </div>

              <p>
                <label>What are your thoughts on the matter above?</label><br />
                <textarea
                  placeholder="If I were in your shoes..."
                  value={this.state.replyValue}
                  onChange={this.handleReplyChange}
                  >
                </textarea>
              </p>

              <p>
              <input type="submit" value="Send your words of wisdom!" />
              </p>
            </div>
          </form>
      </div>
    )
  }
}

export default Board;
