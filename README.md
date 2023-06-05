# Full Stack Web Developer Project - MySQL, Node.js, React

## General
In this project, you are required to build a system for tagging vacations.
There are two roles in the system:
1. User - can view vacations, tag a vacation (follow), cancel a tag (un-follow), and more.
2. Admin - can add a vacation, edit a vacation, delete a vacation, and view reports.

## Infrastructure
1. Database: MySQL.
2. Server-side: REST API in Node.js using Express.
The server-side should be built in TypeScript and not JavaScript.
3. Client-side: React.
The React project should be built in TypeScript and not JavaScript.

## Project Details
System Entities:
1. Users:
- User code (primary key)
- First name
- Last name
- Email
- Password
- Role (regular user or admin)
2. Vacations:
- Vacation code (primary key)
- Destination
- Description
- Start date
- End date
- Price
- Name of the vacation image file
3. Followers (which user follows which vacation):
- User code (foreign key to users table)
- Vacation code (foreign key to vacations table)

The database should include at least 12 vacations with real data.

## Required Agreements Summary
The following are the required agreements for the system. The user interface displayed here is for illustration purposes only. There is no need to perform exactly the same thing. Any other user interface that is aesthetic and meets the specification can be built.

### New User Registration Page:
![Register](/snapshots/register.JPG)

- All fields are mandatory
- Verify that the email is valid
- Password must be at least 4 characters long
- Check that the email is available. Do not allow registration with a taken email.
- Upon completion of registration, redirect to the vacation page.

### Login Page for Registered Users:
![Login](/snapshots/login.JPG)

* All fields are mandatory.
* Ensure the email is valid.
* Password must be at least 4 characters long.
* For incorrect login details, an appropriate error message should be displayed.
* If the details are correct, redirect to the vacations page.

### Vacation page:
![vacations](/snapshots/vacations.JPG)

- This page is accessible only to registered users.
- If a user tries to access this page without being in-logged, they will be redirected to the login page.
- Vacations should be displayed in tabs (not in a table).
- Each tab displays all the vacation details, the number of followers the vacation has, and whether the current user is following it or not.
- Vacations should be sorted by their start date in ascending order.
- A user can follow or un-follow a vacation.
- Only 9 vacations should be displayed per page, and pagination should be provided to navigate to the next page.
- A filter button or checkbox should be added to display only the vacations that the user is following.
- A filter button or checkbox should be added to display only the vacations that have not yet started.
- A filter button or checkbox should be added to display only the active vacations (not those that have ended or not yet started).


### Admin Page:
![admin](/snapshots/admin-vacations.JPG)

- This page is accessible only to the administrator
- The administrator cannot Follow or Un-follow and these options should not be displayed in the card
- At the top of the page, a button should be displayed for adding a new vacation
- In each card, a button should be displayed for editing the vacation that leads to the vacation editing page
- In each card, a button should be displayed for deleting the vacation
- If the administrator tries to delete a vacation, they should confirm if they are sure, and if not - they should not delete it.

### Page for adding a vacation:
![Add page](/snapshots/add.JPG)

- This page is accessible only to the administrator.
- All fields are mandatory.
- It is not allowed to enter a negative price or a price higher than 10,000.
- It is not allowed to choose an end date that is earlier than the start date.
- It is not allowed to choose past dates.
- The pictures should be saved in a folder on the server's side. In the database, only the vacation's file name (including the extension) should be saved.


### Vacation Editing Page:
![Edit page](/snapshots/edit.JPG)

- This page is accessible only to the administrator
- All fields are mandatory except for the image field, which should be displayed and allowed to change but not required
- It is not allowed to enter a negative price or a price higher than 10,000 NIS
- It is not allowed to select an end date earlier than the start date
- It should be possible to select past dates because it is possible to edit a vacation that has already ended.

### Page for displaying vacation report:
![Reports](/snapshots/report.JPG)

- This page is accessible only to the administrator.
- On this page, you should display a vacation report and the number of followers.
- Use any report library that is convenient for you.
- On the X-axis, display the vacation destination.
- On the Y-axis, display the number of followers for each vacation.

### Creating and downloading a CSV file containing vacation destinations and the number of followers.
CSV stands for Comma-Separated Values, and it is a text file that contains values separated by commas. What is special about this file is that Excel can open it and display its information in a tabular format.  

CSV file structure:  

![csv](/snapshots/csv.JPG)

Opening the file in Excel:  

![excel](/snapshots/excell.JPG)

- This option is only available to the admin.

### Main Menu
The main menu should be displayed depending on the user's status:
- Unregistered users can only register or log in.
- Registered users can view the Vacations page, follow/un-follow a vacation, filter, or log out.
- Admin can add/edit/delete vacations, view the Reports page, download a CSV file, or log out.
- The full name of the user should be displayed for registered users (including admin).

### Bonuses:
Bonuses will be given for:
- Building the project on Docker Containers.
- Adding Integration Testing and Unit Testing.
- Uploading the site to the Cloud.

### Submitting the project:
- The project is a personal project. It should not be done in pairs or groups.
- The project should be in a folder with the student's full name in English and containing three folders:
o Database - Contains the database in an SQL file (Exported as needed).
o Backend - Contains the server-side project.
o Frontend - Contains the client-side project.
- The modules_node folders should be deleted from both the server-side and client-side projects.
- A single zip file should be created from the main project folder and uploaded to the course website.
- The project should also be uploaded to a Private Repository on GitHub.
- The project should be submitted a week before the end of the course.
- After submitting the project, a defense lesson will be held in the classroom.

### Good luck!