import React from 'react'
import {Link} from 'react-router-dom'
import Book from '../component/Book'
import * as BooksAPI from '../BooksAPI'

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      searchResults: [],
    }
  }

  onMove = (id, target, title, author, url) => {
    const {addBook} = this.props;
    if (addBook) {
      addBook(id, target, title, author, url);
    }
  };

  searchByTitle = () => event => {
    const sql = event.target.value;
    if (sql === '')
      return;
    Promise.resolve(BooksAPI.search(sql)).then((jsonResults) => {
      if (jsonResults.error !== undefined) {
        return;
      }
      let temp = [];
      jsonResults.map((book) => {
        temp.push({
          id: book.id,
          title: book.title,
          author: book.authors,
          url: `url("${book.imageLinks ? book.imageLinks.smallThumbnail : 'http://books.google.com/books/content?id=IOejDAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'}")`,
          }
        );
        this.setState((prevState, props) => {
          const shelfBooks = props.books;
          const newSearchBooks = temp.map(searchBook => {
            const searchBookInshelfBook = shelfBooks.find(
              shelfBook => shelfBook.id === searchBook.id
            );
            return {
              ...searchBook,
              shelf: searchBookInshelfBook
                ? searchBookInshelfBook.shelf
                : "none"
            };
          });
          return {
            searchResults: newSearchBooks,
          };
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
              {this.state.searchResults.map((item, index) => {
                return (
                  <Book 
                    id={item.id}
                    key={index}
                    title={item.title}
                    author={item.author}
                    url={item.url}
                    shelf={item.shelf}
                    move={this.onMove}
                  />
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage
