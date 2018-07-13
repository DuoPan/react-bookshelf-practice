import React from 'react'

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.status = props.shelf;
  }

  handleSelect = () => event => {
    const target = event.target.value;
    this.status = target;
    const {id, move, title, author, url} = this.props;
    if (move) {
      move(id, target, title, author, url);
    }
  };

  render() {
    const {title, url, author} = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: url }}></div>
            <div className="book-shelf-changer">
              <select onChange={this.handleSelect()} value={this.status}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{author}</div>
        </div>
      </li>
    );
  }
}

export default Book
