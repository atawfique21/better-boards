# **Trello Recreation**

### Overview

_**Trello** is a web-based Kanban-style list-making application. My project here involves recreating Trello in React.JS._

<br>

### Extra To-Do
- _Moving API call into own component (help needed!)_
	- _Passing down ZIP Code & apikey Props and having that component update weatherData Object in App.Js state._
- _Add optional notes for each task_
- _Add optional check-list for each task_
- _If a task is clicked on, do a pop-up that display's that task's details and make it so you can edit it's notes and checklist, etc. So when you go back to the board, the changes are there._

### Wireframes

>Wireframes to display desktop, tablet and mobile views.

![Desktop Landing](url)

- Desktop Landing (in progress)

<br>

![Desktop Hero](https://i.imgur.com/tP8eGsX.jpg)

- Desktop Hero

<br>

![Mobile Hero](https://i.imgur.com/9vvvMdm.jpg)

- Mobile Hero

<br>

***

<br>

### MVP

_The **Trello clone** MVP will house one task board with basic funcationlity such as adding new tasks to the board and rearranging tasks. The api call will also be part of the MVP which will display widgets (only one for mvp) that can be selected when creating the board._

#### Goals

- _Materialistic design_
- _Add task functionality_
- _Three different progress states._
- _Easy to read/view at first look._
- _Intuitive functionality_

#### Libraries

> Use this section to list all supporting libraries and their role in the project.

|     Library      | Description                                |
| :--------------: | :----------------------------------------- |
|   React Router   | _I'll be using react router to create a landing page that links to the board and back.._ |
|   React Axios    | _This will be used for the API call for the widgets.._ |
|   React Spring   | _(stretch) I'll be using this to make each task drag & drop._ |

#### API Data

> Use the Data Section to define the API(s) you will be consuming for your project, inluding sample URL queries.

|    API     | Quality Docs? | Website       | Sample Query                            |
| :--------: | :-----------: | :------------ | :-------------------------------------- |
| OpenWeatherMap |      yes      | http://api.openweathermap.org/ | _https://i.imgur.com/KJfgys5.png_ |

#### React Components

_Component Hierarchy_

> Use this section to define your React components and the data architecture of your app.

```
src
|__ assets/
      |__ api-helper
      |__ fonts
|__ components/
      |__ Header.jsx
      |__ Board.jsx
      |__ AddTask.jsx
      |__ Task.jsx
      |__ Widget.jsx
      |__ Footer.jsx
```

_Component Breakdown_

> Use this section to go into further depth regarding your components, including breaking down the components as stateless or stateful, and considering the passing of data between those components.

|  Component   |    Type    | state | props | Description                                                      |
| :----------: | :--------: | :---: | :---: | :--------------------------------------------------------------- |
|    Header    | functional |   n   |   y   | _The header will contain the logo, add task button & name of board._|
|      Widget  | functional |   n   |   n   | _The navigation will provide a link to each of the pages._       |
|   AddTask    |   class    |   y   |   n   | _The AddTask class will render a empty task onto page to be filled out so it can be passed to board and then be updated in state to use in task._      |
|  Task        | functional |   n   |   y   | _The task will render the info via props and pass to board._                 |
|  Board       | class |   y   |   y   | _The board will render the cards and their info via props (via mapping)._         |
|    Footer    | functional |   n   |   n   | _The footer will show info about me and a link to my github._ |

_Component Estimates_

| Task                | Priority | Estimated Time | Time Invested | Actual Time |
| ------------------- | :------: | :------------: | :-----------: | :---------: |
| Header              |    L     |     1/2 hrs    |     3.5 hrs       |     3.5 hrs     |
| Widget              |    M     |     1   hrs    |     TBD       |     TBD     |
| Board               |    H     |     2 hrs      |     TBD       |     TBD     |
| Footer              |    L     |     1/2 hrs    |     TBD       |     TBD     |
| Add Task            |    M     |     1.5 hrs    |     TBD       |     TBD     |
|  Task               |    H     |     2   hrs    |     TBD       |     TBD     |
| TOTAL               |          |     7.5 hrs    |     3.5 hrs       |     3.5 hrs     |

**side note from past me, I am underestimating this to the max lol.**
<br>

***

<br>

### Post-MVP

> Use this section to document ideas you've had that would be fun (or necessary) for your Post-MVP. This will be helpful when you return to your project after graduation!

#### Post-MVP Goals

- _Add user account and auth capabilities._

#### Post-MVP Data

- _Utilize the Giphy API to welcome new users with funny gifs._

<br>

***

<br>

## Project Delivery

> The Delivery section should be expanded and revised as you work on your project.

### Helper Functions

> Use this section to document all helper functions– generic functions that can be reused in other applications.

|  Function  | Description                                |
| :--------: | :----------------------------------------- |
| Api_helper | Basic API Call that just gets the response |


### Code Showcase

> Use this section to include a brief code snippet of functionality that you are proud of an a brief description  

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

### Code Issues & Resolutions

> Use this section to list of all major issues encountered and their resolution.

| Error                                                   | Resolution                                             |
| :------------------------------------------------------ | :----------------------------------------------------- |
| `app.js:34 Uncaught SyntaxError: Unexpected identifier` | Missing comma after first object in sources {} object. |
