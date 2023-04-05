document.addEventListener('DOMContentLoaded', async () => {
    const linksList = document.getElementById('linksList');
    const url = 'https://jqq-utils.netlify.app/api/recentYTVideos';

    const copy = (event) => {
        const url = event.target.dataset.url;
        navigator.clipboard.writeText(url);
    };

    try {
        const response = await fetch(url);
        const videos = await response.json();

        const videosHTML = videos.map((video) => {
            const videoUrl = `https://www.youtube.com/watch?v=${video.videoId}`;
            return `
                <li class="video-link">
                    <button class="btn" data-url="${videoUrl}">Copy URL</button>
                    <a class="btn" href="${videoUrl}" rel="noopener noreferrer" target="_blank">Watch</a>
                    ${video.title}
                </li>
            `;
        }).join('');

        linksList.innerHTML = videosHTML;
        const videoLinks = document.querySelectorAll('.video-link');
        videoLinks.forEach((link) => link.addEventListener('click', copy));
    } catch (error) {
        console.error(error);
    }
});
