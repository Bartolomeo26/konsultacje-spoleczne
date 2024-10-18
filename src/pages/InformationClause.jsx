function InformationClause()
{
    return <>
        <div className="flex flex-col content-center items-center mt-10 bg-slate-200 rounded p-10">
            <h1 className="text-3xl mb-4">Information Clause</h1>
            <ul role="list" className="divide-y divide-gray-100">
                <li className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <p className="text-lg font-semibold leading-6 text-gray-900">Bartolomeo Despensa</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">barca@example.com</p>
                        </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">tel. 123456789</p>
                    </div>
                </li>
                <li className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <p className="text-lg font-semibold leading-6 text-gray-900">Pablo Rudnikez</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">pablo@example.com</p>
                        </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">Co-Founder / CTO</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">tel. 123456789</p>
                    </div>
                </li>

                <li className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <div className="min-w-0 flex-auto">
                            <p className="text-lg font-semibold leading-6 text-gray-900">Pedro Mazuro</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">mazur02.walton@example.com</p>
                        </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">Back-End Developer</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">tel. 123456789</p>
                    </div>
                </li>


            </ul>
        </div>
    </>
}
export default InformationClause;