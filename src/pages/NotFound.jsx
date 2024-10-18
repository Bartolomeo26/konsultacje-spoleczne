import { Link } from "react-router-dom";

function NotFound()
{
    return <>
        <div className="flex justify-center align-top items-center flex-col">
            <h1>What are you looking for??</h1>
            <Link to=".." relative="path">Back</Link>
        </div>
    </>
}
export default NotFound;