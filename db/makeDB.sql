DROP SCHEMA resume_site cascade;

-- Instantiate database
CREATE SCHEMA resume_site;

CREATE TABLE resume_site.entries (
	id SERIAL PRIMARY KEY,
    category VARCHAR(255) NOT NULL, 
    date_start DATE NOT NULL,
    date_end DATE,
    title VARCHAR(255) NOT NULL,
    default_location VARCHAR(255)
);

CREATE TABLE resume_site.entry_details (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER,
    detail VARCHAR(255)
);

CREATE TABLE resume_site.entry_locations (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER,
    state_abbr VARCHAR,
    country VARCHAR
);

-- Constraints
ALTER TABLE resume_site.entry_details
    ADD CONSTRAINT fk
    FOREIGN KEY (resume_id)
    REFERENCES resume_site.entries(id)
;

ALTER TABLE resume_site.entry_locations
    ADD CONSTRAINT fk2
    FOREIGN KEY (resume_id)
    REFERENCES resume_site.entries(id)
;

-- Data Entry
INSERT INTO resume_site.entries (id, category, date_start, date_end, title, default_location) VALUES
    (1,  'Education', '2010-01-01', '2012-04-01', 'Pepperdine University', 'Malibu, CA'),
    (2,  'Work', '2010-05-01', '2012-08-01', 'US House of Representatives', 'Washington, DC'),
    (3,  'Work', '2012-05-01', '2014-07-01', 'Teach for America', 'Greenville, MS'),
    (4,  'Work', '2014-07-01', '2014-09-01', 'National Geographic - Ice Cream Expedition', 'Malibu, CA'),
    (5,  'Play', '2014-09-01', '2018-01-01', 'Music', 'SF + OC, CA / New York, NY'),
    (6,  'Work', '2014-12-01', '2015-07-01', 'KIPP Foundation - Reserach & Evaluation', 'San Francisco, CA'),
    (7,  'Work', '2015-07-01', '2018-08-01', 'KIPP Foundation - Insights & Analytics', 'New York, NY'),
    (8,  'Play', '2010-01-01', '2012-04-01', 'Pepperdine University', 'Malibu, CA'),
    (9,  'Play', '2013-11-01', '2014-03-01', 'Delta Center Stage', 'Greenville, MS'),
    (10, 'Education', '2018-08-01', NULL, 'Yale School of Management', 'New Haven, CT'),
    (11, 'Work', '2018-06-01', '2018-09-01', 'Amazon', 'New York, NY')
;

INSERT INTO resume_site.entry_details (resume_id, detail) VALUES
    (1,  'BA Economics, BA Rhetoric'),
    (1,  'Florence, Italy International Program'),
    (2,  'Congressional Intern'),
    (2,  'Rep. John Campbell - California 48th'),
    (3,  'Geometry + Algebra 2 Teacher, Greenville High School'),
    (3,  'Pathway Coordinator, School Leadership Team'),
    (4,  'Educational programs for kids to learn what it means to be an explorer'),
    (4,  'Drove an ice cream truck'),
    (5,  'Songwriting, scoring, arranging, and composition consulting'),
    (5,  'Guitar/Keys for local artists and church worship bands'),
    (6,  'Analysis decks + presentations, grant proposal research'),
    (6,  'Automated reporting, Quantitative Modeling, VBA/SQL Server'),
    (7,  'Business intelligence product lead'),
    (8,  'Program evaluation, internal support, and data strategy'),
    (8,  'Database development'),
    (9,  'Cast member, Les Miserables'),
    (10, 'MBA Candidate'),
    (10, 'Data Analytics Club Founder'),
    (10, 'Tech Club Leader'),
    (11, 'MBA Intern - Sponsored Display Advertising'),
    (11, 'International Expansion')
;

INSERT INTO resume_site.entry_locations (resume_id, state_abbr, country) VALUES
    (1, 'CA', 'USA'),
    (2, 'DC', 'USA'),
    (3, 'MS', 'USA'),
    (4, 'LA', 'USA'),
    (4, 'AL', 'USA'),
    (4, 'GA', 'USA'),
    (4, 'TN', 'USA'),
    (4, 'KY', 'USA'),
    (4, 'IL', 'USA'),
    (5, 'CA', 'USA'),
    (5, 'NY', 'USA'),
    (6, 'CA', 'USA'),
    (7, 'NY', 'USA'),
    (8, 'CA', 'USA'),
    (9, 'MS', 'USA'),
    (10, 'CT', 'USA'),
    (11, 'NY', 'USA')
;
-- reset
