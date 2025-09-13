# The Wedding Website: Varsha & Rohit

A beautiful, modern, and interactive wedding website designed to share event details, collect RSVPs, and allow guests to leave their blessings.

## Features

-   **Stunning Home Page**: A beautiful hero image with the couple's name and a real-time countdown to the wedding day.
-   **Wedding Events Timeline**: An elegant, alternating timeline detailing all the wedding functions, including dates, times, and direct links to the venue on Google Maps.
-   **Interactive Guest Book**: A fun, digital guest book where guests can leave messages on virtual "sticky notes." Notes are randomly placed with a slight tilt, and users can "love" each other's messages.
-   **Comprehensive RSVP Form**: A detailed form for guests to provide their travel and contact information, making it easy for the hosts to manage logistics.
-   **Admin Dashboard**: A private admin page (`/admin`) to view all RSVP submissions in a clean table and export the data to a CSV file compatible with Excel.
-   **Fully Responsive**: The design is optimized for a seamless experience on desktops, tablets, and mobile devices.

## Running the Project Locally

This project is built with React and TypeScript and requires a development environment to run correctly. The following instructions use [Vite](https://vitejs.dev/), a modern and fast build tool for web projects.

### Prerequisites

-   **Node.js**: You must have Node.js installed on your computer. Vite requires Node.js version 18+. You can download it from [nodejs.org](https://nodejs.org/).
-   **npm**: npm (Node Package Manager) is included with Node.js.

### Steps to Run

1.  **Download and Unzip the Project Files:**
    Ensure you have all the project files (`index.html`, `package.json`, etc.) and the `components` directory saved together in a single folder on your computer.

2.  **Open Your Terminal:**
    Navigate to the project folder using your terminal or command prompt.

    ```bash
    # Replace "path/to/your/project-folder" with the actual path
    cd path/to/your/project-folder
    ```

3.  **Install Dependencies:**
    Once you are in the project directory, run the following command to install all the necessary packages defined in `package.json`.

    ```bash
    npm install
    ```

4.  **Start the Development Server:**
    After the installation is complete, start the Vite development server with this command:

    ```bash
    npm run dev
    ```

    The terminal will show you a message indicating that the server is running, usually with a local URL.

5.  **View the Website:**
    Open your web browser and go to the URL provided by Vite, which will typically be:
    [http://localhost:5173](http://localhost:5173)

The wedding website should now be running locally! The server will also automatically reload the page whenever you make changes to the code.

### How Data is Stored

-   **RSVP Submissions & Guest Book Entries**: All data you submit through the forms is stored directly in your browser's **`localStorage`**. This means the data will persist on your machine, but it is not sent to a remote server and is not visible to anyone else. Clearing your browser's cache for this site will delete all saved data.
-   **Admin Panel**: The admin panel, accessible at `http://localhost:5173/#/admin`, reads the RSVP data directly from your browser's `localStorage`.
