import {getStatsByExam, getStatsForAllStudents} from "./link.js"


export async function calculateStats() {
    const stats_jsons = await getStatsByExam()

    let times = []
    let answers = []
    let student_with_least_points = 1000
    let longest_time = 0
    let student_longest_time_on_exam

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

    })

    let average_time_for_exam = 0

    for (let time of times) {
        average_time_for_exam += time
    }

    average_time_for_exam /= times.length

    console.log(average_time_for_exam)
    console.log(student_longest_time_on_exam)

    let most_missed;




    const stats = {
        average_time_for_exam: average_time_for_exam,
        student_longest_time_on_exam: student_longest_time_on_exam,
        student_with_least_points: student_with_least_points,
    }

    return JSON.stringify(stats)
}

