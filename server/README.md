# API Usage
## Environmental variables
The following environmental variables must be set\
`DB_URI`: A URI to your mongodb\
`ZOOM_CLIENT_ID`,`ZOOM_CLIENT_SECRET`, and `ZOOM_REDIRECT_URI`: The zoom credentials for oauth\
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
    name: "Name of student",
    student_zoom_id: "Student's zoom id", 
    teacher_zoom_id: "Teacher's zoom id (must be registered already)"
}
```
Response:
```
{
    id: "Generated id for student"
}
```
#### Example
something