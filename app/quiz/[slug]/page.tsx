import Params from "@/lib/constants/Params"

export default function QuizSlug({params}: Params) {
    return <h1 className="text-white">/quiz/{params.slug}</h1>
}