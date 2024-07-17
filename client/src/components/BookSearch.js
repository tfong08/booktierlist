import React, { useState, useEffect} from 'react';
import axios from 'axios';
import secrets from '../private/secrets.json';

axios.defaults.withCredentials = true;


const BookSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            if (query.length>2) {
                try{
                    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${secrets.google_api_key}`);
                    setResults(response.data.items.slice(0,5));
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            }
        };

        const timeoutId = setTimeout(() => {
            fetchBooks();
        },300);

        return () => clearTimeout(timeoutId);

    }, [query]);

const handleInputChange = (e) => {
    setQuery(e.target.value);
}

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for books..."
            />
            <div>
                {results?.map((book) => (
                    <div>
                        <h3>{book.volumeInfo.title}</h3>
                        <p>{book.volumeInfo.authors?.join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default BookSearch;