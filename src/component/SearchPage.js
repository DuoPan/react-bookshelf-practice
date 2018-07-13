import React from 'react'
import {Link} from 'react-router-dom'
import Book from '../component/Book'
import * as BooksAPI from '../BooksAPI'

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.searchResults = [];
  }

  onMove = (id, target, title, author, url) => {
    this.setState({
      [id]: target,
    });
    const {addBook} = this.props;
    if (addBook) {
      addBook(id, target, title, author, url);
    }
  };

  searchByTitle = () => event => {
    this.searchResults = [];
    const sql = event.target.value;
    if (sql === '')
      return;
    Promise.resolve(BooksAPI.search(sql)).then((jsonResults) => {
      if (jsonResults.error !== undefined) {
        return;
      }
      jsonResults.map((book, index) => {
        this.searchResults.push(
          <Book 
            id={book.id}
            key={index}
            title={book.title}
            author={book.authors}
            url={`url("${book.imageLinks ? book.imageLinks.smallThumbnail : 'http://books.google.com/books/content?id=IOejDAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'}")`}
            shelf={book.shelf !== undefined ? book.shelf : 'none'}
            move={this.onMove}
          />
        );
        this.setState({
          [book.id]: (book.shelf !== undefined ? book.shelf : 'none'),
        });
        return null;
      });
    });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.searchByTitle()}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              {this.searchResults.map((item, index) => {
                if (this.state[item.props.id] === 'none') {
                  return (
                    <Book 
                      id={item.props.id}
                      key={index}
                      title={item.props.title}
                      author={item.props.author}
                      url={item.props.url}
                      shelf={'none'}
                      move={this.onMove}
                    />
                  );
                } else {
                  return null;
                }
              })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage
