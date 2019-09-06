import React, { useEffect, useState } from "react";
import axios from 'axios';

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/books`)
      .then(res => {
        setBooks(res.data)
      });
  }, []);

  return (
    <div>
      <div>You Don't Know JS Book Series</div>
      <ul>
        {books.map(books => (
          <li key={books.name}>
            <a href={books.url}>{books.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Books;
