import {redirect} from "next/navigation"
import Params from "@/lib/constants"

export default function RedirectToQuiz({ params }: Params) {
    redirect(`/quiz/${params.quizCode}`)
}