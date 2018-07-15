import React from 'react'
import {Link, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './component/Book'
import SearchPage from './component/SearchPage'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      books: [],
    }
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
      let temp = [];
      books.map((book) => {
        temp.push({
            id: book.id,
            title: book.title,
            author: book.authors,
            url: `url("${book.imageLinks ? book.imageLinks.smallThumbnail : 'http://books.google.com/books/content?id=IOejDAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'}")`,
            shelf: book.shelf,
          }
        );
        this.setState({
          books: temp,
        });
      return null;
      });
    });
  }

  onMove = (id, target) => {
    BooksAPI.update({id:id}, target)
    .then(() => {
      let newBooks = this.state.books;
      for (let i = 0; i < newBooks.length; i++) { 
        if (newBooks[i].id === id) {
          newBooks[i].shelf = target;
          break;
        }
      }
      this.setState({
        books: newBooks,
      });
    });
  };

  onAdd = (id, target, title, url, author) => {
    BooksAPI.update({id: id}, target)
    .then(() => {
      let i = 0;
      let newBooks = this.state.books;
      for (; i < newBooks.length; i++) { 
        // 如果已经在书架了
        if (newBooks[i].id === id) {
          newBooks[i].shelf = target;
          break;
        }
      }
      // 如果不在书架
      if (i === newBooks.length) {
        newBooks.push({
          id: id,
          title: title,
          author: author,
          url: url,
          shelf: target,
        });
      }
      this.setState({
        books: newBooks,
      });  
    });
  };

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchPage
            addBook={this.onAdd}
            books={this.state.books}
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
                          {this.state.books.map((item, index) => {
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
        )}/>
      </div>
    )
  }
}

export default BooksApp
