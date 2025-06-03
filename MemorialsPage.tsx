import React from 'react';

const MemorialsPage: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-4">
                {/* Header */}
                <div className="bg-green-50 p-4 rounded-t-lg flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-800">My Memorials</h1>
                    <div className="text-sm text-gray-600">
                        <span className="mr-2">&lt; Previous</span>
                        <span>Next &gt;</span>
                    </div>
                </div>

                {/* Memorial Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                    {/* Filled Memorial Card (Example) */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src="https://via.placeholder.com/300" alt="Memorial Image" className="w-full h-40 object-cover"/>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">John Doe</h2>
                            <p className="text-sm text-gray-600">Brother</p>
                            <p className="text-sm text-gray-500 mt-2">Jun 15, 2000 - Jan 1, 2025</p>
                            <div className="flex justify-end mt-2">
                                {/* Settings Icon Placeholder */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 002.286 1.47c.13.14.233.296.314.459l.368 1.841a1.155 1.155 0 001.922 1.056l1.8-.9a1.54 1.54 0 012.1.177l1.495 1.495c.103.103.178.216.242.334l1.802.36a1.155 1.155 0 001.056 1.922l-.9 1.8a1.54 1.54 0 01.177 2.1l1.495 1.495c.103.103.216.178.334.242l.36 1.802a1.155 1.155 0 001.922 1.056l1.8-.9a1.54 1.54 0 012.1.177l1.495 1.495c.103.103.216.178.334.242l.36 1.802a1.155 1.155 0 001.922 1.056l-.9 1.8c-.186.372-.309.745-.38 1.17zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Empty Memorial Card */}
                    <div className="bg-white rounded-lg shadow-md p-6 text-center flex flex-col items-center justify-center border-2 border-dashed border-gray-300 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        <p className="mt-2">New Memorial page</p>
                    </div>

                    {/* Repeat Empty Memorial Card for others */}
                    <div className="bg-white rounded-lg shadow-md p-6 text-center flex flex-col items-center justify-center border-2 border-dashed border-gray-300 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        <p className="mt-2">New Memorial page</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-center flex flex-col items-center justify-center border-2 border-dashed border-gray-300 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        <p className="mt-2">New Memorial page</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemorialsPage; 