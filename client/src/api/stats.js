import {getStatsByExam, getStatsForAllStudents} from "./link.js"


export async function calculateStats() {
    const stats_jsons = await getStatsByExam("5f2f1e595982a2cd57b831a5")

    let times = []
    let answers = []
    let student_with_least_points = 1000
    let longest_time = 0
    let student_longest_time_on_exam
    let total_correct = 0
    let correct_answers = []

    stats_jsons.forEach(json => {
        for (let time of json.times) {
            times.push(time)
            if (time > longest_time) {
                longest_time = time
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

    })
    console.log(answers)
    console.log(correct_answers)
    let average_percentage_correct_for_exam  = (total_correct / answers.length) * 100 + "%"
    let average_time_for_exam = 0

    for (let time of times) {
        average_time_for_exam += time
    }

    average_time_for_exam /= times.length

    console.log(average_time_for_exam)
    console.log(student_longest_time_on_exam)
    console.log(average_percentage_correct_for_exam)


    const stats = {
        average_time_for_exam: average_time_for_exam,
        student_longest_time_on_exam: student_longest_time_on_exam,
        student_with_least_points: student_with_least_points,
    }

    //return JSON.stringify(stats)
}

