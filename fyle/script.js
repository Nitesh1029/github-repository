let currentPage = 1; 
let username='';

document.addEventListener('DOMContentLoaded', function () {
    // Add an event listener for the form submission
    const githubForm = document.getElementById('githubForm');
    githubForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the GitHub username from the input field
        const usernameInput = document.getElementById('githubUsername');
        const username = usernameInput.value.trim();

        // Check if the username is provided
        if (username) {
            fetchUserDetails(username);
            loadRepositories(username, 1); 
        } else {
            alert('Please enter a GitHub username.');
        }
    });
});

// ... (rest of your code)


// Function to fetch user details
function fetchUserDetails(username) {
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('userAvatar').src = user.avatar_url || 'default_avatar_url.jpg';
            document.getElementById('userName').innerText = user.name || username;
            document.getElementById('userLocation').innerText = `🌏${user.location || 'Not specified'}`;

            const socialLinks = [];
            if (user.twitter_username) {
                socialLinks.push(`<a href="https://twitter.com/${user.twitter_username}" target="_blank">Twitter</a>`);
            }

            document.getElementById('socialLinks').innerHTML = socialLinks.join(' | ');

            document.getElementById('userDescription').innerText = user.bio || 'No bio available';

            document.getElementById('githubLink').href = user.html_url;
            document.getElementById('githubLink').innerText = user.html_url;
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
        });
}

// Function to fetch user repositories based on page
// Function to fetch user repositories based on page
function loadRepositories(username, page) {
    const repositoriesPerPage = 6;

    const startIndex = (page - 1) * repositoriesPerPage;
    currentPage = page;

    // Fetch user github repositories
    fetch(`https://api.github.com/users/${username}/repos?per_page=${repositoriesPerPage}&page=${page}`)
        .then(response => response.json())
        .then(repositories => {
            console.log('Fetched repositories:', repositories); // Add this line for debugging

            const repositoriesContainer = document.getElementById('repositories');
            repositoriesContainer.innerHTML = ''; // Clear previous content

            repositories.forEach(repo => {
                const card = document.createElement('div');
                card.classList.add('col-md-6', 'mb-4', 'card'); // Adjusted to col-md-6 for 2 columns

                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title" style="color:#007bff;">${repo.name}</h5>
                        <p class="card-text">${repo.description || 'No description available'}</p>
                        <a href="#" class="btn btn-primary">JavaScript</a>
                        <a href="#" class="btn btn-primary">Angular</a>
                        <a href="#" class="btn btn-primary">React</a>
                        <a href="#" class="btn btn-primary">Vue</a>
                    </div>
                `;

                repositoriesContainer.appendChild(card);
                card.style.border = '1px solid #000';
                card.style.borderRadius = '0';
                card.style.width = '45%';
                card.style.height = '125px';
                card.style.padding = '0px';
                card.style.margin = '0px auto';
                card.style.fontSize = '12px';
            });

            displayPageNumbers(5);
        })
        .catch(error => {
            console.error('Error fetching user repositories:', error);
        });
}



function displayPageNumbers(totalPages) {
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';

    // Previous Button
    const previousButton = createPageButton('<<', 'previousButton', () => previousPage(totalPages));
    paginationElement.appendChild(previousButton);

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = createPageButton(i, `page${i}`, () => goToPage(i,totalPages));
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        paginationElement.appendChild(pageButton);
    }

    // Next Button
    const nextButton = createPageButton('>>', 'nextButton', () => nextPage(totalPages));
    paginationElement.appendChild(nextButton);

    // Display current page
    document.getElementById('currentPage').innerText = `Page: ${currentPage}`;
}

function createPageButton(text, id, clickHandler) {
    const button = document.createElement('li');
    button.classList.add('page-item');
    button.setAttribute('id', id);

    const link = document.createElement('a');
    link.classList.add('page-link');
    link.href = '#';
    link.innerHTML = text;
    link.addEventListener('click', clickHandler);

    button.appendChild(link);
    return button;
}

function goToPage(page, totalPages) {
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        loadRepositories(username, currentPage);
    }
}


// Function to handle next page
function nextPage() {
    currentPage++;
    loadRepositories(username, currentPage);
}

// Function to handle previous page
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        loadRepositories(username, currentPage);
    }
}