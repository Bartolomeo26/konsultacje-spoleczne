# Social Consultations Platform - Frontend

This repository contains the frontend code for a web platform designed to facilitate public consultations. Built with modern web technologies, this frontend provides the user interface for interacting with the consultation system.

## Features

The frontend allows users to:

* **Browse Communities:** View a list of communities, search, sort, and see them on a map.
* **Manage Communities:** Create new communities, view community details, and manage members/join requests if you are an administrator.
* **Participate in Consultations:** View consultation details, attach files, read and add comments, like comments, and vote on proposed solutions.
* **Manage Profile:** View and edit your user profile information.
* **Authentication:** Register, log in, and manage your account.

## Technologies

* **React:** A JavaScript library for building the user interface.
* **Vite:** A fast build tool for modern web projects.
* **TanStack Query:** A library for fficient data fetching, caching, and synchronization with the backend.
* **Tailwind CSS:** A utility-first CSS framework for styling.

## Architecture

The frontend is a Single Page Application (SPA) developed with React. It communicates with the backend API (hosted separately) to fetch and send data, providing a dynamic and responsive user experience.

## Getting Started

**(Note: These are general steps based on the technologies used. Specific setup might require additional configuration depending on the full project structure and backend availability.)**

1.  **Clone the repository:**  
    ```bash
    git clone https://github.com/Bartolomeo26/konsultacje-spoleczne.git
    ```
2.  **Navigate to the project directory:**  
    ```bash
    cd konsultacje-spoleczne
    ```
3.  **Install dependencies:**
    ```bash
    npm install # or yarn install or pnpm install
    ```
4.  **Configure environment variables:** You might need a `.env` file with the backend API URL. Check for a `.env.example` file or documentation within the repository.
    ```dotenv
    VITE_API_URL=your_backend_api_url
    ```
5.  **Run the development server:**
    ```bash
    npm run dev # or yarn dev or pnpm dev
    ```
    The application should now be running locally, typically at `http://localhost:5173/`.

## Testing

Frontend unit tests are implemented using:

* **React Testing Library:** For testing React components.
* **Vitest:** As the test runner and assertion library.

To run the tests:
```bash
npm run test # or yarn test or pnpm test test
```
## Gallery

**Home Page with Navigation**  
![image](https://github.com/user-attachments/assets/f13f5b62-7470-42f8-ba4f-fd8e4add30a5)
**Communities Carousel**
![image](https://github.com/user-attachments/assets/a29368dc-a0d8-4041-957b-69ea5aaf82cf)
**Communities Map** 
![image](https://github.com/user-attachments/assets/e29ff122-53d3-4b93-91d7-504f534dcd6c)
**All Communities List** 
![image](https://github.com/user-attachments/assets/54ca9923-cefb-4c53-ac36-a07ee3d2b465)
**Registration Form**  
![image](https://github.com/user-attachments/assets/6c2157db-39f5-44e7-8c98-692a0ed27567)  
**Community Home Page**  
![image](https://github.com/user-attachments/assets/dd22f620-c5aa-4db9-aa14-52a67beeba77)
**Consultation Home Page**  
![image](https://github.com/user-attachments/assets/c3ff6fcc-c6f5-4510-a27b-e9138410b219)
**Consultation Solutions with Voting**  
![image](https://github.com/user-attachments/assets/33ddf0ca-37f1-4fde-b8ba-f37bb72cf32b)
**User Profile Page**
![image](https://github.com/user-attachments/assets/965eb93b-d61c-4bf4-ad3a-2ab1a4c9191a)
## Future Enhancements
We plan to continue improving the frontend with features such as:

* Implementing social media sharing capabilities for consultation results.  
* Adding options for authenticating using external providers like Google.  
* Enhancing user profiles to display metrics like the total number of likes received on their comments.
## Team
This project was developed as a team. Every member for fully responsible for a specific layer: 
* Piotr Mazur: [[Link to Repo](https://github.com/sirmazur/SocialConsultations)] (Backend and Azure deployment)
* Bartosz Spiżarny: [[Link to Repo](https://github.com/Bartolomeo26/konsultacje-spoleczne)] (Frontend)
* Paweł Rudnik: [[Link to Repo](https://github.com/pabl014/SocialConsultations-SwiftUI)] (Mobile Application)  
