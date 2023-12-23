import {Params} from "@/lib/constants"

export default function EditQuiz({params}: Params) {
    return <h1 className="text-white">/quiz/{params.quizId}/edit</h1>
}