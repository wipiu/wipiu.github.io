document.getElementById('submit-btn').addEventListener('click', function() {
    const content = document.getElementById('post-content').value;
    if (content) {
        const postElement = document.createElement('div');
        postElement.textContent = content;
        document.getElementById('posts').appendChild(postElement);
        document.getElementById('post-content').value = ''; // 입력 필드 초기화
    } else {
        alert('내용을 입력하세요.');
    }
});

async function loadPosts() {
    const response = await fetch('http://localhost:3000/posts');
    const posts = await response.json();
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.textContent = post;
        postsContainer.appendChild(postElement);
    });
}

// 페이지 로드 시 게시물 불러오기
loadPosts();