import { useMutation } from "@tanstack/react-query";
import { ConfirmMail } from '../util/fetch';
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
function ConfirmedMail()
{
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: ConfirmMail,
    });
    useEffect(() =>
    {
        mutate({ code });
    }, [])



    return (<>
        {isError ? <div className=" mt-10">
            <h1 className="text-xl text-centre">Something went wrong</h1>

        </div> : <div className="t mt-10">
            <h1 className="text-xl text-centre">You've successfully created an email. Now you can <Link to='/signup'>login</Link>.</h1>
        </div>}

    </>)
}

export default ConfirmedMail;