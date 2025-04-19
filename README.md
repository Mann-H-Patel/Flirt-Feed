# 📝 Express Posts App

A simple Express.js web application to create, read, update, and delete (CRUD) posts using EJS for templating and JSON files for data storage.

---

## 🚀 Features

- 📃 View all posts
- ➕ Add new post
- 🔍 View individual post
- ✏️ Edit a post
- ❌ Delete a post
- 💾 Data persistence with `posts.json` and `id.json`
- 🖥️ Server-side rendering using EJS
- 🔄 Method override to support PATCH and DELETE requests in HTML forms

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- EJS (Embedded JavaScript Templates)
- JSON file system storage
- Method-Override middleware

---

## 📦 Installation

### 1. Clone the Repository

bash

git clone https://github.com/Mann-H-Patel/Flirt-Feed.git
cd Flirt-Feed

### 2. Install Dependencies

npm install

### 3. Initialize Data Files

Make sure the following two files exist in the root directory:

1. - id.json -> 

{
  "id": 0
}

2. - posts.json -> 

[]

### 4. Run The App

# node index.js



