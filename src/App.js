//jshint esversion:6
import React from 'react';
import * as BooksAPI from './BooksAPI';
import BookList from './BookList';
import './App.css';
import {Route, BrowserRouter, Link} from "react-router-dom";
import BookSearch from './BookSearch';
import Switch from 'react-router-dom/Switch';

class BooksApp extends React.Component {

  state = {
    books: [],
    showSearchPage: false
  }

  /**
   *
   *Fetch all books and set  the state
   * @memberof BooksApp
   */
  componentDidMount() {
    BooksAPI
      .getAll()
      .then((books) => {
        this.setState((state) => ({books}))
      })

  }

  /**
   *Handle the Shelf Change Functionality
   *
   * @param {*} e  The Selection event
   * @param {*} filteredBook  The Selected Book
   * @memberof BooksApp
   */
  changeShelf(e, filteredBook) {

    const books = this.state.books;
    const shelf = e.target.value;
    filteredBook.shelf = e.target.value;
    this.setState({books});

    BooksAPI
      .update(filteredBook, shelf)
      .then(() => {
        this.setState(state => ({
          books: state
            .books
            .filter(b => b.id !== filteredBook.id)
            .concat([filteredBook])
        }));
      });
  }

  /**
   *
   *
   * The component Render Method. Handles the routes
   * @memberof BooksApp
   */
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <BookList
                      key="bookshelf"
                      list={this.state.books}
                      changeShelf={(e, book) => this.changeShelf(e, book)}/>
                  </div>
                </div>
                <div className="open-search">
                  <Link to='/search'>
                    Add a book
                  </Link>
                </div>
              </div>
            )}/>
            <Route
              path="/search"
              render={() => (<BookSearch
              books={this.state.books}
              changeShelf={(e, book) => this.changeShelf(e, book)}/>)}/>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default BooksApp
