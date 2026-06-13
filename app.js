   // DOM Elements
        const authContainer = document.getElementById('auth-container');
        const loginBox = document.getElementById('login-box');
        const signupBox = document.getElementById('signup-box');
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const showSignup = document.getElementById('show-signup');
        const showLogin = document.getElementById('show-login');
        
        const appContainer = document.getElementById('app-container');
        const userAvatar = document.getElementById('user-avatar');
        const profileAvatar = document.getElementById('profile-avatar');
        const profileName = document.getElementById('profile-name');
        const profileBio = document.getElementById('profile-bio');
        const postsCount = document.getElementById('posts-count');
        const followersCount = document.getElementById('followers-count');
        const followingCount = document.getElementById('following-count');
        const themeToggle = document.getElementById('theme-toggle');
        const logoutBtn = document.getElementById('logout-btn');
        const navTabs = document.querySelectorAll('.nav-tab');
        
        const searchInput = document.getElementById('search-input');
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        const postInput = document.getElementById('post-input');
        const imageInput = document.getElementById('image-input');
        const videoInput = document.getElementById('video-input');
        const galleryInput = document.getElementById('gallery-input');
        const imageBtn = document.getElementById('image-btn');
        const videoBtn = document.getElementById('video-btn');
        const galleryBtn = document.getElementById('gallery-btn');
        const charCount = document.getElementById('char-count');
        const postBtn = document.getElementById('post-btn');
        const emojiBtns = document.querySelectorAll('.emoji-btn');
        
        const postsFeed = document.getElementById('posts-feed');
        const reelsFeed = document.getElementById('reels-feed');
        const galleryFeed = document.getElementById('gallery-feed');
        const galleryGrid = document.getElementById('gallery-grid');
        
        const mediaModal = document.getElementById('media-modal');
        const modalImage = document.getElementById('modal-image');
        const modalVideo = document.getElementById('modal-video');
        const closeMediaModal = document.getElementById('close-media-modal');

        // State Variables
        let currentUser = null;
        let users = [];
        let posts = [];
        let reels = [];
        let currentFilter = 'latest';
        let searchQuery = '';
        let currentMediaType = null; // 'image', 'video', or null
        let currentTab = 'posts';

        // Initialize App
        function initApp() {
            // Load users from localStorage
            const savedUsers = localStorage.getItem('users');
            if (savedUsers) {
                users = JSON.parse(savedUsers);
            } else {
                // Create some demo users if none exist
                users = [
                    {
                        id: '1',
                        name: 'John Doe',
                        email: 'john@example.com',
                        password: 'password123',
                        bio: 'Travel enthusiast and photography lover',
                        followers: ['2', '3'],
                        following: ['2'],
                        joinDate: new Date().toISOString()
                    },
                    {
                        id: '2',
                        name: 'Jane Smith',
                        email: 'jane@example.com',
                        password: 'password123',
                        bio: 'Foodie and adventure seeker',
                        followers: ['1'],
                        following: ['1'],
                        joinDate: new Date().toISOString()
                    },
                    {
                        id: '3',
                        name: 'Mike Johnson',
                        email: 'mike@example.com',
                        password: 'password123',
                        bio: 'Tech geek and gamer',
                        followers: [],
                        following: ['1'],
                        joinDate: new Date().toISOString()
                    }
                ];
                localStorage.setItem('users', JSON.stringify(users));
            }

            // Check if user is already logged in
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
                showApp();
            } else {
                showAuth();
            }

            // Load posts from localStorage
            const savedPosts = localStorage.getItem('posts');
            if (savedPosts) {
                posts = JSON.parse(savedPosts);
            } else {
                // Create some demo posts if none exist
                posts = [
                    {
                        id: '1',
                        userId: '1',
                        userName: 'John Doe',
                        content: 'Welcome to SocialApp! This is my first post.',
                        mediaUrl: null,
                        mediaType: null,
                        likes: 5,
                        liked: false,
                        timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
                    },
                    {
                        id: '2',
                        userId: '2',
                        userName: 'Jane Smith',
                        content: 'Beautiful sunset at the beach today! 🌅',
                        mediaUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                        mediaType: 'image',
                        likes: 12,
                        liked: false,
                        timestamp: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
                    },
                    {
                        id: '3',
                        userId: '1',
                        userName: 'John Doe',
                        content: 'Amazing mountain view from my hike today! 🏔️',
                        mediaUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                        mediaType: 'image',
                        likes: 8,
                        liked: false,
                        timestamp: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
                    }
                ];
                localStorage.setItem('posts', JSON.stringify(posts));
            }

            // Load reels from localStorage
            const savedReels = localStorage.getItem('reels');
            if (savedReels) {
                reels = JSON.parse(savedReels);
            } else {
                // Create some demo reels if none exist
                reels = [
                    {
                        id: '1',
                        userId: '1',
                        userName: 'John Doe',
                        content: 'Check out this amazing travel video! ✈️',
                        mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
                        likes: 8,
                        liked: false,
                        timestamp: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
                    },
                    {
                        id: '2',
                        userId: '2',
                        userName: 'Jane Smith',
                        content: 'Cooking up something delicious! 🍳',
                        mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
                        likes: 15,
                        liked: false,
                        timestamp: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
                    }
                ];
                localStorage.setItem('reels', JSON.stringify(reels));
            }

            // Set up event listeners
            setupEventListeners();
            
            // Render initial content
            updateProfile();
            renderPosts();
            renderReels();
            renderGallery();
        }

        // Set up all event listeners
        function setupEventListeners() {
            // Auth events
            showSignup.addEventListener('click', () => toggleAuthForms('signup'));
            showLogin.addEventListener('click', () => toggleAuthForms('login'));
            loginForm.addEventListener('submit', handleLogin);
            signupForm.addEventListener('submit', handleSignup);
            
            // App events
            userAvatar.addEventListener('click', updateProfile);
            themeToggle.addEventListener('click', toggleTheme);
            logoutBtn.addEventListener('click', handleLogout);
            
            // Tab events
            navTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabName = tab.getAttribute('data-tab');
                    switchTab(tabName);
                });
            });
            
            // Post creation events
            postInput.addEventListener('input', handlePostInput);
            postBtn.addEventListener('click', createPost);
            
            // Media button events
            imageBtn.addEventListener('click', () => toggleMediaInput('image'));
            videoBtn.addEventListener('click', () => toggleMediaInput('video'));
            galleryBtn.addEventListener('click', () => galleryInput.click());
            galleryInput.addEventListener('change', handleGalleryUpload);
            
            // Emoji buttons
            emojiBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const emoji = btn.getAttribute('data-emoji');
                    insertEmoji(emoji);
                });
            });
            
            // Search and filter events
            searchInput.addEventListener('input', handleSearch);
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentFilter = btn.getAttribute('data-filter');
                    if (currentTab === 'posts') {
                        renderPosts();
                    } else if (currentTab === 'reels') {
                        renderReels();
                    }
                });
            });
            
            // Media modal events
            closeMediaModal.addEventListener('click', closeMediaModalFunc);
        }

        // Toggle between login and signup forms
        function toggleAuthForms(form) {
            if (form === 'signup') {
                loginBox.style.display = 'none';
                signupBox.style.display = 'block';
            } else {
                signupBox.style.display = 'none';
                loginBox.style.display = 'block';
            }
        }

        // Handle login
        function handleLogin(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                showApp();
            } else {
                alert('Invalid email or password. Please try again.');
            }
        }

        // Handle signup
        function handleSignup(e) {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            
            const existingUser = users.find(u => u.email === email);
            
            if (existingUser) {
                alert('User with this email already exists. Please log in.');
                return;
            }
            
            // Create new user
            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                password,
                bio: "Welcome to my profile!",
                followers: [],
                following: [],
                joinDate: new Date().toISOString()
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            currentUser = newUser;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showApp();
        }

        // Handle logout
        function handleLogout() {
            if (confirm('Are you sure you want to log out?')) {
                currentUser = null;
                localStorage.removeItem('currentUser');
                showAuth();
                
                // Reset forms
                loginForm.reset();
                signupForm.reset();
            }
        }

        // Toggle theme
        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
            localStorage.setItem('darkMode', isDarkMode);
        }

        // Switch between posts, reels, and gallery tabs
        function switchTab(tabName) {
            currentTab = tabName;
            
            navTabs.forEach(tab => {
                if (tab.getAttribute('data-tab') === tabName) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
            
            // Hide all feeds
            postsFeed.style.display = 'none';
            reelsFeed.style.display = 'none';
            galleryFeed.style.display = 'none';
            
            // Show the selected feed
            if (tabName === 'posts') {
                postsFeed.style.display = 'flex';
                renderPosts();
            } else if (tabName === 'reels') {
                reelsFeed.style.display = 'flex';
                renderReels();
            } else if (tabName === 'gallery') {
                galleryFeed.style.display = 'block';
                renderGallery();
            }
        }

        // Show auth screen
        function showAuth() {
            authContainer.style.display = 'flex';
            appContainer.style.display = 'none';
        }

        // Show app screen
        function showApp() {
            authContainer.style.display = 'none';
            appContainer.style.display = 'block';
            userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
            
            // Apply saved theme
            const savedDarkMode = localStorage.getItem('darkMode') === 'true';
            if (savedDarkMode) {
                document.body.classList.add('dark-mode');
                themeToggle.textContent = '☀️';
            }
            
            // Update profile
            updateProfile();
        }

        // Update profile information
        function updateProfile() {
            profileAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
            profileName.textContent = currentUser.name;
            profileBio.textContent = currentUser.bio || "Welcome to my profile!";
            
            // Calculate user stats
            const userPosts = posts.filter(p => p.userId === currentUser.id).length;
            const userReels = reels.filter(r => r.userId === currentUser.id).length;
            const totalPosts = userPosts + userReels;
            
            postsCount.textContent = totalPosts;
            followersCount.textContent = currentUser.followers ? currentUser.followers.length : 0;
            followingCount.textContent = currentUser.following ? currentUser.following.length : 0;
        }

        // Toggle media input (image/video)
        function toggleMediaInput(type) {
            // Reset all media inputs
            imageInput.style.display = 'none';
            videoInput.style.display = 'none';
            currentMediaType = null;
            
            if (type === currentMediaType) {
                // If clicking the same button, toggle off
                currentMediaType = null;
                return;
            }
            
            currentMediaType = type;
            
            if (type === 'image') {
                imageInput.style.display = 'block';
            } else if (type === 'video') {
                videoInput.style.display = 'block';
            }
        }

        // Handle gallery upload
        function handleGalleryUpload(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(event) {
                const dataUrl = event.target.result;
                
                if (file.type.startsWith('image/')) {
                    currentMediaType = 'image';
                    imageInput.value = dataUrl;
                    imageInput.style.display = 'block';
                } else if (file.type.startsWith('video/')) {
                    currentMediaType = 'video';
                    videoInput.value = dataUrl;
                    videoInput.style.display = 'block';
                }
            };
            reader.readAsDataURL(file);
        }

        // Handle post input
        function handlePostInput() {
            const text = postInput.value;
            charCount.textContent = text.length;
            
            // Enable/disable post button based on content
            postBtn.disabled = text.trim().length === 0 || text.length > 500;
        }

        // Insert emoji into post input
        function insertEmoji(emoji) {
            const cursorPos = postInput.selectionStart;
            const textBefore = postInput.value.substring(0, cursorPos);
            const textAfter = postInput.value.substring(cursorPos);
            
            postInput.value = textBefore + emoji + textAfter;
            postInput.focus();
            postInput.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
            
            // Trigger input event to update character count
            const event = new Event('input');
            postInput.dispatchEvent(event);
        }

        // Create a new post or reel
        function createPost() {
            const content = postInput.value.trim();
            let mediaUrl = null;
            
            if (currentMediaType === 'image') {
                mediaUrl = imageInput.value.trim();
            } else if (currentMediaType === 'video') {
                mediaUrl = videoInput.value.trim();
            }
            
            if (content.length === 0) return;
            
            if (currentTab === 'posts' || currentMediaType === 'image') {
                const newPost = {
                    id: Date.now().toString(),
                    userId: currentUser.id,
                    userName: currentUser.name,
                    content,
                    mediaUrl: mediaUrl || null,
                    mediaType: currentMediaType,
                    likes: 0,
                    liked: false,
                    timestamp: new Date().toISOString()
                };
                
                posts.unshift(newPost);
                localStorage.setItem('posts', JSON.stringify(posts));
                renderPosts();
            } else if (currentTab === 'reels' || currentMediaType === 'video') {
                const newReel = {
                    id: Date.now().toString(),
                    userId: currentUser.id,
                    userName: currentUser.name,
                    content,
                    mediaUrl: mediaUrl || null,
                    likes: 0,
                    liked: false,
                    timestamp: new Date().toISOString()
                };
                
                reels.unshift(newReel);
                localStorage.setItem('reels', JSON.stringify(reels));
                renderReels();
            }
            
            // Update gallery if media was added
            if (mediaUrl) {
                renderGallery();
            }
            
            // Update profile stats
            updateProfile();
            
            // Reset form
            postInput.value = '';
            imageInput.value = '';
            videoInput.value = '';
            imageInput.style.display = 'none';
            videoInput.style.display = 'none';
            currentMediaType = null;
            charCount.textContent = '0';
            postBtn.disabled = true;
        }

        // Handle search
        function handleSearch() {
            searchQuery = searchInput.value.toLowerCase();
            if (currentTab === 'posts') {
                renderPosts();
            } else if (currentTab === 'reels') {
                renderReels();
            }
        }

        // Render posts based on current filter and search
        function renderPosts() {
            // Filter posts based on search query
            let filteredPosts = posts.filter(post => 
                post.content.toLowerCase().includes(searchQuery) ||
                post.userName.toLowerCase().includes(searchQuery)
            );
            
            // Sort posts based on current filter
            switch (currentFilter) {
                case 'latest':
                    filteredPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                    break;
                case 'oldest':
                    filteredPosts.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                    break;
                case 'most-liked':
                    filteredPosts.sort((a, b) => b.likes - a.likes);
                    break;
            }
            
            // Clear posts feed
            postsFeed.innerHTML = '';
            
            // Show message if no posts
            if (filteredPosts.length === 0) {
                postsFeed.innerHTML = '<div class="no-posts">No posts found. Try a different search or create a new post!</div>';
                return;
            }
            
            // Render each post
            filteredPosts.forEach(post => {
                const postElement = createPostElement(post);
                postsFeed.appendChild(postElement);
            });
        }

        // Render reels based on current filter and search
        function renderReels() {
            // Filter reels based on search query
            let filteredReels = reels.filter(reel => 
                reel.content.toLowerCase().includes(searchQuery) ||
                reel.userName.toLowerCase().includes(searchQuery)
            );
            
            // Sort reels based on current filter
            switch (currentFilter) {
                case 'latest':
                    filteredReels.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                    break;
                case 'oldest':
                    filteredReels.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                    break;
                case 'most-liked':
                    filteredReels.sort((a, b) => b.likes - a.likes);
                    break;
            }
            
            // Clear reels feed
            reelsFeed.innerHTML = '';
            
            // Show message if no reels
            if (filteredReels.length === 0) {
                reelsFeed.innerHTML = '<div class="no-posts">No reels found. Try a different search or create a new reel!</div>';
                return;
            }
            
            // Render each reel
            filteredReels.forEach(reel => {
                const reelElement = createReelElement(reel);
                reelsFeed.appendChild(reelElement);
            });
        }

        // Render gallery with all media
        function renderGallery() {
            // Get all media from posts and reels
            const allMedia = [];
            
            // Add images from posts
            posts.forEach(post => {
                if (post.mediaUrl && post.mediaType === 'image') {
                    allMedia.push({
                        type: 'image',
                        url: post.mediaUrl,
                        id: post.id,
                        timestamp: post.timestamp
                    });
                }
            });
            
            // Add videos from posts and reels
            posts.forEach(post => {
                if (post.mediaUrl && post.mediaType === 'video') {
                    allMedia.push({
                        type: 'video',
                        url: post.mediaUrl,
                        id: post.id,
                        timestamp: post.timestamp
                    });
                }
            });
            
            reels.forEach(reel => {
                if (reel.mediaUrl) {
                    allMedia.push({
                        type: 'video',
                        url: reel.mediaUrl,
                        id: reel.id,
                        timestamp: reel.timestamp
                    });
                }
            });
            
            // Sort by timestamp (newest first)
            allMedia.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            // Clear gallery grid
            galleryGrid.innerHTML = '';
            
            // Show message if no media
            if (allMedia.length === 0) {
                galleryFeed.querySelector('.no-posts').style.display = 'block';
                return;
            }
            
            // Hide no posts message
            galleryFeed.querySelector('.no-posts').style.display = 'none';
            
            // Add media to gallery
            allMedia.forEach(media => {
                const mediaElement = document.createElement('div');
                mediaElement.className = 'gallery-item';
                
                if (media.type === 'image') {
                    mediaElement.innerHTML = `<img src="${media.url}" alt="Gallery image">`;
                } else {
                    mediaElement.innerHTML = `<video src="${media.url}"></video>`;
                }
                
                // Add click event to open media in modal
                mediaElement.addEventListener('click', () => {
                    openMediaModal(media.url, media.type);
                });
                
                galleryGrid.appendChild(mediaElement);
            });
        }

        // Create a post element
        function createPostElement(post) {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            postDiv.setAttribute('data-id', post.id);
            
            // Format timestamp
            const postDate = new Date(post.timestamp);
            const timeString = postDate.toLocaleString();
            
            // User avatar (first letter of name)
            const userInitial = post.userName.charAt(0).toUpperCase();
            
            let mediaHtml = '';
            if (post.mediaUrl) {
                if (post.mediaType === 'image') {
                    mediaHtml = `<img src="${post.mediaUrl}" class="post-image" alt="Post image">`;
                } else if (post.mediaType === 'video') {
                    mediaHtml = `<video src="${post.mediaUrl}" class="post-video" controls></video>`;
                }
            }
            
            postDiv.innerHTML = `
                <div class="post-header">
                    <div class="post-user">
                        <div class="user-avatar">${userInitial}</div>
                        <div>
                            <div class="user-name">${post.userName}</div>
                            <div class="post-time">${timeString}</div>
                        </div>
                    </div>
                    ${post.userId === currentUser.id ? 
                        `<div class="action-btns">
                            <button class="edit-btn" data-id="${post.id}">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="delete-btn" data-id="${post.id}">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>` : ''
                    }
                </div>
                <div class="post-content">${post.content}</div>
                ${mediaHtml}
                <div class="post-actions">
                    <div class="reaction-container">
                        <button class="reaction-btn ${post.liked ? 'liked' : ''}" data-id="${post.id}">
                            ${post.liked ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>'} 
                            <span class="like-count">${post.likes}</span>
                        </button>
                    </div>
                </div>
            `;
            
            // Add event listeners to buttons
            const likeBtn = postDiv.querySelector('.reaction-btn');
            likeBtn.addEventListener('click', () => toggleLike(post.id, 'post'));
            
            // Add event listener to media if exists
            if (post.mediaUrl) {
                const mediaElement = postDiv.querySelector('.post-image, .post-video');
                mediaElement.addEventListener('click', () => {
                    openMediaModal(post.mediaUrl, post.mediaType);
                });
            }
            
            if (post.userId === currentUser.id) {
                const deleteBtn = postDiv.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', () => deletePost(post.id));
            }
            
            return postDiv;
        }

        // Create a reel element
        function createReelElement(reel) {
            const reelDiv = document.createElement('div');
            reelDiv.className = 'reel';
            reelDiv.setAttribute('data-id', reel.id);
            
            // Format timestamp
            const reelDate = new Date(reel.timestamp);
            const timeString = reelDate.toLocaleString();
            
            // User avatar (first letter of name)
            const userInitial = reel.userName.charAt(0).toUpperCase();
            
            reelDiv.innerHTML = `
                <div class="reel-header">
                    <div class="reel-user">
                        <div class="user-avatar">${userInitial}</div>
                        <div>
                            <div class="user-name">${reel.userName}</div>
                            <div class="reel-time">${timeString}</div>
                        </div>
                    </div>
                    ${reel.userId === currentUser.id ? 
                        `<div class="action-btns">
                            <button class="delete-btn" data-id="${reel.id}">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>` : ''
                    }
                </div>
                <div class="reel-content">${reel.content}</div>
                ${reel.mediaUrl ? `<video src="${reel.mediaUrl}" class="reel-video" controls></video>` : ''}
                <div class="reel-actions">
                    <button class="reel-reaction-btn ${reel.liked ? 'liked' : ''}" data-id="${reel.id}">
                        ${reel.liked ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>'} 
                        <span class="like-count">${reel.likes}</span>
                    </button>
                </div>
            `;
            
            // Add event listeners to buttons
            const likeBtn = reelDiv.querySelector('.reel-reaction-btn');
            likeBtn.addEventListener('click', () => toggleLike(reel.id, 'reel'));
            
            // Add event listener to media if exists
            if (reel.mediaUrl) {
                const mediaElement = reelDiv.querySelector('.reel-video');
                mediaElement.addEventListener('click', () => {
                    openMediaModal(reel.mediaUrl, 'video');
                });
            }
            
            if (reel.userId === currentUser.id) {
                const deleteBtn = reelDiv.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', () => deleteReel(reel.id));
            }
            
            return reelDiv;
        }

        // Toggle like on a post or reel
        function toggleLike(itemId, type) {
            let item;
            if (type === 'post') {
                item = posts.find(p => p.id === itemId);
            } else {
                item = reels.find(r => r.id === itemId);
            }
            
            if (!item) return;
            
            if (item.liked) {
                item.likes--;
                item.liked = false;
            } else {
                item.likes++;
                item.liked = true;
            }
            
            if (type === 'post') {
                localStorage.setItem('posts', JSON.stringify(posts));
                renderPosts();
            } else {
                localStorage.setItem('reels', JSON.stringify(reels));
                renderReels();
            }
        }

        // Delete a post
        function deletePost(postId) {
            if (confirm('Are you sure you want to delete this post?')) {
                posts = posts.filter(p => p.id !== postId);
                localStorage.setItem('posts', JSON.stringify(posts));
                renderPosts();
                renderGallery();
                updateProfile();
            }
        }

        // Delete a reel
        function deleteReel(reelId) {
            if (confirm('Are you sure you want to delete this reel?')) {
                reels = reels.filter(r => r.id !== reelId);
                localStorage.setItem('reels', JSON.stringify(reels));
                renderReels();
                renderGallery();
                updateProfile();
            }
        }

        // Open media modal
        function openMediaModal(mediaUrl, mediaType) {
            if (mediaType === 'image') {
                modalImage.src = mediaUrl;
                modalImage.style.display = 'block';
                modalVideo.style.display = 'none';
            } else {
                modalVideo.src = mediaUrl;
                modalVideo.style.display = 'block';
                modalImage.style.display = 'none';
            }
            
            mediaModal.style.display = 'flex';
        }

        // Close media modal
        function closeMediaModalFunc() {
            mediaModal.style.display = 'none';
            modalVideo.pause();
        }

        // Initialize the app when the page loads
        document.addEventListener('DOMContentLoaded', initApp);
   