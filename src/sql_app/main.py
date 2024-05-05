from typing import Union
from typing import List
import sqlite3

from fastapi import FastAPI,HTTPException
from pydantic import BaseModel

app = FastAPI() 

class BookCreate(BaseModel):
    title: str
    author: str

class Book(BookCreate):
    id: int

def create_connection():
    connection = sqlite3.connect("books.db")
    return connection
def create_table():
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL
    )
    """)
    connection.commit()
    connection.close()

def create_book(book: BookCreate):
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("INSERT INTO books (title, author) VALUES (?, ?)", (book.title, book.author))
    connection.commit()
    connection.close()

create_table() # Call this function to create the table


@app.get( "/" ) 
def  read_root (): 
    return { "message" : "Selamat datang di CRUD API" }

@app.post("/books/")
def create_book_endpoint(book: BookCreate):
    book_id = create_book(book)
    return {"id": book_id, **book.dict()}


@app.get("/books/", response_model=List[Book])
def get_books():
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM books')
    books_data = cursor.fetchall()
    cursor.close()
    connection.close()
    return [Book(id=book[0], title=book[1], author=book[2]) for book in books_data]

@app.get("/books/{book_id}", response_model=Book)
def get_book(book_id: int):
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM books WHERE id = ?', (book_id,))
    book_data = cursor.fetchone()
    cursor.close()
    connection.close()
    if book_data:
        return Book(id=book_data[0], title=book_data[1], author=book_data[2])
    else:
        raise HTTPException(status_code=404, detail="Book not found")

# Update operation
@app.put("/books/{book_id}", response_model=Book)
def update_book(book_id: int, book: BookCreate):
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute('UPDATE books SET title=?, author=? WHERE id=?', (book.title, book.author, book_id))
    connection.commit()
    connection.close()
    if cursor.rowcount > 0:
        return {"id": book_id, **book.dict()}
    else:
        raise HTTPException(status_code=404, detail="Book not found")
    
@app.delete("/books/{book_id}")
def delete_book(book_id: int):
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute('DELETE FROM books WHERE id=?', (book_id,))
    connection.commit()
    connection.close()
    if cursor.rowcount > 0:
        return {"id": book_id}
    else:
        raise HTTPException(status_code=404, detail="Book not found")
