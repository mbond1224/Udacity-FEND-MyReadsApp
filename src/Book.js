//jshint esversion:6
import React, { Component } from 'react';

class Book extends Component {
  render() {
    const book = this.props.book;
    /* PlaceHolder Image  Author:Rogerborrell */
    const imgUrl= book.imageLinks?book.imageLinks.thumbnail:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Draw_book.png/260px-Draw_book.png';
    return (

      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imgUrl})` }}></div>
            <div className="book-shelf-changer">
              <select onChange={(e) => this.props.changeShelf(e, book)}
                value={book.shelf} >
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors ? book.authors.join(",") : ""}</div>
        </div>

      </li>

    )


  }
}
export default Book;