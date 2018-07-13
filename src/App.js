import React from 'react'
import {Link, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './component/Book'
import SearchPage from './component/SearchPage'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.books = [];
  }

  shelfDic = () => {
    return (
      [
        { shelf: 'currentlyReading', name: 'Currently Reading' },
        { shelf: 'wantToRead', name: 'Want To Read' },
        { shelf: 'read', name: 'Read' }
      ]
    );
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      books.map((book, index) => {
        this.books.push(
          <Book 
            id={book.id}
            key={index}
            title={book.title}
            author={book.authors}
            url={`url("${book.imageLinks ? book.imageLinks.smallThumbnail : 'http://books.google.com/books/content?id=IOejDAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'}")`}
            shelf={book.shelf}
            move={this.onMove}
          />
        );
        this.setState({
          [book.id]: book.shelf,
        });
      return null;
      });
    });
  }

  onMove = (id, target, title = '', author = '', url = '') => {
    this.setState({
      [id]: target,
    });    
  };

  onAdd = (id, target, title, author, url) => {
    this.books.push(
      <Book 
        id={id}
        title={title}
        author={author}
        url={url}
        shelf={target}
        move={this.onMove}
      />
    );
    this.setState({
      [id]: target,
    });  
  };

  render() {
    // console.log(this.books.length);
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchPage
            addBook={this.onAdd}
          />
        )}/>
        <Route path='/' exact render={() => (
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
                          {this.books.map((item, index) => {
                            if (this.state[item.props.id] === shelf.shelf) {
                              return (
                                <Book 
                                  id={item.props.id}
                                  key={index}
                                  title={item.props.title}
                                  author={item.props.author}
                                  url={item.props.url}
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
        )}/>
      </div>
    )
  }
}

export default BooksApp
