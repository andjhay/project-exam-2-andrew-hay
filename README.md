# Project Exam 2 - Holidaze

<img width="952" alt="image" src="https://user-images.githubusercontent.com/88853764/235364640-e8c0eda8-a6ac-49ca-9105-a6283af34d2a.png">

## Description

Year 2 exam project for Noroff higher professional degree in front-end development, built using create-react-app & tailwind. Google Material Fonts and Icons have been used. react-calender and leaflet maps were vital in creating the site. see full list of dependencies at the end of Readme.

## API

https://docs.noroff.dev/

About: The API source is created and maintained by Noroff, all entries are Noroff Students own. </br>
Limitations: 100 item fetch limit, this limits the ability to search all venues and rather only a selection of 100. </br> There is also a limiter on the number of fetches so refreshing the page aggressivly will block furhter requests for a short period of time.

## Links to required submissions

| Resource         | URL                                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Gantt Chart      | https://www.figma.com/file/HTEpgmisgpJaju2UhbR8gy/Project-Exam-2-Holidaze-Andrew-Hay?node-id=1%3A3&t=Xuwp4AI9H0DOyWlH-1 |
| Design Prototype | https://www.figma.com/file/HTEpgmisgpJaju2UhbR8gy/Project-Exam-2-Holidaze-Andrew-Hay?node-id=1%3A3&t=Xuwp4AI9H0DOyWlH-1 |
| Style Guide      | https://www.figma.com/file/HTEpgmisgpJaju2UhbR8gy/Project-Exam-2-Holidaze-Andrew-Hay?node-id=1%3A3&t=Xuwp4AI9H0DOyWlH-1 |
| Kanban Board     | https://trello.com/b/6bd75TyX/project-exam-2                                                                            |
| Repository       | https://github.com/andjhay/project-exam-2-andrew-hay                                                                    |
| Hosted Demo      | https://project-exam-2-andrew-hay.netlify.app/                                                                          |

## Technical Resources Used

### Javascript Framework

React

### CSS Framework

Tailwind

### Hosting services

Netlify

### Design applications

Figma

### Planning applications

Trello(Kanban) and TeamGantt (Gantt) a Trello Power-Up feature

## Installation

### Installing

1. Clone the repo:

```bash
git $ git clone https://github.com/andjhay/project-exam-2-andrew-hay.git
```

2. Install the dependencies:

```
npm install
```

3. Run development environment:

```
npm run start
```

## Testing

### Cypress end-to-end

To run end-to-end tests in console run:

```
npm run cy-live /*For hosted site*/
```

Or

```
npm run cy-local /*For localhost*/
```

Else to view end-to-end tests or select a spesific test run:

```
npm run cy
```

### Unit Tests

Run all unit tests

```
npm run test
```

## Dependencies

In addition to what is installed with create-react-app these dependencies were required:

<ul> 
<li>prettier v2.8.7 (formatting code to standard)</li>
<li>prettier-plugin-tailwindcss v0.2.7</li>
<li>styled-components v5.3.10 (Loading Element made using styled components)</li>
<li>tailwindcss v3.3.1 (CSS framework)</li>
<li>@heroicons/react v2.0.17 (Icon library for tailwind and headlessui)</li>
<li>@headlessui/react v1.7.13 (tailwind component library)</li>
<li>eslint v8.39.0</li>
<li>eslint-plugin-react v7.32.2</li>
<li>eslint-plugin-cypress v2.13.3</li>
<li>react-calendar v4.2.1 (Calender component for react)</li>
<li>react-leaflet v4.2.1 (Map component)</li>
<li>zustand v4.3.7</li>
<li>sass v1.62.0</li>
<li>react-router-dom v6.10.0</li>
<li>date-fns v2.29.3 (Date and time function library)</li>
</ul>
