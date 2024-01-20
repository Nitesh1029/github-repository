GitHub Repositories Listing Page
This project is a web application that displays public GitHub repositories belonging to a specific user. The user can enter a GitHub username, and the application will fetch and display the repositories along with relevant information.

Features
User Input:

Enter a valid GitHub username in the provided input field.
Repository Listing:

Display a paginated list of public repositories for the entered GitHub username.
Each repository card includes:
Repository name
Repository description
Topics associated with the repository
Language(s) used in the repository
Pagination:

Implement server-side pagination with a default of 10 repositories per page.
Allow the user to choose between displaying 10, 20, 50, or 100 repositories per page.
Loading Indicators:

Display loading indicators during API calls to indicate that data is being fetched.
Search Functionality (Optional):

Implement a search bar to allow users to filter repositories based on keywords.
Responsive Design:

Ensure the application is responsive and provides a good user experience across various devices and screen sizes.
Technologies Used
HTML, CSS, JavaScript: Core technologies for building the front-end.
Bootstrap: Used for styling and layout components.
jQuery: Used for DOM manipulation and handling asynchronous requests.
GitHub REST API: Utilized for fetching repository data.
How to Run
Clone the repository to your local machine.
Open the index.html file in a web browser.
Enter a valid GitHub username in the input field and click the "Search" button.
Explore the paginated list of repositories.
Assumptions
The GitHub username entered is assumed to be valid.
The default pagination limit is set to 10 repositories per page.
The loading indicators are displayed for a better user experience during data fetching.
Feel free to explore and customize the application further based on your preferences and needs.
