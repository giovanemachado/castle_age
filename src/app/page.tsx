"use client";
import Map from "./map/map";

export default function Home() {
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Castle Age</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <a>.</a>
                        </li>
                        {/* <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2 bg-base-100 rounded-t-none">
                                    <li>
                                        <a>Link 1</a>
                                    </li>
                                    <li>
                                        <a>Link 2</a>
                                    </li>
                                </ul>
                            </details>
                        </li> */}
                    </ul>
                </div>
            </div>
            <div className="h-screen w-full flex justify-center">
                <Map />
            </div>
        </>
    );
}
