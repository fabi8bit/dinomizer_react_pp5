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
    + [Profile edit form](#profile-edit-form)
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
The user stories were developed following the definition of the [project goals](#project-goals). Initially, I identified the potential epics under which the user stories could be categorized. Afterward, I assigned them to the hypothetical backlog (Iteration), as discussed in the [Planning and Agile methodology](#planning-and-agile-methodology).

The User Stories are listed in [this document](USERSTORIES.md). Instead you can access the corresponding chart in the form of a spreadsheet [here](https://docs.google.com/spreadsheets/d/1dO9Zj2uhU90JMJT0_W85nkQjaKAbOLGk1Hr0KajRhKQ/edit#gid=1780070774).
***




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

The name 'Dinomizer' was proposed by my colleague Alessandro Corinti at [Pomodoro Communication Agency](https://www.pomodoroproduzioni.it/). It's a sort of acronym, standing for 'DIgital Nomads organIZER.' Naturally, the name also inspired the idea of a dinosaur, which served as the basis for the logo design. I crafted the logo using [Adobe Illustrator](https://www.adobe.com/products/illustrator.html) and selected the color palette using [Adobe Color](https://color.adobe.com/).
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
Desktop | Mobile
:-------------------------:|:-------------------------:
<img src="readme_assets/dinomizer-ss/home-dinomizer.png" alt="drawing"/> | <img src="readme_assets/dinomizer-ss/home-dinomizer-mobile.png" alt="drawing"/>

This page serves as the main hub of the application, listing all the projects created by every user along with their associated assets. The page is structured with two adjacent columns:

Left Column: In this column, project cards are displayed, featuring essential information such as the project title, owner, due date, and current status. At the bottom, there's a control bar component. The controls within this component are dynamically rendered based on the user's status, and you can find detailed information about this in the [Project Controls](#project-controls) section. Clicking on the header section of a project card allows users to access the [project's detail view](#project-details).

Right Column: In this column, cards representing the assets linked to the selected project are displayed. Since a project can have multiple assets, I chose to utilize the carousel element from React Bootstrap to present these assets. More details about this component can be found in the [Assets Carousel](#assets-carousel) section.
***


### Project details
Desktop | Mobile
:-------------------------:|:-------------------------:
<img src="readme_assets/dinomizer-ss/project-detail.png" alt="drawing"/> | <img src="readme_assets/dinomizer-ss/project-detail-mobile.png" alt="drawing"/>

The structure of this page mirrors that of the [timeline (project list)](#timeline-project-list) discussed in the previuos chapter. When accessing the project details, more comprehensive information about the project becomes visible, including content and contributors, in addition to the details already available in the list view. As on the list view, it's also possible to access the control bar at the bottom.
In the right column, the asset carousel provides the same functionality as in the [timeline (project list)](#timeline-project-list).
***


### Project controls
Status | Component
:-------------------------:|:-------------------------:
Joined, Owner | <img src="readme_assets/dinomizer-ss/controls-project3.png" alt="drawing" width="200"/>
Not joined | <img src="readme_assets/dinomizer-ss/controls-project.png" alt="drawing" width="200"/>
Joined, not Owner | <img src="readme_assets/dinomizer-ss/controls-project2.png" alt="drawing" width="200"/>
Not joined, Owner | <img src="readme_assets/dinomizer-ss/controls-project4.png" alt="drawing" width="200"/>

The project controls serve as the visual representation of certain CRUD (Create, Read, Update, Delete) functionalities related to the Project model. This is a dynamic component that renders different buttons based on the user's status. It's important to note that not every button is always present, as depicted in the image.

- The first button is the 'Join/Unjoin' button: When clicked, it registers a new record in the participant model and displays a different icon, the 'Unjoin' icon.
- The second button is only revealed after joining a project. Its function is to create a new asset for the project. When the button is clicked, the user is presented with the [asset creation form](#asset-create-form). Users have the freedom to create as many assets as they require.
- The third and fourth buttons are responsible for the CRUD (Create, Read, Update, Delete) functionalities related to editing and deleting assets. When a user clicks on the pen icon, they are presented with the [Asset edit form](#asset-edit-form), where they have the freedom to make the necessary changes. Clicking on the fourth button will result in the deletion of the project. To ensure the user doesn't perform this operation accidentally, a [modal page](#modal-box) will be displayed, requesting confirmation, as this action is not reversible.
***


### Project create form
Desktop | Mobile
:-------------------------:|:-------------------------:
<img src="readme_assets/dinomizer-ss/project-create-form.png" alt="drawing"/> | <img src="readme_assets/dinomizer-ss/project-create-form-mobile.png" alt="drawing"/>

This form is accessible after clicking the 'New Project' button in the Navbar. It's where the user can input all the details related to the project, including: Project name, content, start date, expected end date, status, and cover image. All the input fields are self-explanatory, including the 'Status' dropdown, where the user can choose one of the three options: 'Planned,' 'In Progress,' or 'Completed.' In future versions of Dinomizer, these options will be used to filter and sort search results. Upon submitting the form, the user will be redirected to the [Project details](#project-details) page.
***

### Project edit form
Desktop | Mobile
:-------------------------:|:-------------------------:
<img src="readme_assets/dinomizer-ss/project-edit-form.png" alt="drawing"/> | <img src="readme_assets/dinomizer-ss/project-edit-form-mobile.png" alt="drawing"/>

This form is accessible after clicking the 'Pencil' edit button in the project's control bar. Here, the user can update the data that was initially entered during the project creation process. Upon submitting the form, the user will be redirected to the [Project details](#project-details) page.
***



### Assets carousel
Checked asset

<img src="readme_assets/dinomizer-ss/asset-carousel.png" alt="drawing" width="400"/>

Unchecked asset

<img src="readme_assets/dinomizer-ss/asset-carousel-nocheck.png" alt="drawing" width="400"/>


The asset carousel serves as a concise visual representation of the assets. Within this component, all the assets associated with a specific project are collected. Each asset card includes a preview picture, which was uploaded during the creation process of the asset, as well as minimal information such as the title and the date of the last update. On both the left and right sides of each card, there are arrow buttons for scrolling through the carousel. A special 'check' flag appears on top of the title if the project manager (project owner) has marked this asset as 'Checked'. You can find more details on this in the description of the ['Check' option in the Dropdown menu section](#asset-dropdown-menu). Clicking on the picture or the icon next to the title allows access to the asset's details view.
***


### Asset details
Desktop | Mobile
:-------------------------:|:-------------------------:
<img src="readme_assets/dinomizer-ss/asset-detail.png" alt="drawing"/> | <img src="readme_assets/dinomizer-ss/asset-detail-mobile.png" alt="drawing"/>

On this page, the user can view all the details of the asset. In addition to the inputs provided by the user during the creation process, there are also additional informations such as the 'related project,' which is a field provided by the frontend logic, and the asset's owner. Furthermore, a [dropdown menu](#asset-dropdown-menu) that overlays the cover image is present.
***


### Asset dropdown menu
<img src="readme_assets/dinomizer-ss/dropdown-menu.png" alt="drawing" width="200"/>

The asset dropdown menu is a dynamic component that renders its options based on various conditions. Not all options are presented to the user; instead, they are conditionally rendered based on the user's state and the content of the asset. If the user is the owner of the asset, they will see the 'Edit' and 'Delete' options. If the user is also the project owner of the project to which the asset is related, the 'Check' option will also be visible. The 'Download' option is presented only if a real asset is associated with the item (more details on this are available in the [asset create form](#asset-create-form)).


### Asset create form
Desktop | Mobile
:-------------------------:|:-------------------------:
<img src="readme_assets/dinomizer-ss/asset-create-form.png" alt="drawing"/> | <img src="readme_assets/dinomizer-ss/asset-create-form-mobile.png" alt="drawing"/>

This form is accessible after clicking the 'Create Asset' button in the project's control bar. Here, the user can input all the details related to the asset, including: Asset name, Category, Description, Upload Asset, and Cover Image. The 'Category' input is a dropdown menu with the following options for the user to choose from: Graphic, Video, Audio, Copywriting, and Other. After submission, the user will be redirected to the Asset detail page.
It's worth noting that the 'Upload Asset' field is not required, and this deliberate choice allows the asset element to be very flexible and used, for example, as a checklist or memorandum.
***


### Asset edit form
Desktop | Mobile
:-------------------------:|:-------------------------:
<img src="readme_assets/dinomizer-ss/asset-edit-form.png" alt="drawing"/> | <img src="readme_assets/dinomizer-ss/asset-edit-form-mobile.png" alt="drawing"/>

This form is accessible after clicking the 'Edit' option in the [dropdown menu](#asset-dropdown-menu). This option is visible only if the user is the owner of the asset. Within this form, users can update the data that was initially entered during the [asset creation process](#asset-create-form). Upon submitting the form, the user will be redirected to the [Asset detail page](#asset-details).
***


### Profile detail page
Desktop | Mobile
:-------------------------:|:-------------------------:
<img src="readme_assets/dinomizer-ss/profile-page.png" alt="drawing"/> | <img src="readme_assets/dinomizer-ss/profile-page-mobile.png" alt="drawing"/>

The profile page serves as the location where all available details for a profile are visible. These details include the profile image, real name, bio, registration date, last profile update, and, of course, the username chosen during the user registration. The username is displayed in the page title. If the user is the owner of the profile, the page will also render the 'Edit' and 'Sign Out' buttons.
***

### Profile edit form
Desktop | Mobile
:-------------------------:|:-------------------------:
<img src="readme_assets/dinomizer-ss/profile-edit-form.png" alt="drawing"/> | <img src="readme_assets/dinomizer-ss/profile-edit-form-mobile.png" alt="drawing"/>

A user has the ability to edit the details of their profile, which includes the option to change their password along the other fields like Image, Real name, and Bio.
***


### Search bar
<img src="readme_assets/dinomizer-ss/searchbar-projects.png" alt="drawing"/>

Through the use of the search bar, a user can search for projects. The search operation is performed by examining the title, content, and owner.

<img src="readme_assets/dinomizer-ss/searchbar-assets.png" alt="drawing"/>

The search bar for Assets is available on the Contribute page, where all the assets created by a user are listed. By using the search bar, a user can search for assets, and the search operation involves examining the asset name, category, and owner.

### Modal box
Desktop | Mobile
:-------------------------:|:-------------------------:
<img src="readme_assets/dinomizer-ss/modal-delete.png" alt="drawing"/> | <img src="readme_assets/dinomizer-ss/modal-delete-mobile.png" alt="drawing"/>

When a user attempts to delete a project or an asset, the item is not immediately removed. Deletion is considered irreversible, so a modal page pops up to confirm the operation.
***

### Error messages
<img src="readme_assets/dinomizer-ss/error-messages.png" alt="drawing"/>

All input fields in the forms are processed through a control system. In the event of errors occurring during submission, warning messages are displayed under the fields affected by the error.


## CRUD functionality
Dinomizer delivers robust functionality encompassing the creation, retrieval, updating, and deletion of various elements. This capability is made accessible through a user interface developed using React JS in combination with the Django Rest Framework API. The web application empowers users to create and manage profiles, projects, assets, and checks, presenting these elements in both list and detailed views. Users possessing the necessary permissions, including ownership rights, can utilize dedicated forms to make updates and deletions to these elements.

## Reuse of components
Some of the components of Dinomizer where coded with the intention of writing less code and those includes:

- Avatar Component:

  The Avatar component is utilized to display a user's profile picture across various pages within the site.
  It accepts two props: src for the image source and height for the image's height.

- Back Button Component:

  The Back Button component utilizes the useHistory hook to enable users to navigate back to the previous page they were on.

- Placeholder Component:

  The Placeholder component serves multiple purposes, such as displaying loading spinners and cover images for Project and Asset creation forms.
  It accepts three props: src for the image source, spinner as a switch for conditionally rendering the loading spinner, and msg to display a message, as seen in the NotFound component.

- DeleteModal Component (Again):

  The DeleteModal component handles the deletion operation after receiving user confirmation.
  It's used for deleting projects and assets and takes several props: `type` specifies the element type in the confirmation message, `name` represents the name of the element, `change` toggles the showModal state, and `deleteitem` sends the appropriate Axios request to delete the element.

- Project Component:

  The Project component is employed whenever a project needs to be displayed, whether on project lists or in project details.
  It features conditionally rendered elements based on its usage (project list or project detail) and leverages various props to achieve this. For instance, the projectPage prop acts as a flag to indicate that the component should render specific parts, and it does so based on the value of this prop.

- Asset Component:

  The Asset component follows a similar logic as the Project component, with the ability to conditionally render elements based on its usage. It takes in props to determine how it should behave and what to display, whether in the list view or asset detail view or in the AssetCarousel.


## Custom hooks
The two custom hooks present on this project are useRedirect and useClickOutsideToggle and are borrowed from the walkthrough project of Code Institute called Moments.
- useRedirect Custom Hook:

  The useRedirect custom hook serves a crucial role in the project by checking whether a user is still logged in. If not, it redirects the user to the logged-out page.
  It is also employed to redirect logged-in users who attempt to access sections of the site that are unnecessary for someone already logged in, such as the sign-in page. For instance, if a user accidentally enters the direct URL for the sign-in page, they are redirected to the home page, which is the timeline page.

- useClickOutsideToggle Custom Hook:

  The useClickOutsideToggle custom hook is utilized in the collapsed navbar(mobile) and plays a significant role in providing a smoother user experience. It automatically collapses the navbar menu when a user clicks on an option or anywhere outside of the navbar. This eliminates the need for the user to click the burger menu again, contributing to a more user-friendly experience.


## Context
Context is a powerful feature provided by React JS. In this project, the CurrentUserContext is borrowed from the Code Institute's walkthrough project called Moments. It plays a crucial role in various parts of the application, allowing checks on user permissions to perform various tasks. For example, it ensures that users have the necessary permissions to change their profile password.

## Testing
Testing was conducted throughout the development of the web application and followed the chronological order of the user stories outlined in the Iterations, as documented in the Agile methodology section. The details of manual tests conducted on Dinomizer are provided in [this document](TESTS.md). Alternatively, the test results can be accessed in spreadsheet format at this [link](https://docs.google.com/spreadsheets/d/1dO9Zj2uhU90JMJT0_W85nkQjaKAbOLGk1Hr0KajRhKQ/edit#gid=1323818088).

Only one automated test was conducted, and it was on the NavBar:
- renders link to the user profile for a logged in user - passed

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