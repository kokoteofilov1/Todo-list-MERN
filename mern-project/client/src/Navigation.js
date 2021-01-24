import React from "react";
import {Link} from "react-router-dom";

function Navigation() {

    return (
        <div>
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <p className="px-3 py-2 rounded-md text-lg font-medium text-gray-300 ">Your ToDo list:</p>
                                    <Link to={'/Create'}
                                          className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 hover:text-white hover:bg-gray-700">Create
                                        ToDo</Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <a href="#"
                               className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 hover:text-white hover:bg-gray-700">Sign
                                out</a>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navigation;