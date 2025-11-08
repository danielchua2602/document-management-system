CREATE TABLE files (
    id INT AUTO_INCREMENT PRIMARY KEY,

    documentId INT NULL,
    folderId INT NULL,

    -- File properties
    title VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    size INT NOT NULL,
    base64Data LONGTEXT NOT NULL,

    FOREIGN KEY (documentId) REFERENCES documents(id) ON DELETE CASCADE,
    FOREIGN KEY (folderId) REFERENCES folders(id) ON DELETE CASCADE,

    -- it should belong to either a document or a folder, but not both
    CONSTRAINT chk_parent CHECK (
        (documentId IS NOT NULL AND folderId IS NULL) OR 
        (documentId IS NULL AND folderId IS NOT NULL)
    )

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;