import React from 'react';
import './BookList.css'

const BookList = ({ bookList }) => {
    return(
        <div>
            <p className = 'book-list-header'>Book List:</p>
            <ol className='book-list'>
                {bookList.map((book) => (
                    <li>{book.title}</li>
                ))}
            </ol>
        </div>
    );
};

export default BookList;