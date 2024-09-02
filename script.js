const searchInput = document.getElementById('searchInput');
const duckduckgoInput = document.getElementById('duckduckgoInput');
const googleInput = document.getElementById('googleInput');
const bingInput = document.getElementById('bingInput');
const yahooInput = document.getElementById('yahooInput');
const youtubeInput = document.getElementById('youtubeInput');
const tiktokInput = document.getElementById('tiktokInput');

searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    duckduckgoInput.value = query;
    googleInput.value = query;
    bingInput.value = query;
    yahooInput.value = query;
    youtubeInput.value = query;
    tiktokInput.value = query;
});

function copyToClipboard() {
    searchInput.select();
    document.execCommand('copy');
}

