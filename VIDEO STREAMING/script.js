document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const videosList = document.getElementById('videos-list');
    let videoData = []; // Stores video information

    // Handle video upload
    uploadForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const fileInput = document.getElementById('video-file');
        const titleInput = document.getElementById('video-title');
        const privacyCheckbox = document.getElementById('privacy');
        
        const file = fileInput.files[0];
        const title = titleInput.value;
        const isPrivate = privacyCheckbox.checked;
        
        if (!file) return alert('Please select a video file.');
        
        // Save video data
        const videoUrl = URL.createObjectURL(file);
        const video = {
            title: title,
            url: videoUrl,
            private: isPrivate,
            views: 0
        };

        videoData.push(video);
        displayVideos();
    });

    // Display videos
    function displayVideos() {
        videosList.innerHTML = '';
        videoData.forEach((video, index) => {
            if (video.private && !videoIsOwnedByUser()) return; // Skip private videos for other users

            const videoElement = document.createElement('div');
            videoElement.className = 'video-item';
            
            videoElement.innerHTML = `
                <h3>${video.title}</h3>
                <video controls src="${video.url}"></video>
                <p>Views: ${video.views}</p>
            `;

            videoElement.querySelector('video').addEventListener('play', () => {
                video.views += 1;
                videoElement.querySelector('p').textContent = `Views: ${video.views}`;
            });

            videosList.appendChild(videoElement);
        });
    }

    function videoIsOwnedByUser() {
        // For demo purposes, assuming all videos are accessible
        return true;
    }
});
