import Map from "./maps/map";
import Turns from "./turns/turns";

export default async function Home() {
    return (
        <div className="container mx-auto px-2">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="text-xl font-bold">Castle Age</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <a>.</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="w-full flex justify-center">
                <Map />
            </div>

            <Turns />
        </div>
    );
}
