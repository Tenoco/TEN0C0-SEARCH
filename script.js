document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    const tabButtons = document.querySelectorAll('.tab-button');
    const engineButtons = document.querySelectorAll('.engine-button');
    const resultsContainer = document.querySelector('.results-container');
    const aboutButton = document.getElementById('aboutButton');
    const aboutModal = document.getElementById('aboutModal');
    const closeButton = document.querySelector('.close-button');
    
    let currentType = 'web';
    let currentEngine = 'bing';

    const searchUrls = {
        bing: {
            web: 'https://www.bing.com/search',
            images: 'https://www.bing.com/images/search',
            videos: 'https://www.bing.com/videos/search'
        },
        yandex: {
            web: 'https://yandex.com/search',
            images: 'https://yandex.com/images/search',
            videos: 'https://yandex.com/video/search'
        }
    };

    // Modal functionality
    aboutButton.onclick = () => {
        aboutModal.style.display = "block";
    }

    closeButton.onclick = () => {
        aboutModal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target == aboutModal) {
            aboutModal.style.display = "none";
        }
    }

    function showLoading() {
        resultsContainer.classList.add('loading');
    }

    function hideLoading() {
        resultsContainer.classList.remove('loading');
    }

    function getSearchParams(query) {
        const params = new URLSearchParams();
        
        switch(currentEngine) {
            case 'bing':
                params.append('q', query);
                break;
            case 'yandex':
                params.append('text', query);
                break;
        }
        
        return params.toString();
    }

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            showLoading();
            const baseUrl = searchUrls[currentEngine][currentType];
            const searchParams = getSearchParams(query);
            
            // Create a sandbox attribute that allows cookies
            searchResults.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-storage-access-by-user-activation');
            
            // Set the src after updating sandbox permissions
            searchResults.src = `${baseUrl}?${searchParams}`;
        }
    }

    // Handle iframe load completion
    searchResults.addEventListener('load', hideLoading);

    // Search button click handler
    searchButton.addEventListener('click', performSearch);

    // Enter key handler
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Tab buttons handler
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentType = button.dataset.type;
            if (searchInput.value.trim()) {
                performSearch();
            }
        });
    });

    // Engine buttons handler
    engineButtons.forEach(button => {
        button.addEventListener('click', () => {
            engineButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentEngine = button.dataset.engine;
            if (searchInput.value.trim()) {
                performSearch();
            }
        });
    });

    // Error handling for iframe loading
    searchResults.addEventListener('error', () => {
        hideLoading();
        searchResults.srcdoc = `
            <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                font-family: 'JetBrains Mono', monospace;
                color: #666;
                text-align: center;
                padding: 20px;
            ">
                <div>
                    <h3>Unable to load search results</h3>
                    <p>This search engine may be blocking embedded results.</p>
                    <p>Try switching to a different search engine or refreshing the page.</p>
                </div>
            </div>
        `;
    });

    // Focus input on page load
    searchInput.focus();
});