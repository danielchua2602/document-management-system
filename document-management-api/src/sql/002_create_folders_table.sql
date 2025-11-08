CREATE TABLE folders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    documentId INT NOT NULL,

    -- Folder properties
    title VARCHAR(255) NOT NULL,
    
    FOREIGN KEY (documentId) REFERENCES documents(id) ON DELETE CASCADE
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;