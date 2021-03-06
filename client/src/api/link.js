/**
 * Helper function for all requests that just need to return a verification of the status code
 * @param {string} route The route of the API
 * @param {string} method The type of HTTP request
 * @param {Object} body A JSON of the request body
 */
async function modifierRequest(route, method, body) {
    const response = await fetch(`http://localhost:3654${route}`, {
        method,
        credentials: 'include',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(body)
    return await response.json()
}
async function deleteRequest(route, method, body) {
    const response = await fetch(`http://localhost:3654${route}`, {
        method,
        credentials: 'include',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.status === 200
}
/**
 * Creates an exam with the given name
 * @param {string} exam_name 
 * @returns {Object} Object with "id" field for new exam
 */
export async function createExam(exam_name) {
    return await modifierRequest('/teacher/exam', 'POST', {exam_name})
}
/**
 * Deletes the specfied exam
 * @param {string} exam_id The id of the exam to be deleted
 * @returns {boolean} true if the deletion was successful, false if it failed
 */
export async function deleteExam(exam_id) {
    return await deleteRequest('/teacher/exam', 'DELETE', {exam_id})
}
/**
 * Creates a question with configuration options
 * @param {string} prompt The actual question. Example: "How old are you?"
 * @param {string[]} list_of_answers A list of possible answers. Can be empty
 * @param {string} correct_answer The correct answer to the question
 * @param {number} max_time The maximum amound of time a user can spend on the question in seconds.
 * @param {number} points The number of points this question should be worth
 * @param {string} exam_id The unique id of each exam
 * @returns {Object} Object with "id" field for new question
 */
export async function createQuestion(prompt, list_of_answers, correct_answer, max_time, points, exam_id) {
    return await modifierRequest('/teacher/question', 'POST', {prompt, list_of_answers, correct_answer, max_time, points, exam_id})
}
/**
 * Deletes the specfied question
 * @param {string} question_id The id of the question to be deleted
 * @param {string} exam_id The id the question was a part of
 * @returns {boolean} true if the deletion was successful, false if it failed
 */
export async function deleteQuestion(question_id, exam_id) {
    return await deleteRequest('/teacher/question', 'DELETE', {question_id, exam_id})
}
/**
 * Creates a new reward for the teacher
 * @param {string} reward_name The name of the reward
 * @param {number} reward_cost How many points the reward costs
 */
export async function createReward(reward_name, reward_cost, exam_id) {
    return await modifierRequest('/teacher/reward', 'POST', {reward_name, reward_cost, exam_id})
}
export async function getRewards(exam_id) {
    const response = await fetch(`http://localhost:3654/teacher/reward?exam_id=${exam_id}`, {
        credentials: 'include'
    })
    const json = await response.json()
    return json
}
/**
 * Deletes the specfied reward
 * @param {string} reward_id The id of the reward to be deleted
 * @returns {boolean} true if the deletion was successful, false if it failed
 */
export async function deleteReward(reward_id) {
    return await deleteRequest('/teacher/reward', 'DELETE', {reward_id})
}
/**
 * Gets all the exams tied to the teacher that's logged in
 * @returns {Object[]} An array of objects with the fields "id" as a string and "name" as a string
 */
export async function getExams() {
    const response = await fetch('http://localhost:3654/teacher/exam', {
        credentials: 'include'
    })
    const json = await response.json()
    return json
}
/**
 * Gets all the questions for a specific exam
 * @param {string} exam_id The id for the exam
 * @returns {Object[]} A list of all the questions
 */
export async function getQuestions(exam_id) {
    const response = await fetch(`http://localhost:3654/teacher/question?exam_id=${exam_id}`, {
        credentials: 'include',
        //body: {exam_id}
    })
    const json = await response.json()
    return json
}
/**
 * Gets a list of statistics for a specified exam
 * @param {string} exam_id The id of the exam to look at
 * @returns {Object[]} List of statistics
 */
export async function getStatsByExam(exam_id) {
    const response = await fetch(`http://localhost:3654/stats/exam?exam_id=${exam_id}`, {
        credentials: 'include',
        //body: {exam_id}
    })
    const json = await response.json()
    return json
}
/**
 * Gets all the statistics for all the students the teacher has
 * @returns {Object[]} List of statistics
 */
export async function getStatsForAllStudents() {
    const response = await fetch('http://localhost:3654/stats/student', {
        credentials: 'include',
    })
    const json = await response.json()
    return json
}