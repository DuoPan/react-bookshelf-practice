import React from 'react'
import {Link, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './component/Book'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'To Kill a Mockingbird': 'currentlyReading',
      "Ender's Game": 'currentlyReading',
      '1776': 'wantToRead',
      "Harry Potter and the Sorcerer's Stone": 'wantToRead',
      'The Hobbit': 'read',
      "Oh, the Places You'll Go!": 'read',
      'The Adventures of Tom Sawyer': 'read',
      books: [],
    };
    
  }

  getAllBooks = () => {
    return [
      {
        'url': 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")',
        'title': 'To Kill a Mockingbird',
        'author': 'Harper Lee',
      },
      {
        'url': 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")',
        'title': "Ender's Game",
        'author': 'Orson Scott Card',
      },
      {
        'url': 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")',
        'title': '1776',
        'author': 'David McCullough',
      },
      {
        'url': 'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")',
        'title': "Harry Potter and the Sorcerer's Stone",
        'author': 'J.K. Rowling',
      },
      {
        'url': 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")',
        'title': 'The Hobbit',
        'author': 'J.R.R. Tolkien',
      },
      {
        'url': 'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")',
        'title': "Oh, the Places You'll Go!",
        'author': 'Seuss',
      },
      {
        'url': 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")',
        'title': 'The Adventures of Tom Sawyer',
        'author': 'Mark Twain',
      },
    ];
  };

  onMove = (title, target) => {
    this.setState({
      [title]: target,
    });    
  };

  searchByTitle = () => event => {
    const sql = event.target.value;
    if (sql === '')
      return;
    Promise.resolve(BooksAPI.search(sql)).then((jsonResults) => {
      this.setState({
        books: jsonResults,
      });
    });
  };

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={this.searchByTitle()}/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.books.error === undefined && this.state.books.map((item, index) => {
                  return (
                    <Book 
                      key={index}
                      title={item.title}
                      author={item.authors}
                      url={`url("${item.imageLinks.smallThumbnail}")`}
                      shelf={'none'}
                      move={this.onMove}
                    />
                  )
                })}
              </ol>
            </div>
          </div>
        )}/>
        <Route path='/' exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.getAllBooks().map((item, index) => {
                        if (this.state[item.title] === 'currentlyReading') {
                          return (
                            <Book 
                              key={index}
                              title={item.title}
                              author={item.author}
                              url={item.url}
                              shelf={'currentlyReading'}
                              move={this.onMove}
                            />
                          )
                        } else {
                          return null;
                        }
                      })}
                      {this.state.books.error === undefined && this.state.books.map((item, index) => {
                        if (this.state[item.title] === 'currentlyReading') {
                          return (
                            <Book 
                              key={index}
                              title={item.title}
                              author={item.author}
                              url={`url("${item.imageLinks.smallThumbnail}")`}
                              shelf={'currentlyReading'}
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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.getAllBooks().map((item, index) => {
                        if (this.state[item.title] === 'wantToRead') {
                          return (
                            <Book 
                              key={index}
                              title={item.title}
                              author={item.author}
                              url={item.url}
                              shelf={'wantToRead'}
                              move={this.onMove}
                            />
                          )
                        } else {
                          return null;
                        }
                      })}
                      {this.state.books.error === undefined && this.state.books.map((item, index) => {
                        if (this.state[item.title] === 'wantToRead') {
                          return (
                            <Book 
                              key={index}
                              title={item.title}
                              author={item.author}
                              url={`url("${item.imageLinks.smallThumbnail}")`}
                              shelf={'wantToRead'}
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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.getAllBooks().map((item, index) => {
                        if (this.state[item.title] === 'read') {
                          return (
                            <Book 
                              key={index}
                              title={item.title}
                              author={item.author}
                              url={item.url}
                              shelf={'read'}
                              move={this.onMove}
                            />
                          )
                        } else {
                          return null;
                        }
                      })}
                       {this.state.books.error === undefined && this.state.books.map((item, index) => {
                        if (this.state[item.title] === 'read') {
                          return (
                            <Book 
                              key={index}
                              title={item.title}
                              author={item.author}
                              url={`url("${item.imageLinks.smallThumbnail}")`}
                              shelf={'read'}
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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">None</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.getAllBooks().map((item, index) => {
                        if (this.state[item.title] === 'none') {
                          return (
                            <Book 
                              key={index}
                              title={item.title}
                              author={item.author}
                              url={item.url}
                              shelf={'none'}
                              move={this.onMove}
                            />
                          )
                        } else {
                          return null;
                        }
                      })}
                       {this.state.books.error === undefined && this.state.books.map((item, index) => {
                        if (this.state[item.title] === 'none') {
                          return (
                            <Book 
                              key={index}
                              title={item.title}
                              author={item.author}
                              url={`url("${item.imageLinks.smallThumbnail}")`}
                              shelf={'none'}
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
