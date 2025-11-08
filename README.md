# Document Management System

A full-stack document management application with API backend and Next.js frontend.

Current implementation only supports viewing of folders and files, uploading files and folders (Mocked using a form). It also supports basic search functionality on the file and folder tiles, as well as pagination.

## Prerequisites

- Node.js (v18 or higher)
- MySQL database
- npm or yarn package manager

## Setup Guide

### 1. Database Setup

First, create a MySQL database and run the SQL migration files:

```sql
-- Connect to your MySQL instance and create a database
CREATE DATABASE document_management_system;
USE document_management_system;
```

Run the migration scripts in the [scripts](document-management-api/src/sql/) directory to set up the necessary tables. (Run them in order, 1 -> 3)

### 2. Backend API Setup

Navigate to the API directory and configure environment variables:

```bash
cd document-management-api
```

Copy the environment example file and configure your settings:

```bash
cp .env.example .env
```

Edit the [.env.local](document-management-api/.env.local) file with your database credentials and other configuration:

Install dependencies:

```bash
npm install
```

Start the API server:

```bash
npm run dev
```

### 3. Frontend UI Setup

Open a new terminal and navigate to the UI directory:

```bash
cd document-management-ui
```

Copy the environment example file:

```bash
cp .env.example .env.local
```

Edit the [.env.local](document-management-ui/.env.local) file with your API configuration if necessary:

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

### 4. Access the Application

- **Frontend UI**: http://localhost:3000 (default Next.js port)
- **Backend API**: http://localhost:5176 (or your configured port)

### Project Structure

- **document-management-ui/**: Frontend built with Next.js

  - [src/app/](document-management-ui/src/app/): Next.js app router pages
  - [src/components/](document-management-ui/src/components/): React components
  - [src/api/](document-management-ui/src/api/): API integration

- **document-management-api/**: Backend API built with TypeScript

  - [src/sql/](document-management-api/src/sql/): Database migration files
  - [src/controllers/](document-management-api/src/controllers/): API route handlers
  - [src/models/](document-management-api/src/models/): Data models
  - [src/services/](document-management-api/src/services/): Business logic

## Database Schema

The system uses the following database schema with three main tables:

### documents table

Defined in [001_create_documents_table.sql](document-management-api/src/sql/001_create_documents_table.sql):

- **documents**: Main table for storing document and folder information
  - `id`: Auto-incrementing primary key
  - `isFolder`: Boolean flag to distinguish between files and folders
  - `createdBy`: Text field tracking who created the document
  - `createdDate`: Timestamp of document creation (auto-set to current timestamp)
  - `lastModifiedBy`: Text field tracking who last modified the document
  - `lastModifiedDate`: Timestamp of last modification (auto-updated on changes)
  - `isDeleted`: Boolean flag for soft delete functionality (default: FALSE)

### folders table

Defined in [002_create_folders_table.sql](document-management-api/src/sql/002_create_folders_table.sql):

- **folders**: Table for storing folder-specific information
  - `id`: Auto-incrementing primary key
  - `documentId`: Foreign key reference to documents table (NOT NULL)
  - `title`: Folder name/title (VARCHAR 255, NOT NULL)
  - Cascade delete when parent document is deleted

### files table

Defined in [003_create_files_table.sql](document-management-api/src/sql/003_create_files_table.sql):

- **files**: Table for storing file-specific information and content
  - `id`: Auto-incrementing primary key
  - `documentId`: Foreign key reference to documents table (nullable)
  - `folderId`: Foreign key reference to folders table (nullable)
  - `title`: File name/title (VARCHAR 255, NOT NULL)
  - `type`: File MIME type or extension (VARCHAR 100, NOT NULL)
  - `size`: File size in bytes (INT, NOT NULL)
  - `base64Data`: File content encoded as base64 (LONGTEXT, NOT NULL)
  - **Constraint**: Files must belong to either a document OR a folder, but not both
