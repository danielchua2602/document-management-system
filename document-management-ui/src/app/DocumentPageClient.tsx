"use client";

import { useState } from "react";
import DocumentTable from "@/components/DocumentTable";
import Navbar from "@/components/Navbar";

export default function DocumentPageClient() {
  // TODO: Can be used to mock login user name
  const [currentUser, setCurrentUser] = useState("John Doe");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentUser={currentUser} onUserChange={setCurrentUser} />
      <div className="max-w-7xl mx-auto py-6 px-6">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
        </div>

        <DocumentTable />
      </div>
    </div>
  );
}
