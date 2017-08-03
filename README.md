---

[AlarmStream](https://vancelongwill.github.io/alarmstream/) *(live demo on GitHub pages)*


---

Welcome to the home of **AlarmStream**, a clean and usable alarm clock web app built using React.js

The idea behind the app was to create a minimalist alarm application which was straightforward and intuitive to use.

This app was built largely as a learning project to gain further experience with React. I'm sharing it as I want to contribute to the open source community. 

Suggestions, improvements, and bug reports are more than welcome. 

*Current Version: 0.1*

**Key features**

* Add, remove and edit alarms from the feed
* Mobile first, responsive minimalist design
* Swipeable menu
* Facebook style feed for easy access to all your previous alarms
* Choice of alarm tones
* Attach notes, titles to alarms
* Snooze
* Data persistence
	- Alarms are saved between sessions using the [localStorage](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage) browser API
*  Toggle alarms on the feed
*  Animated ring icon


**Dependencies**

* [Create React App](https://github.com/facebookincubator/create-react-app) was used as a boilerplate
* [Babel](https://github.com/babel/babel) including the transform-class-properties plugin for es6+ features & syntax
* [Moment.js](https://github.com/moment/moment/) for time objects
* [Semantic-ui-react](https://github.com/Semantic-Org/Semantic-UI-React) for responsive UI components
* [React-sound](https://github.com/leoasis/react-sound) HTML5 player used to play the alarm tone
* [React-day-picker](https://github.com/gpbl/react-day-picker) for the date picker component 
* [React-view-pager](https://github.com/souporserious/react-view-pager) for animated transitions on the alarm form


**Planned Updates**

* Version control
* Updated animations 
* Code cleanup, following Airbnb's [React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
* Installation guide
* Snooze rewrite


**Future Possibilties**

* [React-native](https://github.com/facebook/react-native) version
* Backend API in [Express](https://github.com/expressjs/express) with cross platform sync


*Vance Longwill*