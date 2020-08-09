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
npm run start
```
## Endpoints
### POST /student/join
#### Purpose
Registers a student to a teacher when a student joins a meeting.
#### Usage
Request body:
```
{
    "name": "Name of student",
    "student_zoom_id": "Student's zoom id", 
    "teacher_zoom_id": "Teacher's zoom id (must be registered already)"
}
```
Response:
```
{
    "id": "Generated id for student"
}
```
#### Example
Request body:
```
{
    "name": "Bucky",
    "student_zoom_id": "3424fs344gfseh46",
    "teacher_zoom_id": "jo2i343oajfdapb"
}
```
Response:
```
{
    "id": "5f3013cb0c40c90887be1f0c"
}
```
### POST /student/submit
#### Purpose
Submits an answer to question for an exam
#### Usage
Request body:
```
{
    "student_id": "Student's internal id",
    "exam_id": "Exam's internal id",
    "teacher_zoom_id": "Teacher's zoom id",
    "question_index": Index of question for the exam,
    "answer": "The answer that the user gave",
    "submit_time": How long it took the user to submit in seconds
}
```
Reponse:
```
{
    "correct": true if the user got the question right
}
```
#### Example
Request body:
```
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
```
{
    "correct": true
}
```
### GET /student/questions
#### Purpose
Gets the list of questions for a specific exam
#### Usage
Request body:
```
{
    "exam_id": "The internal id of the exam"
}
```
Reponse:
```
{
    "questions": [
        {
            "_id": "The internal id of the question",
            "prompt": "The actual question",
            "options": [An array of options],
            "max_time": The maximum amount of time someone can take on the question,
            "points": The number of points a question is worth
        },
    ]
}
```
#### Example
Request body:
```
{
    "exam_id": "5f2f1e595982a2cd57b831a5"
}
```
Reponse:
```
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