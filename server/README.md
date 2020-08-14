# API Usage
## Environmental variables
The following environmental variables must be set\
`DB_URI`: A URI to your mongodb\
`ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET`, and `ZOOM_REDIRECT_URI`: The zoom credentials for oauth\
`SESSION_SECRET`: A series of random characters for generating a secure session
## Starting the API
To start the API server
```
cd server/
npm install
npm run start
```
## Endpoints for students
### POST /student/join
#### Purpose
Registers a student to a teacher when a student joins a meeting.
#### Usage
Request body:
```JSON
{
    "name": "Name of student",
    "student_zoom_id": "Student's zoom id", 
    "teacher_zoom_id": "Teacher's zoom id (must be registered already)"
}
```
Response:
```JSON
{
    "id": "Generated id for student"
}
```
#### Example
Request body:
```JSON
{
    "name": "Bucky",
    "student_zoom_id": "3424fs344gfseh46",
    "teacher_zoom_id": "jo2i343oajfdapb"
}
```
Response:
```JSON
{
    "id": "5f3013cb0c40c90887be1f0c"
}
```
### POST /student/submit
#### Purpose
Submits an answer to question for an exam
#### Usage
Request body:
```JSON
{
    "student_id": "Student's internal id",
    "exam_id": "Exam's internal id",
    "teacher_zoom_id": "Teacher's zoom id",
    "question_index": "Index of question for the exam",
    "answer": "The answer that the user gave",
    "submit_time": "How long it took the user to submit in seconds"
}
```
Reponse:
```JSON
{
    "correct": "true if the user got the question right"
}
```
#### Example
Request body:
```JSON
{
    "student_id": "5f3013cb0c40c90887be1f0c",
    "exam_id": "5f2f4270247649b5ed3a8b23",
    "teacher_zoom_id": "jo2i343oajfdapb",
    "question_index": 0,
    "answer": "17",
    "submit_time": 31.2
}
```
Response:
```JSON
{
    "correct": true
}
```
### GET /student/questions
#### Purpose
Gets the list of questions for a specific exam
#### Usage
Request query parameters:
```
exam_id="The internal id of the exam"
```
Reponse:
```JSON
{
    "questions": [
        {
            "_id": "The internal id of the question",
            "prompt": "The actual question",
            "options": ["An array of options"],
            "max_time": "The maximum amount of time someone can take on the question",
            "points": "The number of points a question is worth"
        },
    ]
}
```
#### Example
Request query parameters:
```
exam_id=5f2f1e595982a2cd57b831a5
```
Reponse:
```JSON
{
    "questions": [
        {
            "_id": "5f2f1fcbcc11a6b36f7e3d61",
            "prompt": "What is 3*3?",
            "options": [
                "1",
                "2",
                "9",
                "4"
            ],
            "max_time": 10,
            "points": 20
        }
    ]
}
```

## Endpoints for teachers
__Note__: All endpoints with /teacher must first be authenticated using the /auth endpoint in order to properly identify the teacher
### GET /teacher/exam
#### Purpose
Gets all the exams for a teacher
#### Usage
Response:
```JSON
[
    {
        "id": "The id of the exam",
        "name": "The name of the exam"
    }
]
```
#### Example
Response:
```JSON
[
    {
        "id": "a324089ugsdgjldsgre",
        "name": "Chapter 1"
    },
    {
        "id": "a324089ugsdgjldshmdr",
        "name": "Chapter 2"
    }
]
```

### POST /teacher/exam

#### Purpose 
Creates new exam 

#### Usage
Request body:
```JSON
{
    "exam_name": "Name of exam"
}
```
Response:
Generates new exam with its own internal id

#### Example
Request body:
```JSON
{
    "exam_name": "math",
}
```
Response:
New exam generated with the following id: 5f30253fd2e184c09fef08a1
### DELETE /teacher/exam
#### Purpose
Deletes a specified exam
#### Usage
Request body:
```JSON
{
    "exam_id": "The id of the exam to be deleted"
}
```
Response: status code
#### Example
Request body:
```JSON
{
    "exam_id": "24392uhfdsafkdjsf9834"
}
```
Response: `200`
### GET /teacher/question
#### Purpose
Gets all the questions for a specific exam
#### Usage
Request query parameters:
```
exam_id="The id of the exam to get questions for"
```
Response:
```JSON
[
    {
        "correct": "The correct answer",
        "max_time": The max time in seconds that is allowed for the question,
        "options": ["An array of answers, including the correct one"],
        "points": The number of points the question is worth,
        "prompt": "The question itself",
        "_id": "The id of the question"
    }
]
```
#### Example
Request query parameters:
```
exam_id="fdsaf982432khlfsaf"
```
Response:
```JSON
[
    {
        "correct": "Orange",
        "max_time": 60,
        "options": ["Apple", "Orange", "Pear", "Blueberry"],
        "points": 10,
        "prompt": "Which food is orange?",
        "_id": "i2407045u4iohfd0y7n"
    }
]
```
### POST /teacher/question

#### Purpose 
Adds new question to exam

#### Usage
Request body:
```JSON
{
    "prompt": "Question prompt",
    "list_of_answers": "array of answer choices", 
    "correct_answer": "the correct answer", 
    "max_time": "the max time allowed to answer the question", 
    "points": "the point value of the question",  
    "exam_id": "the exam's internal id"
}
```
Response:
Generates new question with its internal id

#### Example
Request body:
```JSON
{
    "prompt": "What is 3*3",
    "correct_answer": 9,
    "list_of_answers": [1, 2, 9, 4],
    "max_time": 10,
    "points": 20,
    "teacher_id":"5f2e15b1db60fd3013468aa7",
    "exam_id":"5f30253fd2e184c09fef08a1"
}
```
Response:
New question generated with the following id: 5f2e1418db60fd3013468aa4

### DELETE /teacher/question

#### Purpose 
Deletes a question from the specified exam

#### Usage
Request body: 
```JSON
{
    "question_id": "the interal id of the question", 
    "exam_id": "the internal id of the exam where the question is"
}
```

Response:
Deletes the question with the specific id

#### Example
Request body:
```JSON
{
    "question_id": "5f2e1418db60fd3013468aa4", 
    "exam_id": "5f30253fd2e184c09fef08a1"
}
```
Response:
Question deleted with the following id: 5f2e1418db60fd3013468aa4
### GET /teacher/reward
#### Purpose
Gets a list of rewards for the exam
#### Usage
Request query parameters
```
exam_id="The id of the exam you want rewards for"
```
Reponse:
```JSON
[
    {
        "cost": The number of points the reward is worth,
        "exam_id": "The id of the exam",
        "name": "The name of the reward",
        "_id": "The id of the reward",
    }
]
```
#### Example
Request query parameters
```
exam_id="5439hfjkdsalf9384uh"
```
Reponse:
```JSON
[
    {
        "cost": 100,
        "exam_id": "5439hfjkdsalf9384uh",
        "name": "Extra credit",
        "_id": "459hofds9ahf89i34",
    }
]
```
### POST /teacher/reward

#### Purpose
Adds new reward for students

#### Usage
Request body:
```JSON
{
    "reward_name": "the name of the reward", 
    "reward_cost": "the cost of the reward that will be subtracted from the number of points the student has"
}
```
Response:
Adds reward with its own internal id

#### Example
Request body:
```JSON
{
    "reward_name": "extra credit",
    "reward_cost": "20"
}
```

Response:
New reward generated with the following id: 5f2f439cc3cc88b62372c030

### POST /teacher/meeting
#### Purpose
Creates a meeting link based on the zoom link and the exam the teacher wants to use
#### Usage
Request body:
```JSON
{
    "exam_id": "The internal idea of the exam",
    "zoom_link": "The join meeting link for the zoom"
}
```
Response:
```JSON
{
    "join_url": "The new url to join the meeting with"
}
```
#### Example
Request body
```JSON
{
    "exam_id": "5f2f1e595982a2cd57b831a5",
    "zoom_link": "https://us04web.zoom.us/j/78089432926?pwd=ZU1FVUtXU0pFSG91dUI4bEQxV1Zjdz09"
}
```
Reponse:
```JSON
{
    "join_url": "https://localhost:3000/j/78085232926?pwd=ZU1FVUtXU0pFSG91dUI4bEQxV1Zjdz09&exam=5f2f1e595982a2cd57b831a5"
}
```

## Endpoint for retrieving statistics 
### GET /stats/exam
#### Purpose
Gets the stats of all the students who have taken that quiz
#### Usage
Request query parameters
```
exam_id=5f2f1e595982a2cd57b831a5
```
Response:
An array of JSONs of the stats for the specific exam

#### Example response
```JSON
[
    {
        "_id": "5f2f26cb0c40c908879e6590",
        "exam_id": "5f2f1e595982a2cd57b831a5",
        "student_id": "5f3013cb0c40c90887be1f0c",
        "teacher_id": "5f3018874620ca4ab2b7a49e",
        "answers": [
            9,
            "Liu"
        ],
        "points": 30,
        "times": [
            5.4
        ],
        "student_name": "Bucky",
        "correct_answers": [
            9,
            "Wolf"
        ],
        "question_names": [
            "What is 3*3",
            "What is Ryan's last name?"
        ]
    },
    {
        "_id": "5f2f4feb0c40c90887a495c0",
        "exam_id": "5f2f1e595982a2cd57b831a5",
        "student_id": "5f3013cb0c40c90887be1f0c",
        "teacher_id": "5f3018874620ca4ab2b7a49e",
        "answers": [
            8,
            "Wolf"
        ],
        "points": 20,
        "times": [
            10.4,
            54
        ],
        "student_name": "Bucky",
        "correct_answers": [
            9,
            "Wolf"
        ],
        "question_names": [
            "What is 3*3",
            "What is Ryan's last name?"
        ]
    }
]
```

### GET /stats/students
#### Purpose
Retrieves all the stats of the teacher's students
#### Usage
No body needed. We take the teacher's zoom ID when the teacher makes an account as the request
#### Response
An array of JSONs containing stats for all students of a specific teacher

#### Example response
```JSON
[
    {
        "_id": "5f2f26cb0c40c908879e6590",
        "exam_id": "5f2f1e595982a2cd57b831a5",
        "student_id": "5f3013cb0c40c90887be1f0c",
        "teacher_id": "5f3018874620ca4ab2b7a49e",
        "answers": [
            9,
            "Liu"
        ],
        "points": 30,
        "times": [
            5.4,
            10
        ],
        "student_name": "Bucky",
        "correct_answers": [
            9,
            "Wolf"
        ],
        "question_names": [
            "What is 3*3",
            "What is Ryan's last name?"
        ]
    },
    {
        "_id": "5f3026a20c40c90887c0aae1",
        "exam_id": "5f2f4270247649b5ed3a8b23",
        "student_id": "5f3013cb0c40c90887be1f0c",
        "answers": [
            "Wolf"
        ],
        "points": 60,
        "teacher_id": "5f3018874620ca4ab2b7a49e",
        "times": [
            54
        ],
        "student_name": "Bucky",
        "correct_answers": [
            9,
            "Wolf"
        ],
        "question_names": [
            "What is 3*3",
            "What is Ryan's last name?"
        ]
    }
]
```


    
