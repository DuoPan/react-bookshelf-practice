import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.status = props.shelf;
  }

  handleSelect = () => event => {
    const target = event.target.value;
    this.status = target;
    const {id, move, title, url, author} = this.props;
    if (move) {
      move(id, target, title, url, author);
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

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  url: PropTypes.string,
  author: PropTypes.array,
  move: PropTypes.func.isRequired,
};

export default Book
