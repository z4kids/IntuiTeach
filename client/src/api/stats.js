import {getStatsByExam, getStatsForAllStudents} from "./link.js"


export async function calculateStats() {
    const stats_jsons = await getStatsByExam()

    let times = []
    let answers = []
    let student_with_least_points = 1000
    let longest_time = 0
    let student_longest_time_on_exam
    let total_correct = 0
    let correct_answers = []
    let questions = []
    let most_missed_question
    let most_misses = 0

    stats_jsons.forEach(json => {
        for (let question of json.question_names) {
            if (!(questions.includes(question))) {
                questions.push(question)
            }
        }
        for (let time of json.times) {
            times.push(time)
            let average_time = times.reduce((a, b) => a + b, 0)
            if (average_time > longest_time) {
                longest_time = average_time
                student_longest_time_on_exam = json.student_name

            }
        }
        if (json.points < student_with_least_points) {
            student_with_least_points = json.student_name
        }

        for (let correct_answer of json.correct_answers) {
            if (!(correct_answers.includes(correct_answer))) {
                correct_answers.push(correct_answer)
            }
        }
        for (let answer of json.answers) {
            answers.push(answer)
            if (correct_answers.includes(answer)) {
                total_correct += 1
            }
        }

        for (let i = 0; i < questions.length; i ++) {
            let number_times_missed = 0
            if (json.answers[i] != json.correct_answers[i]) {
                number_times_missed += 1

                if (number_times_missed > most_misses) {
                    most_missed_question = json.question_names[i]
                }
            }
        }

    })

    let average_percentage_correct_for_exam  = (total_correct / answers.length) * 100 + "%"
    let average_time_for_exam = 0

    for (let time of times) {
        average_time_for_exam += time
    }

    average_time_for_exam /= times.length
    console.log(times)
    console.log(average_time_for_exam)
    console.log(student_longest_time_on_exam)
    console.log(average_percentage_correct_for_exam)
    console.log(most_missed_question)


    const stats = {
        average_time_for_exam: average_time_for_exam,
        student_longest_time_on_exam: student_longest_time_on_exam,
        student_with_least_points: student_with_least_points,
        average_percentage_correct_for_exam: average_percentage_correct_for_exam,
        most_missed_question: most_missed_question  
    }

    return JSON.stringify(stats)
}

