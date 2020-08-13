import {getStatsByExam, getStatsForAllStudents} from "./link.js"


export async function calculateStats() {
    const stats_jsons = await getStatsByExam("5f2f1e595982a2cd57b831a5");
    console.log(stats_jsons)

    let times = []
    let answers = []
    let student_with_least_points = 1000

    stats_jsons.forEach(json => {
        for (let time of json.times) {
            times.push(time)
        }

        for (let answer of json.answers) {
            answers.push(answer)
        }
        if (json.points < student_with_least_points) {
            student_with_least_points = json.student_id
        }
    })

    console.log(times)
    console.log(answers)
    console.log(student_with_least_points)

    let average_time_for_exam = 0

    for (let time of times) {
        average_time_for_exam += time
    }

    average_time_for_exam /= times.length

    console.log(average_time_for_exam)

    let most_missed;




    const stats = {
        average_time_for_exam: average_time_for_exam,

    }
}

