
-- EXAMPLE: Add new paintings to the artworks table 
-- (Update this as needed with your actual data — update the image urls, titles, price, description, etc)

INSERT INTO public.artworks 
  (title, image_url, price, description, collection_name, created_year, size_category, dominant_colors, mood_tags, technique)
VALUES
  ('Blossom Harmony', 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb', 8500, 'Delicate pinks and blues evoke a tranquil spring dusk.', 'Dreamscapes', 2023, 'medium', ARRAY['#d9cfcf', '#7aa9dc'], ARRAY['Tranquil', 'Dreamy'], 'Oil on Canvas'),
  ('Golden Muse', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', 12000, 'Golden light and rich strokes illuminate quiet confidence.', 'Cultural Chronicles', 2024, 'large', ARRAY['#fdebb3', '#dab367'], ARRAY['Radiant', 'Hopeful'], 'Mixed Media'),
  ('Urban Poetry', 'https://images.unsplash.com/photo-1582562124811-c09040d0a901', 15500, 'A vivid meditation on city rhythms and solitude.', 'Abstract Expressions', 2022, 'medium', ARRAY['#5e8597', '#dedede'], ARRAY['Reflective', 'Modern'], 'Acrylic'),
  ('Whispered Rains', 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07', 8900, 'A monsoon memory, carried in mist and grey-blue washes.', 'Intimate Moments', 2021, 'small', ARRAY['#a5b8e9', '#d8dde4'], ARRAY['Nostalgic', 'Gentle'], 'Watercolor');

-- Add, update, or delete rows as needed to reflect your new collection.
