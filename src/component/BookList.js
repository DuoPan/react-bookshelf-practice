import React from 'react'
import {Link} from 'react-router-dom'
import Book from '../component/Book'
import PropTypes from 'prop-types'

class BookList extends React.Component {
  shelfDic = () => {
    return (
      [
        { shelf: 'currentlyReading', name: 'Currently Reading' },
        { shelf: 'wantToRead', name: 'Want To Read' },
        { shelf: 'read', name: 'Read' }
      ]
    );
  };

  onMove = (id, target) => {
    const {move} = this.props;
    if(move) {
      move(id, target);
    }
  };

  render() {
    const {books} = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.shelfDic().map((shelf, index) => {
              return (
                <div className="bookshelf" key={`shelf_${index}`}>
                  <h2 className="bookshelf-title">{shelf.name}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {books.map((item, index) => {
                        if (item.shelf === shelf.shelf) {
                          return (
                            <Book 
                              id={item.id}
                              key={index}
                              title={item.title}
                              author={item.author}
                              url={item.url}
                              shelf={shelf.shelf}
                              move={this.onMove}
                            />
                          )
                        } else {
                          return null;
                        }
                      })}
                    </ol>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Search a book</Link>
        </div>
      </div>
    );
  }
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  move: PropTypes.func.isRequired,
};

export default BookList
