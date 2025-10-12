# Blog Website (Frontend + API Integration)

This is a **frontend blog website** that dynamically displays posts fetched from two public APIs:
- **[DummyJSON API](https://dummyjson.com/)** — provides blog post content (title, body, tags, etc.)
- **[Unsplash Image API](https://unsplash.com/developers)** — provides random or category-based images for each post

This project demonstrates how to connect the **frontend (HTML/CSS/JS)** to **external APIs**, fetch data asynchronously, and display it dynamically.

---

## 🚀 Project Overview

The website allows users to:
- View a list of blog posts with accompanying images  
- Read individual post details  
- (Optional) Search posts by keyword  
- (Optional) View comments for each post  

It was built as part of a **backend development learning exercise**, focusing on consuming APIs from a frontend interface.

---

## 🧩 Tech Stack

- **HTML5** – Structure  
- **CSS3** – Styling and layout  
- **JavaScript (ES6+)** – Fetching and rendering API data  
- **DummyJSON API** – Source of post data  
- **Unsplash API** – Source of post images  

---

## 📁 Folder Structure

blog-project/
│
├── index.html # Homepage – lists all posts
├── post.html # Displays a single post
│
├── css/
│ └── style.css # Styling and responsiveness
│
├── js/
│ ├── main.js # Fetch posts + images for homepage
│ └── post.js # Fetch single post details + image
│
└── README.md
