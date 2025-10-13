const SinglePostContainer = document.querySelector('.post-container');
const searchParams = new URLSearchParams(window.location.search);
const postId = searchParams.get('id');

async function fetchPost() {
  try {
    if (!postId) {
      postContainer.innerHTML = '<p class="text-red-500">No post selected.</p>';
      return;
    }

    // Fetch blog images
    const accessKey = "3UbGku0DL1R6vHMJxgQsJx26B4YsOkaFd-vFadyYZpA";

    const imageResponse = await fetch(`https://api.unsplash.com/photos/random?count=9&query=blog&client_id=${accessKey}`);
    const imageData = await imageResponse.json();

    const res = await fetch(`https://dummyjson.com/posts/${postId}`);
    if (!res.ok) throw new Error('Failed to fetch post');

    const post = await res.json();

    const imageUrl = imageData[postId]?.urls.small || 'https://via.placeholder.com/300';

    SinglePostContainer.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <img class="w-full h-[500px] object-cover rounded mb-4" src="${imageUrl}" alt="${post.tags[0] || 'blog image'}">
        <h2 class="text-2xl font-bold mb-2">${post.title}</h2>
        <p class="text-gray-600 mb-4">${post.body}</p>
        <p class="text-sm text-gray-400">Tags: ${post.tags.join(', ')}</p>
        <button class="mt-4 w-fit hover:bg-red-600 transition text-white py-2 px-4 bg-red-700 rounded cursor-pointer" onclick="window.history.back()">Go back</button>
      </div>
    `;
  } catch (error) {
    console.error('Error fetching post:', error);
    SinglePostContainer.innerHTML = '<p class="text-red-500">Error loading post. Please try again.</p>';
  }
}

fetchPost();


const asidePosts = document.querySelector('.recent-posts');

// Function to load recent posts in post.html
async function loadRecentPosts() {
  try {
    const accessKey = "3UbGku0DL1R6vHMJxgQsJx26B4YsOkaFd-vFadyYZpA";

    // Fetch images and posts
    const [imgRes, postRes] = await Promise.all([
      fetch(`https://api.unsplash.com/photos/random?count=5&query=blog&client_id=${accessKey}`),
      fetch('https://dummyjson.com/posts?limit=5')
    ]);

    const [imageData, postData] = await Promise.all([imgRes.json(), postRes.json()]);
    const posts = postData.posts;

    // Clear existing content
    asidePosts.innerHTML = '';

    posts.forEach((post, i) => {
      const asideImageUrl = imageData[i]?.urls.thumb || 'https://via.placeholder.com/100';

      const article = document.createElement('article');
      article.className = "bg-white p-4 rounded-lg shadow-md w-full flex items-start gap-3 mb-3";

      article.innerHTML = `
        <img src="${asideImageUrl}" alt="${post.title}" class="w-20 h-20 object-cover rounded">
        <div>
          <h2 class="text-md font-semibold text-blue-900">${post.title}</h2>
            <p class="text-gray-600 text-sm line-clamp-2">${post.body}</p>
            <a href="post.html?id=${post.id}" class="text-red-600 text-sm hover:underline">Read More</a>
          </div>
      `;
      asidePosts.appendChild(article);
    });
  } catch (err) {
    console.error('Error loading recent posts:', err);
  }
}

loadRecentPosts();
