# IntuiTeach
IntuiTeach is a web app combined with Zoom that allows teachers to write of series a questions for a virtual lecture they're about to give and as the lecture progresses, the teacher is able to pose a live question for the students on the video call to answer. IntuiTeach also aims to improve engagement for younger learners by incentivizing correct answers with rewards. Each question can hold a certain number of points determined by the teacher, which can then be converted into rewards that are also made by the teacher (i.e. extra credit). IntuiTeach increases the teacher’s ability to gauge the students’ understanding by providing in-depth statistics about the time taken by students to answer, and the accuracy of the class. Developers can expand on our base with our flexible API to track a teacher’s question sets and student statistics so that IntuiTeach can be integrated to different platforms, for example, a mobile app. Through our navbar at the top, teachers will create meetings through the Zoom API, be authenticated, and have their data stored in the API's we designed in our Mongo database. From there, students will be able to join through the meeting id which redirects them to the specific meeting they requesting to join, again handled by our API.

## The API
To use any API keys, you should create a .env file in the server folder. Go to the server directory for more information on how to use our APIs and their endpoints

## Get started locally
To get our web app running on your local machine, first clone the repo
``` bash
git clone https://github.com/z4kids/IntuiTeach.git
```

Once cloned, you want to make sure the server and the client are both running for the web app to function

``` bash
cd /client
npm install
npm run start

cd /server
npm install 
npm run start
```
This should get you running on your local machine on a port of your choosing. There are respective READMEs in both the client and server directory for more information on how ot run the web app and the functionality of our APIs.
