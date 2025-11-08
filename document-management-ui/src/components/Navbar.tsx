"use client";

import { useState } from "react";
import InitialsAvatar from "./common/InitialsAvatar";

interface NavbarProps {
  currentUser: string;
  onUserChange: (newUser: string) => void;
}

export default function Navbar({ currentUser, onUserChange }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [tempUserName, setTempUserName] = useState(currentUser);

  const handleUserSave = () => {
    if (tempUserName.trim()) {
      onUserChange(tempUserName.trim());
      setIsEditingUser(false);
      setIsDropdownOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUserSave();
    } else if (e.key === "Escape") {
      setTempUserName(currentUser);
      setIsEditingUser(false);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-900">Document Management System</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 p-2 rounded-lg cursor-pointer"
            >
              <InitialsAvatar name={currentUser} size="s" color="blue" />
              <span className="hidden sm:block text-sm font-medium text-gray-700">{currentUser}</span>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      {isEditingUser ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={tempUserName}
                            onChange={(e) => setTempUserName(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none"
                            placeholder="Enter your name"
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={handleUserSave}
                              className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setTempUserName(currentUser);
                                setIsEditingUser(false);
                              }}
                              className="px-2 py-1 text-xs bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm font-medium text-gray-900">{currentUser}</p>
                          <p className="text-xs text-gray-400">Mock logged in user</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => setIsEditingUser(true)}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Name
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
