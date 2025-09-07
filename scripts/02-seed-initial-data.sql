-- Seed initial data for CivicConnect

-- Insert default departments
INSERT INTO departments (name, description, contact_email, contact_phone) VALUES
('Public Works', 'Roads, sidewalks, street maintenance', 'publicworks@city.gov', '555-0101'),
('Water & Sewer', 'Water supply, sewage, drainage systems', 'water@city.gov', '555-0102'),
('Parks & Recreation', 'Parks, playgrounds, recreational facilities', 'parks@city.gov', '555-0103'),
('Traffic & Transportation', 'Traffic lights, signs, parking', 'traffic@city.gov', '555-0104'),
('Environmental Services', 'Waste management, recycling, environmental issues', 'environment@city.gov', '555-0105'),
('Code Enforcement', 'Building codes, zoning, property maintenance', 'codes@city.gov', '555-0106');

-- Insert issue categories
INSERT INTO issue_categories (name, description, department_id, priority_level, estimated_resolution_days) 
SELECT 
    category_name,
    category_desc,
    d.id,
    priority,
    days
FROM (VALUES
    ('Pothole', 'Road surface damage requiring repair', 'Public Works', 3, 5),
    ('Broken Streetlight', 'Non-functioning street lighting', 'Public Works', 2, 3),
    ('Water Main Break', 'Broken or leaking water pipes', 'Water & Sewer', 5, 1),
    ('Sewer Backup', 'Sewage overflow or backup issues', 'Water & Sewer', 4, 2),
    ('Damaged Playground', 'Broken or unsafe playground equipment', 'Parks & Recreation', 4, 7),
    ('Graffiti', 'Vandalism requiring cleanup', 'Parks & Recreation', 2, 3),
    ('Traffic Light Malfunction', 'Non-working or incorrectly functioning traffic signals', 'Traffic & Transportation', 5, 1),
    ('Illegal Parking', 'Vehicles parked in violation of regulations', 'Traffic & Transportation', 2, 1),
    ('Overflowing Trash', 'Public waste containers that need emptying', 'Environmental Services', 3, 2),
    ('Illegal Dumping', 'Improperly disposed waste or debris', 'Environmental Services', 3, 5),
    ('Building Code Violation', 'Structures not meeting safety or zoning requirements', 'Code Enforcement', 3, 14),
    ('Noise Complaint', 'Excessive noise disturbances', 'Code Enforcement', 2, 3)
) AS categories(category_name, category_desc, dept_name, priority, days)
JOIN departments d ON d.name = categories.dept_name;

-- Create a default admin user (password: admin123)
INSERT INTO users (email, password_hash, first_name, last_name, role, is_verified) VALUES
('admin@city.gov', '$2b$10$rQZ9QmjytWzQgwjvHBVzUeQqM8gE.KvY8P8mF2nF8qF8qF8qF8qF8O', 'System', 'Administrator', 'admin', TRUE);

-- Create sample department heads
INSERT INTO users (email, password_hash, first_name, last_name, role, is_verified) VALUES
('publicworks@city.gov', '$2b$10$rQZ9QmjytWzQgwjvHBVzUeQqM8gE.KvY8P8mF2nF8qF8qF8qF8qF8O', 'John', 'Smith', 'department_head', TRUE),
('water@city.gov', '$2b$10$rQZ9QmjytWzQgwjvHBVzUeQqM8gE.KvY8P8mF2nF8qF8qF8qF8qF8O', 'Sarah', 'Johnson', 'department_head', TRUE),
('parks@city.gov', '$2b$10$rQZ9QmjytWzQgwjvHBVzUeQqM8gE.KvY8P8mF2nF8qF8qF8qF8qF8O', 'Mike', 'Davis', 'department_head', TRUE);
