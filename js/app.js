import accessKey from "../config";

const authModal = document.getElementById('auth-modal');
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');
const signupForm = document.querySelector('#signup-form form');
const loginForm = document.querySelector('#login-form form');
const loginFormContainer = document.querySelector('#login-form');
const postContainer = document.getElementById('featured-articles');


// Show modal on signup button click
signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    authModal.classList.add('show');
    loginFormContainer.style.display = 'none';
    signupForm.parentElement.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Show modal on login button click
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    authModal.classList.add('show');
    loginFormContainer.style.display = 'block';
    signupForm.parentElement.style.display = 'none';
    document.body.style.overflow = 'hidden';
});

// Close modal when clicking outside the form
authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Redirect to a new page on form submission
function goToNewPage(e) {
    e.preventDefault();
    window.location.href = "successful.html";
}

function loginsucess(e) {
    e.preventDefault();
    window.location.href = "loginsucess.html";
}

// Show the login form when clicking the link in the signup form
signupForm.parentElement.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        loginBtn.click();
    }
});

loginFormContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        signupBtn.click();
    }
});

// Function to fetch posts and images
async function fetchPosts() {
    try {
        // Fetch images
        const imageResponse = await fetch(`https://api.unsplash.com/photos/random?count=9&query=blog&client_id=${accessKey}`);
        const imageData = await imageResponse.json();
        console.log(imageData);

        // Fetch posts
        const res = await fetch('https://dummyjson.com/posts?limit=9');
        const data = await res.json();

        const posts = data.posts;
        posts.forEach((post, index) => {
            const postElement = document.createElement('article');

            const imageUrl = imageData[index]?.urls.small || 'https://via.placeholder.com/300';

            postElement.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition';

            postElement.innerHTML = `<img src="${imageUrl}" alt="Article 4" class="w-full h-48 object-cover">

                <div class="p-4 pb-8"> 
                    <h3 class="text-xl font-semibold mb-2 text-blue-900">${post.title}</h3>
                    <p class="post-body text-gray-700 mb-4 truncate text-ellipsis white-space-nowrap">${post.body}</p>
                    <p class="text-sm text-gray-400">Tags: ${post.tags.join(', ')}</p>
                    <a href="post.html?id=${post.id}" class="block mt-4 w-fit hover:bg-red-700 transition text-white py-2 px-4 bg-red-600 rounded">Read More</a>
            </div>`
            postContainer.appendChild(postElement);
        });

    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

fetchPosts();