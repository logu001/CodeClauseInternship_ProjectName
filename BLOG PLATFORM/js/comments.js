document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const commentText = document.getElementById('comment-text').value;
    const commentList = document.getElementById('comment-list');

    const newComment = document.createElement('li');
    newComment.textContent = commentText;

    commentList.appendChild(newComment);

    document.getElementById('comment-form').reset();
});
