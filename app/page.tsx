import Map from "./maps/map";
import Money from "./money/money";
import Turns from "./turns/turns";

export default async function Home() {
    return (
        <div className="h-screen flex flex-col container mx-auto px-2">
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
            <div className="flex overflow-y-auto justify-center">
                <Map />
            </div>
            <div className="flex justify-between">
                <Money />
                <Turns />
            </div>
        </div>
    );
}
