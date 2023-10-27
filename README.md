![Dinomizer-logo](readme_assets/logos/dm-banner-green-logo.png)

# Dinomizer

Dinomizer is a web application designed to assist Creative Agencies with teams dispersed globally or working remotely. This application streamlines asset retrieval for projects by centralizing all assets in one location. This ensures that all project stakeholders can access the latest version of required assets, thus minimizing time loss.

![dinomizer-responsive](readme_assets/dinomizer-responsive.png)

Dinomizer is built using Django Rest Framework for the backend and React JS for the frontend. This project was created as my fifth portfolio project for my Diploma in Web Application Development at Code Institute.

Here is the live version of the application: [Dinomizer](https://dinomizer-6ec16116a4cb.herokuapp.com/)

## Project Goals

- Full featured assets sharing service
- Create and partecipate to a project
- Upload assets like images, videos, audio and text
- Contribute to a project
- Get approvals by the project manager (project owner) on the assets uploaded

## Contents

- [Dinomizer](#dinomizer)
  * [Project goals](#project-goals)
  * [Contents](#contents)
  * [The Idea](#the-idea)
  * [User stories](#user-stories)
  * [Planning and Agile methodology](#planning-and-agile-methodology)
    + [Mockups](#mockups)
    + [Data models](#data-models)
    + [Agile methodology](#agile-methodology)
  * [Design](#design)
  * [Features](#features)
    + [Navigation Bar](#navigation-bar)
        + [Logged out option](#logged-out-option)
        + [Logged in option](#logged-in-option)
            + [New project](#new-project)
            + [Timeline](#timeline) (All the existing projects with Assets preview)
            + [Projects](#projects) (Projects a User joins)
            + [Contribute](#contribute) (Filtered Assets)
            + [Profile page](#profile-page)
    + [Branded landing page](#branded-landing-page)
    + [Sign-up form](#sign-up-form)
    + [Sign-in form](#sign-in-form)
    + [Timeline (project list)](#timeline-project-list)
    + [Project details](#project-details)
    + [Project controls](#project-controls)
    + [Project create form](#project-create-form)
    + [Project edit form](#project-edit-form)
    + [Assets carousel](#assets-carousel)
    + [Asset details](#asset-details)
    + [Asset dropdown menu](#asset-dropdown-menu)
    + [Asset create form](#asset-create-form)
    + [Asset edit form](#asset-edit-form)
    + [Profile detail page](#profile-detail-page)
    + [Search bar](#search-bar)
    + [Modal box](#modal-box)
    + [Error messages](#error-messages)
  * [CRUD functionality](#crud-functionality)
  * [Reuse of components](#reuse-of-components)
  * [Custom hooks](#custom-hooks)
  * [Context](#context)
  * [Testing](#testing)
  * [Deployment](#deployment)
  * [Future improvements](#future-improvements)
  * [Framework and libraries](#framework-and-libraries)
  * [Credits](#credits)


## The Idea
My professional background is rooted in the video production and communication field. I previously owned my own communication agency and also worked as a freelancer, collaborating with numerous clients. In such contexts, effective file and asset sharing is paramount. However, it's not uncommon for individuals working on the same project to be unaware of the latest version of a logo or the most recent copywriting updates for a particular website.

<img src="readme_assets/idea-img/ci-sony-ss.png" alt="drawing" width="200"/><br/>

To excel in my role as a video producer and creator, I frequently utilize a platform called [CI](https://cimediacloud.com/) (no pun intended ... Code Institute!), developed by Sony. It was from this platform that I drew my inspiration. While I recognize that I have a long way to go before achieving the same results as Sony, I believe that Dinomizer has emerged as a worthy CI aspirant.


## User stories
The user stories were developed following the definition of the [project goals](#project-goals). Initially, I identified the potential epics under which the user stories could be categorized. Afterward, I assigned them to the hypothetical backlog (Iteration), as discussed in the [Planning and Agile methodology](#planning-and-agile-methodology). You can access the corresponding chart in the form of a spreadsheet [here](https://docs.google.com/spreadsheets/d/1dO9Zj2uhU90JMJT0_W85nkQjaKAbOLGk1Hr0KajRhKQ/edit#gid=1780070774).
***


| Iteration   | Epic                        | User story                                                                                                                                                                                                             | MVP | Note                                                                                       | Delivered |
| ----------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------------------------------------------------------------------------------------------ | --------- |
| Iteration 1 | User and Profile management | Account registration<br>As a user I can sign upso that I can create projects and contribute to it                                                                                                                      | Yes |                                                                                            | Yes       |
| Iteration 1 | User and Profile management | Sign In<br>As a User I can sign in so that I have access to all the feature of the application | Yes |                                                                                            | Yes       |
| Iteration 1 | User and Profile management | Refreshing access tokens<br>As a logged in user I can stay logged in so that I don't have to sign in everytime                                                                                                         | Yes |                                                                                            | Yes       |
| Iteration 1 | Workflow and Navigation     | See the Navbar<br>As a Signed in User I can navigate the site so that I can see the various pages of the site                                                                                                          | Yes |                                                                                            | Yes       |
| Iteration 1 | Workflow and Navigation     | Display Sign In or Sign up if logged out<br>As a User I can see option for signing in or signing up so that I can register a new user or sign in with my credentials                                                   | Yes |                                                                                            | Yes       |
| Iteration 2 | Workflow and Navigation     | Sign Out<br>As a logged in user I can sign out so that someone else can't have access to my profile                                                                                                                    | Yes |                                                                                            | Yes       |
| Iteration 2 | User and Profile management | Profile page<br>As a logged-in user I can see other users' profiles so that I can see their details included on which project they are working on                                                                      | Yes | Partialy delivered because the projects on which the user is partecipating are not visible | Yes       |
| Iteration 2 | User and Profile management | Edit profile<br>As a logged-in user I can edit my profile so that I can update my display name and my picture                                                                                                          | Yes |                                                                                            | Yes       |
| Iteration 2 | User and Profile management | Update password<br>As a logged-in user I can update my password so that I can keep my profile secured                                                                                                                  | Yes |                                                                                            | Yes       |
| Iteration 2 | Workflow and Navigation     | Routing<br>As a user I can navigate through pages quickly so that I can view content seamlessly without page refresh                                                                                                   | Yes |                                                                                            | Yes       |
| Iteration 2 | Workflow and Navigation     | Logged status<br>As a a logged in user I can tell my log status so that I can sign out if I want to<br><br>                                                                                                            | Yes |                                                                                            | Yes       |
| Iteration 3 | Projects management         | Create projects<br>As a logged In User I can create a new project so that I can start working on it                                                                                                                    | Yes |                                                                                            | Yes       |
| Iteration 3 | Projects management         | Contribute to project<br>As a Logged in user I can contribute to a project so that I can work on it                                                                                                                    | Yes |                                                                                            | Yes       |
| Iteration 3 | Projects management         | Project's detail<br>As a logged-in user I can see the details of a project so that I can see all the info about it                                                                                                     | Yes |                                                                                            | Yes       |
| Iteration 3 | Projects management         | View projects<br>As a logged-in user I can see a list of all projects so that I can decide to which one contribute                                                                                                     | Yes |                                                                                            | Yes       |
| Iteration 4 | Projects management         | Search for projects<br>As a logged-in user I can search for projects so that I can find what I'm looking for                                                                                                           | Yes |                                                                                            | Yes       |
| Iteration 4 | Workflow and Navigation     | Infinite projects scroll<br>As a logged-in user I can scroll down so that I can see all the created projects without reloading the page                                                                                | Yes |                                                                                            | Yes       |
| Iteration 4 | Projects management         | My projects list<br>As a logged-in user I can see the list of the projects I'm working on so that I've my job under control                                                                                            | Yes |                                                                                            | Yes       |
| Iteration 4 | Projects management         | Edit projects<br>As a Project Owner I can edit the project so that I can change the details of the project, like the title, dates and status                                                                           | Yes |                                                                                            | Yes       |
| Iteration 5 | Assets management           | Create assets<br>As a logged-in user I can create assets so that I can add them to projects                                                                                                                            | Yes |                                                                                            | Yes       |
| Iteration 5 | Assets management           | Assets list in contribute<br>As a Project Contributor I can see a filtered list of all my contributions so that I know what I'm working on                                                                             | Yes |                                                                                            | Yes       |
| Iteration 5 | Projects management         | Contributor list for project<br>As a logged-in user I can click on a project so that I can see all the contributors and contributions related to that project                                                          | Yes |                                                                                            | Yes       |
| Iteration 6 | Assets management           | Assets list<br>As a Project Contributor I can see the list of all assets related to that project so that i have a clear view of the whole project                                                                      | Yes |                                                                                            | Yes       |
| Iteration 6 | Workflow and Navigation     | Infinite contributions scroll<br>As a logged-in user I can scroll down so that I can see all the contributions to that project without reloading the page                                                              | Yes |                                                                                            | Yes       |
| Iteration 6 | Assets management           | Asset check<br>As a Project manager/Project owner I can approve a contribution with a check so that the contributor knows that it was approved                                                                         | Yes | This is a restricted functionality reserved to the project owner                           | Yes       |
| Iteration 6 | Assets management           | Delete assets<br>As a asset owner I can delete an asset so that I'm sure is not needed anymore in the project                                                                                                          | Yes |                                                                                            | Yes       |
| Iteration 6 | Projects management         | Delete projects<br>As a project owner I can delete my projects so that they are not displayed anymore                                                                                                                  | Yes |                                                                                            | Yes       |
| Iteration 6 | Assets management           | Update assets<br>As a asset owner I can update or delete an asset so that the asset is always updated                                                                                                                  | Yes |                                                                                            | Yes       |
|             | Assets management           | Create comments<br>As a project contributor I can comment on contributions so that I can express my opinion                                                                                                            | No  |                                                                                            | No        |
|             | Assets management           | Edit and Delete comments<br>As a comment owner I can edit or delete comments so that I'm free to change my mind                                                                                                        | No  |                                                                                            | No        |
|             | User and Profile management | Less busy user<br>As a project manager I can see the less busy user so that I can assign him a task                                                                                                                    | No  |                                                                                            | No        |
|             | Projects management         | Assign user to a project<br>As a project manager I can assign user to a project so that they can work on it                                                                                                            | No  |                                                                                            | No        |




## Planning and Agile methodology
### Mockups

Based on the goals and user stories, I created sketches that I used as a foundation for designing the wireframes for the entire web application.

<img src="readme_assets/sketches/sketches-wire.png" alt="drawing" width="200"/>

After creating the initial sketches, I designed the complete wireframe application using [Adobe XD](https://www.adobe.com/products/xd/learn/get-started-xd-design.html). The fully interactive public wireframe application (for desktop only) can be accessed [here](https://xd.adobe.com/view/bc9e5f77-a435-416f-9f37-6dbc2d3b28dd-e9cd/?fullscreen&hints=off).

Log In / Sign up / Profile page

![Alt text](readme_assets/wireframes/overviews/loginupprofile-overview-wire.png)

Project related pages

![Alt text](readme_assets/wireframes/overviews/projects-overview-wire.png)

Asset related pages

![Alt text](readme_assets/wireframes/overviews/assets-overview-wire.png)

The full-size wireframes can be viewed in [this document](WIREFRAMES-FULL.md).

The wireframes served as a guiding reference throughout the frontend development process. While numerous adjustments were necessary when confronted with real-world scenarios, they remained essential in maintaining focus on the application's scope.
***

The Navbar:

In the wireframe, it is depicted as a sidebar, but in the final product, it takes the form of a classic fixed navbar at the top. This design choice is primarily driven by technical considerations. I attempted to develop the sidebar version, but I encountered challenges and felt unsatisfied with the result. Consequently, I chose to prioritize the Minimum Viable Product (MVP) and omitted it from the initial release. However, it remains a part of my future development plans because it aligns well with the project's concept, and I'm passionate about its implementation.
***

Timeline / Projects

It represents the project list containing all the projects created. Initially, I envisioned it divided into three different columns: one for projects 'in progress,' one for planned projects, and one for overdue projects. However, in practice, the page appeared cluttered and posed issues for mobile screens. In the final design, I simplified it to have one column for the project and a separate column for the assets connected to each project. More details about this can be found in the [feature section](#project-list).
***

Contribute / Assets

This page lists all the assets created by users, providing a comprehensive overview of the work completed by the users.
***

### Data models
Data models were also sketched on paper alongside the wireframes.

![InitialNotes](readme_assets/sketches/initialNotes-dinomizer.jpeg)

![datamodels-sketc](readme_assets/sketches/datamodels-sketch.jpeg)

The sketches were subsequently translated into designs using [drawSQL](https://drawsql.app/teams/fabi8steam/diagrams/dinomizer). You can view the original drawing at [this link](https://drawsql.app/teams/fabi8steam/diagrams/dinomizer).

![Alt text](readme_assets/sketches/datamodels-prints.jpeg)

The task model was not included in the MVP and, therefore, was not developed.
On the other hand, the comment model was developed in the backend but was not utilized in the frontend because it was not required for the MVP. It has been left for implementation in future versions of Dinomizer.
You can find detailed information about the models and backend development in a separate repository, which is accessible [here](https://github.com/fabi8bit/dinomizer_drf_pp5). For direct access to the backend README.md file, you can follow [this link](https://github.com/fabi8bit/dinomizer_drf_pp5/blob/main/README.md).


### Agile methodology

The development methodology employed for Dinomizer is Agile. I used the 'Issues' feature on GitHub to meticulously track all the steps necessary to deliver the Minimum Viable Product (MVP).

To begin, I initiated a new project board, of type 'board,' aptly named 'Dinomizer' (accessible at [Dinomizer GitHub project](https://github.com/users/fabi8bit/projects/6/views/1)). Furthermore, I created a customized issue template that served as the foundation for crafting user stories. Each user story was given its title and description. To facilitate organization, I established custom labels and appropriately assigned them to the user stories.
The user stories were subsequently assigned to the 'Dinomizer' project board and placed in the 'To-Do' column. Within the 'Issues' section, I established the Milestone, serving as an Iteration, and systematically assigned 3 to 4 user stories to it.

![Iterations list](readme_assets/github-ss/iterations-list.png)

Simultaneously, within the project board, I moved the same user stories from the 'To-Do' column to the 'In Progress' column.

![kanbanborad](readme_assets/github-ss/kanbanboard.png)

I allocated a timebox of 3 days for the first iteration and aimed to complete the tasks within that timeframe. If there were any remaining user stories, I transferred them to the next iteration, continuing this process as needed.

![Iteration example](readme_assets/github-ss/iteration-example.png)

As soon as the user stories were successfully completed, I marked them as 'closed.' In the project board, this action automatically shifted them from the 'In Progress' column to the 'Done' column.


## Design

<img src="readme_assets/dinomizer-ss/dinomizer-logo-study.png" alt="drawing"/>

The name 'Dinomizer' was proposed by my colleague Alessandro Corinti at [Pomodoro Communication Agency](https://www.pomodoroproduzioni.it/). It's a sort of acronym, standing for 'DIgital Nomads organIZER.' Naturally, the name also inspired the idea of a dinosaur, which served as the basis for the logo design. I crafted the logo using Adobe Illustrator and selected the color palette using Adobe Color.
I opted for high-contrast colors to enhance the overall readability of the entire website.

![Alt text](readme_assets/logos/dinomizer-color-pallette.png)

For the background of the project and asset cards, I selected a dark gray color (#343a40) to provide the appropriate contrast without being overly harsh on the eyes. The font chosen for the logo is 'Poppins,' while I opted for 'Lato' for the text.
***

## Features

### Navigation Bar
The navigation bar was initially conceived as a sidebar but was later changed to a traditional top navbar after conducting some design tests. Utilizing conditional rendering based on the user's status, it offers two options: 'Logged Out' and 'Logged In.

### Logged out option
<img src="readme_assets/dinomizer-ss/navbar-signout.png" alt="drawing"/>
When the user is logged out, the Navbar only displays two available buttons: 'Sign In' and 'Sign Up'.

### Logged in option
<img src="readme_assets/dinomizer-ss/navbar.png" alt="drawing"/>
Upon a user's login, the Navbar presents five available options: 'New Project,' 'Timeline,' 'Projects,' 'Contribute,' and 'Profile Page.

#### New project
This button is linked to the [project create form](#project-create-form) and is used for creating new projects.
#### Timeline
When clicked, it displays a list of all the projects created on the page, as explained in the chapter [Timeline](#timeline-project-list).
#### Projects
This button allows users to navigate to the projects page, which is essentially a filtered version of the [projects page](#project-list--timeline).
#### Contribute
Clicking here will redirect the user to the list of assets created by the user, which I've named the 'Contribute' page.
#### Profile page
The 'Profile Page' link features dynamic text that changes to the name of the logged-in user. Clicking on it redirects the user to the [profile page](#profile-page).
***

### Branded landing page
Desktop | Mobile
:-------------------------:|:-------------------------:
<img src="readme_assets/dinomizer-ss/welcome-page.png" alt="drawing"/> | <img src="readme_assets/dinomizer-ss/welcome-page-mobile.png" alt="drawing"/>

This is the home page of Dinomizer when a user is not logged in. It includes a jumbotron element that provides a brief explanation of what Dinomizer is. At the bottom, you'll find two buttons: 'Sign In' and 'Sign Up,' with their functions being self-explanatory.
***

### Sign-up form
Desktop | Mobile
:-------------------------:|:-------------------------:
![signupform](readme_assets/dinomizer-ss/signup-form.png) | ![signupform](readme_assets/dinomizer-ss/signup-form-mobile.png)

The form includes only three input fields: Username, Password, and Confirm Password. Password validation is performed by Django's Password management, requiring a minimum of 8 characters. Upon signing up, a user profile is created alongside their account. When proceeding to the [Profile page](#profile-page), users have the opportunity to provide additional information, such as a profile image, real name, and bio.
After successfully signing up, users are automatically redirected to the Sign-In form.
***

### Sign-in form
Desktop | Mobile
:-------------------------:|:-------------------------:
![signupform](readme_assets/dinomizer-ss/signin-form.png) | ![signupform](readme_assets/dinomizer-ss/signin-form-mobile.png)

On this page, the user is required to enter the username and password chosen during the [sign up](#sign-up-form) process. If the provided information is correct, the user will be redirected to the [timeline page](#timeline-project-list).
***

### Timeline (project list)

<img src="readme_assets/dinomizer-ss/home-dinomizer.png" alt="drawing"/>

This page serves as the main hub of the application, listing all the projects created by every user along with their associated assets. The page is structured with two adjacent columns:

Left Column: In this column, project cards are displayed, featuring essential information such as the project title, owner, due date, and current status. At the bottom, there's a control bar component. The controls within this component are dynamically rendered based on the user's status, and you can find detailed information about this in the [Project Controls](#project-controls) section. Clicking on the header section of a project card allows users to access the [project's detail view](#project-details).

Right Column: In this column, cards representing the assets linked to the selected project are displayed. Since a project can have multiple assets, I chose to utilize the carousel element from React Bootstrap to present these assets. Each asset card includes a preview picture, which was uploaded during the [creation process](#asset-create-form) of the asset, and a minimal amount of information, including the title and last update. On both the left and right sides of the card, there are arrow buttons for scrolling through the carousel. Clicking on the picture or the icon next to the title provides access to the [asset's details view](#asset-details).
***


### Project details
Desktop | Mobile
:-------------------------:|:-------------------------:
<img src="readme_assets/dinomizer-ss/project-detail.png" alt="drawing"/> | <img src="readme_assets/dinomizer-ss/project-detail-mobile.png" alt="drawing" width="200"/>

The structure of this page mirrors that of the [timeline (project list)](#timeline-project-list) discussed in the previuos chapter. When accessing the project details, more comprehensive information about the project becomes visible, including content and contributors, in addition to the details already available in the list view. As on the list view, it's also possible to access the control bar at the bottom.
In the right column, the asset carousel provides the same functionality as in the [timeline (project list)](#timeline-project-list).
***


### Project controls

<img src="readme_assets/dinomizer-ss/controls-project3.png" alt="drawing" width="200"/>

***

<img src="readme_assets/dinomizer-ss/controls-project.png" alt="drawing" width="200"/>

***

<img src="readme_assets/dinomizer-ss/controls-project2.png" alt="drawing" width="200"/>

### Project create form

<img src="readme_assets/dinomizer-ss/project-create-form.png" alt="drawing"/>

***

<img src="readme_assets/dinomizer-ss/project-create-form-mobile.png" alt="drawing" width="200"/>

### Project edit form

<img src="readme_assets/dinomizer-ss/project-edit-form.png" alt="drawing"/>

***

<img src="readme_assets/dinomizer-ss/project-edit-form-mobile.png" alt="drawing" width="200"/>

### Assets carousel

<img src="readme_assets/dinomizer-ss/asset-carousel.png" alt="drawing"/>

***

<img src="readme_assets/dinomizer-ss/asset-carousel-nocheck.png" alt="drawing"/>



### Asset details

<img src="readme_assets/dinomizer-ss/asset-detail.png" alt="drawing"/>

***

<img src="readme_assets/dinomizer-ss/asset-detail-mobile.png" alt="drawing" width="200"/>

### Asset dropdown menu

<img src="readme_assets/dinomizer-ss/dropdown-menu.png" alt="drawing" width="200"/>

### Asset create form

<img src="readme_assets/dinomizer-ss/asset-create-form.png" alt="drawing"/>

***

<img src="readme_assets/dinomizer-ss/asset-create-form-mobile.png" alt="drawing" width="200"/>

### Asset edit form

<img src="readme_assets/dinomizer-ss/asset-edit-form.png" alt="drawing"/>

***

<img src="readme_assets/dinomizer-ss/asset-edit-form-mobile.png" alt="drawing" width="200"/>

### Profile detail page

<img src="readme_assets/dinomizer-ss/profile-page.png" alt="drawing"/>

***

<img src="readme_assets/dinomizer-ss/profile-page-mobile.png" alt="drawing" width="200"/>

### Search bar

<img src="readme_assets/dinomizer-ss/searchbar-projects.png" alt="drawing"/>

***

<img src="readme_assets/dinomizer-ss/searchbar-assets.png" alt="drawing"/>

### Modal box

<img src="readme_assets/dinomizer-ss/modal-delete.png" alt="drawing"/>

### Error messages

<img src="readme_assets/dinomizer-ss/error-messages.png" alt="drawing"/>


## CRUD functionality

## Reuse of components

## Custom hooks

## Context

## Testing

## Deployment

## Future improvements

## Framework and libraries

## Credits











## Future improvements
- create an Organization that contains projects
- set a local storage to store original files (large size)
- create authomatic lowres file to display inside the app
- evaluate team capacity
- diagram that displays how busy a user is so as a project manager I can decide to whom assign a task
- side navbar for a more appealing user experience


side navbar
https://www.youtube.com/watch?v=IathdVB65Lw&t=217s