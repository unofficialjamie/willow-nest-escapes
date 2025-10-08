-- Remove duplicate locations_grid section that's not being used by the frontend
DELETE FROM page_sections 
WHERE page_name = 'locations' 
AND section_key = 'locations_grid';