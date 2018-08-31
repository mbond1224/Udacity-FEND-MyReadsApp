//jshint esversion:6
import React, { Component } from 'react';
import Book from './Book';

/**
 * Component for listing the books and grouping by shelfs
 */
class BookList extends Component {
    // Define the shelfs. A quick way to change the labels or include additional type of shelfs
    Shelfs = [
        { name: "currentlyReading", displayName: "Currently Reading" },
        { name: "wantToRead", displayName: "Want to Read" },
        { name: "read", displayName: "Read" }
    ]
    // A function to partition the list by maps
    groupBy (nodelist, attr){
        let grouplist = [];
        nodelist.forEach(
            (node) => {
                grouplist[node[attr]] = grouplist[node[attr]] ? grouplist[node[attr]] : [];
                grouplist[node[attr]].push(node);
            }

        );
        return grouplist;
    }


    /**
     * Groups the book by shelf and render them
     * 
     * @returns
     * @memberof BookList
     */
    render() {
        const booklist = this.props.list;
        let books = this.groupBy(booklist, "shelf");
        const { changeShelf } = this.props;
        return (
            booklist && booklist.length ?

                this.Shelfs.map((shelf) => (<div className="bookshelf" key={shelf.name}>
                    <h2 className="bookshelf-title"> {shelf.displayName} </h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {
                                books[shelf.name] && books[shelf.name].length > 0 ? books[shelf.name].map((book) => <Book book={book} key={book.id} changeShelf={changeShelf} />) : (<div></div>)
                            }

                        </ol>
                    </div>
                </div>
                )) : (<div></div>)

        )
    }

}

export default BookList;