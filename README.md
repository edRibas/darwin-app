# Darwin - A MERN Stack Threads Application

Darwin is a full-stack web application inspired by the Threads application, designed to provide a platform for users to create and engage in discussions through posts or threads. It is built using the MERN (MongoDB, Express.js, React, Node.js) stack.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Webhooks Integration](#webhooks-integration)
- [Contributing](#contributing)

## Features

- User registration and authentication.
- Creating, viewing, and commenting on threads.
- Community creation and management.
- User profile and community pages.
- Real-time updates using webhooks.
- ...

## Screenshots

Here are some screenshots from the Darwin application:

- **Home Page:**

  ![Home Page](screenshots/home-page.png)

- **Thread View:**

  ![Thread View](screenshots/thread-view.png)

- **Community Page:**

  ![Community Page](screenshots/community-page.png)

- **User Profile:**

  ![User Profile](screenshots/user-profile.png)

- **Webhooks Configuration:**

  ![Webhooks Configuration](screenshots/webhooks-configuration.png)

## Getting Started

Follow these steps to get Darwin up and running on your local development environment.

### Prerequisites

Make sure you have the following software installed:

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/edRibas/darwin.git


Access the application in your browser at http://localhost:3000.

## Usage
    Register or log in to your Darwin account.
    Create or join communities.
    Create and participate in discussions by creating threads and comments.
    Explore user profiles and community pages.
    Webhooks Integration

## Webhooks
Darwin supports webhook integration for real-time updates. To set up webhooks, follow these steps:
    Obtain a webhook secret from your webhook service provider (e.g., Clerk).
    Set the NEXT_CLERK_WEBHOOK_SECRET environment variable in the server .env file with your webhook secret.
    Configure your webhook service to send events to the appropriate endpoint in your Darwin application.

## Contributing
To contribute:
    Fork the repository.
    Create a new branch for your feature or bug fix.
    Make your changes and commit them with descriptive messages.
    Push your changes to your fork.
    Submit a pull request to the main repository's main branch.