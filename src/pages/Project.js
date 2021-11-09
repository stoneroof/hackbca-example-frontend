import { useParams } from "react-router"

export function Project() {
    const { id } = useParams();

    return (
        <div>
            <p>Project {id}</p>
        </div>
    )
}