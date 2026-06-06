-- =============================================================
-- SEED DATA
-- User ID: O24LG7rERPprWwsYkRx6K6Y5wJJk91gw
-- Skips: user, account, session, verification
-- =============================================================

-- -------------------------------------------------------
-- BRANDS
-- -------------------------------------------------------
INSERT INTO public.brands (name, description, logo_url) VALUES
  ('Nike',        'Athletic footwear and apparel',               'https://cdn.example.com/brands/nike.svg'),
  ('Apple',       'Consumer electronics and software',           'https://cdn.example.com/brands/apple.svg'),
  ('Sony',        'Electronics, gaming, and entertainment',      'https://cdn.example.com/brands/sony.svg'),
  ('Levi''s',     'Iconic American denim and casual wear',       'https://cdn.example.com/brands/levis.svg'),
  ('Samsung',     'Semiconductors and consumer electronics',     'https://cdn.example.com/brands/samsung.svg'),
  ('Adidas',      'Sports clothing and accessories',             'https://cdn.example.com/brands/adidas.svg'),
  ('Bose',        'Premium audio equipment',                     'https://cdn.example.com/brands/bose.svg'),
  ('Patagonia',   'Outdoor apparel and gear',                    'https://cdn.example.com/brands/patagonia.svg');


-- -------------------------------------------------------
-- CATEGORIES  (flat list first, then relations)
-- -------------------------------------------------------
INSERT INTO public.categories (name, description, sort_order, is_active) VALUES
  ('Electronics',         'All electronic devices and accessories',         1,  true),   -- 1
  ('Clothing',            'Apparel for men, women, and kids',               2,  true),   -- 2
  ('Footwear',            'Shoes, boots, and sandals',                      3,  true),   -- 3
  ('Audio',               'Headphones, speakers, and earbuds',              4,  true),   -- 4
  ('Smartphones',         'Mobile phones and accessories',                  5,  true),   -- 5
  ('Laptops & Computers', 'Portable and desktop computing devices',         6,  true),   -- 6
  ('Men''s Clothing',     'Tops, bottoms, and outerwear for men',           7,  true),   -- 7
  ('Women''s Clothing',   'Tops, bottoms, and outerwear for women',         8,  true),   -- 8
  ('Sneakers',            'Casual and athletic sneakers',                   9,  true),   -- 9
  ('Outdoor Gear',        'Hiking, camping, and adventure equipment',       10, true),   -- 10
  ('Gaming',              'Consoles, controllers, and accessories',         11, true);   -- 11

-- Category hierarchy
INSERT INTO public.categories_relations (parent_id, child_id) VALUES
  (1,  4),   -- Electronics → Audio
  (1,  5),   -- Electronics → Smartphones
  (1,  6),   -- Electronics → Laptops & Computers
  (1,  11),  -- Electronics → Gaming
  (2,  7),   -- Clothing → Men's Clothing
  (2,  8),   -- Clothing → Women's Clothing
  (3,  9),   -- Footwear → Sneakers
  (2,  10);  -- Clothing → Outdoor Gear


-- -------------------------------------------------------
-- PRODUCTS
-- -------------------------------------------------------
INSERT INTO public.products
  (name, description, price, compare_at_price, stock_quantity, sku, category_id, brand_id, is_active)
VALUES
  -- Smartphones (cat 5, Apple brand 2, Samsung brand 5)
  ('iPhone 15 Pro',
   'Apple iPhone 15 Pro with A17 Pro chip, titanium design, and pro camera system.',
   99999, 109999, 50, 'APL-IP15P-128', 5, 2, true),

  ('Samsung Galaxy S24 Ultra',
   'Samsung flagship with 200 MP camera, S Pen, and Snapdragon 8 Gen 3.',
   119999, 129999, 40, 'SAM-GS24U-256', 5, 5, true),

  -- Audio (cat 4, Sony brand 3, Bose brand 7)
  ('Sony WH-1000XM5',
   'Industry-leading noise-cancelling wireless headphones with up to 30-hour battery.',
   34999, 39999, 80, 'SNY-WH1000XM5', 4, 3, true),

  ('Bose QuietComfort 45',
   'Legendary noise cancellation with TriPort acoustic architecture and Aware Mode.',
   27999, 32999, 65, 'BSE-QC45-BLK', 4, 7, true),

  -- Laptops (cat 6, Apple brand 2, Samsung brand 5)
  ('MacBook Air M3',
   '15-inch MacBook Air powered by Apple M3 chip, 8 GB RAM, 256 GB SSD.',
   129999, NULL, 30, 'APL-MBA-M3-15', 6, 2, true),

  ('Samsung Galaxy Book4 Pro',
   '14-inch AMOLED laptop with Intel Core Ultra 7, 16 GB RAM, 512 GB SSD.',
   109999, 119999, 25, 'SAM-GB4P-14', 6, 5, true),

  -- Sneakers (cat 9, Nike brand 1, Adidas brand 6)
  ('Nike Air Max 270',
   'Nike''s first lifestyle Air unit, delivering an incredibly light, smooth ride.',
   14999, 16999, 120, 'NKE-AM270-BLK-10', 9, 1, true),

  ('Adidas Ultraboost 23',
   'Responsive running shoe with BOOST midsole and Primeknit upper.',
   17999, 19999, 95, 'ADI-UB23-WHT-10', 9, 6, true),

  -- Men's Clothing (cat 7, Levi's brand 4, Patagonia brand 8)
  ('Levi''s 501 Original Jeans',
   'The original straight-leg jean. Button fly, sits at waist, straight through hip and thigh.',
   5999, 6999, 200, 'LVI-501-IND-32x32', 7, 4, true),

  ('Patagonia Better Sweater Fleece Jacket',
   'Classic-fit fleece with a sweater-like exterior, zip front, and stand-up collar.',
   13999, NULL, 75, 'PAT-BSJ-NAV-M', 8, 8, true),

  -- Women's Clothing (cat 8, Nike brand 1, Adidas brand 6)
  ('Nike Dri-FIT One Luxe Top',
   'Soft, stretchy training top with Dri-FIT technology to help keep you dry and comfortable.',
   4499, 4999, 150, 'NKE-DFOL-PNK-M', 8, 1, true),

  ('Adidas Tiro 23 Track Jacket',
   'Sharp track jacket with climalite fabric and three-stripe design.',
   7999, 8999, 110, 'ADI-TIR23-BLK-M', 8, 6, true),

  -- Gaming (cat 11, Sony brand 3)
  ('Sony PlayStation 5 Controller (DualSense)',
   'Discover a deeper gaming experience with the DualSense wireless controller''s haptic feedback.',
   6999, 7499, 60, 'SNY-DS5-WHT', 11, 3, true),

  -- Outdoor Gear (cat 10, Patagonia brand 8)
  ('Patagonia Torrentshell 3L Rain Jacket',
   'Waterproof, windproof, and breathable shell for unpredictable weather.',
   16999, NULL, 45, 'PAT-TS3L-GRN-L', 10, 8, true);


-- -------------------------------------------------------
-- PRODUCT IMAGES
-- (Fetch product UUIDs by SKU so inserts are order-independent)
-- -------------------------------------------------------
INSERT INTO public.product_images (product_id, image_url, sort_order, is_primary)
SELECT id, 'https://cdn.example.com/products/iphone15pro-front.webp',  1, true  FROM public.products WHERE sku = 'APL-IP15P-128'
UNION ALL
SELECT id, 'https://cdn.example.com/products/iphone15pro-back.webp',   2, false FROM public.products WHERE sku = 'APL-IP15P-128'
UNION ALL
SELECT id, 'https://cdn.example.com/products/galaxys24u-front.webp',   1, true  FROM public.products WHERE sku = 'SAM-GS24U-256'
UNION ALL
SELECT id, 'https://cdn.example.com/products/galaxys24u-side.webp',    2, false FROM public.products WHERE sku = 'SAM-GS24U-256'
UNION ALL
SELECT id, 'https://cdn.example.com/products/sonywh1000xm5-on.webp',   1, true  FROM public.products WHERE sku = 'SNY-WH1000XM5'
UNION ALL
SELECT id, 'https://cdn.example.com/products/sonywh1000xm5-case.webp', 2, false FROM public.products WHERE sku = 'SNY-WH1000XM5'
UNION ALL
SELECT id, 'https://cdn.example.com/products/bosequietcomfort45.webp', 1, true  FROM public.products WHERE sku = 'BSE-QC45-BLK'
UNION ALL
SELECT id, 'https://cdn.example.com/products/macbookairmr3.webp',      1, true  FROM public.products WHERE sku = 'APL-MBA-M3-15'
UNION ALL
SELECT id, 'https://cdn.example.com/products/galaxybook4pro.webp',     1, true  FROM public.products WHERE sku = 'SAM-GB4P-14'
UNION ALL
SELECT id, 'https://cdn.example.com/products/nikeam270-side.webp',     1, true  FROM public.products WHERE sku = 'NKE-AM270-BLK-10'
UNION ALL
SELECT id, 'https://cdn.example.com/products/nikeam270-top.webp',      2, false FROM public.products WHERE sku = 'NKE-AM270-BLK-10'
UNION ALL
SELECT id, 'https://cdn.example.com/products/adidasub23-side.webp',    1, true  FROM public.products WHERE sku = 'ADI-UB23-WHT-10'
UNION ALL
SELECT id, 'https://cdn.example.com/products/levis501.webp',           1, true  FROM public.products WHERE sku = 'LVI-501-IND-32x32'
UNION ALL
SELECT id, 'https://cdn.example.com/products/patagoniasweater.webp',   1, true  FROM public.products WHERE sku = 'PAT-BSJ-NAV-M'
UNION ALL
SELECT id, 'https://cdn.example.com/products/nikedrifit.webp',         1, true  FROM public.products WHERE sku = 'NKE-DFOL-PNK-M'
UNION ALL
SELECT id, 'https://cdn.example.com/products/adidastiro23.webp',       1, true  FROM public.products WHERE sku = 'ADI-TIR23-BLK-M'
UNION ALL
SELECT id, 'https://cdn.example.com/products/dualsense-front.webp',    1, true  FROM public.products WHERE sku = 'SNY-DS5-WHT'
UNION ALL
SELECT id, 'https://cdn.example.com/products/dualsense-back.webp',     2, false FROM public.products WHERE sku = 'SNY-DS5-WHT'
UNION ALL
SELECT id, 'https://cdn.example.com/products/patagoniashell.webp',     1, true  FROM public.products WHERE sku = 'PAT-TS3L-GRN-L';


-- -------------------------------------------------------
-- ADDRESS
-- -------------------------------------------------------
INSERT INTO public.addresses (user_id, address, city, state, country, postal_code, is_default, address_type)
VALUES
  ('O24LG7rERPprWwsYkRx6K6Y5wJJk91gw', '123 Main Street, Apt 4B', 'San Francisco', 'CA', 'US', '94105', true,  'home'),
  ('O24LG7rERPprWwsYkRx6K6Y5wJJk91gw', '456 Market Street',       'San Francisco', 'CA', 'US', '94103', false, 'work');


-- -------------------------------------------------------
-- CART ITEMS
-- -------------------------------------------------------
INSERT INTO public.cart_items (user_id, product_id, quantity)
SELECT 'O24LG7rERPprWwsYkRx6K6Y5wJJk91gw', id, 1 FROM public.products WHERE sku = 'APL-IP15P-128'
UNION ALL
SELECT 'O24LG7rERPprWwsYkRx6K6Y5wJJk91gw', id, 2 FROM public.products WHERE sku = 'NKE-AM270-BLK-10';


-- -------------------------------------------------------
-- WISHLISTS
-- -------------------------------------------------------
INSERT INTO public.wishlists (user_id, product_id)
SELECT 'O24LG7rERPprWwsYkRx6K6Y5wJJk91gw', id FROM public.products WHERE sku = 'SNY-WH1000XM5'
UNION ALL
SELECT 'O24LG7rERPprWwsYkRx6K6Y5wJJk91gw', id FROM public.products WHERE sku = 'APL-MBA-M3-15'
UNION ALL
SELECT 'O24LG7rERPprWwsYkRx6K6Y5wJJk91gw', id FROM public.products WHERE sku = 'PAT-BSJ-NAV-M';


-- -------------------------------------------------------
-- ORDERS  (prices in cents/smallest currency unit)
-- -------------------------------------------------------
INSERT INTO public.orders
  (user_id, subtotal, tax, shipping_cost, total, status, shipping_address_id)
SELECT
  'O24LG7rERPprWwsYkRx6K6Y5wJJk91gw',
  34999,   -- Sony WH-1000XM5
  2975,    -- ~8.5 % tax
  0,       -- free shipping
  37974,
  'delivered',
  a.id
FROM public.addresses a
WHERE a.user_id = 'O24LG7rERPprWwsYkRx6K6Y5wJJk91gw'
  AND a.is_default = true
LIMIT 1;

INSERT INTO public.orders
  (user_id, subtotal, tax, shipping_cost, total, status, shipping_address_id)
SELECT
  'O24LG7rERPprWwsYkRx6K6Y5wJJk91gw',
  22998,   -- 2× Nike AM270
  1955,
  599,
  25552,
  'processing',
  a.id
FROM public.addresses a
WHERE a.user_id = 'O24LG7rERPprWwsYkRx6K6Y5wJJk91gw'
  AND a.is_default = true
LIMIT 1;


-- -------------------------------------------------------
-- ORDER ITEMS
-- -------------------------------------------------------

-- Order 1 → Sony WH-1000XM5
INSERT INTO public.order_items (order_id, product_id, quantity)
SELECT
  o.id,
  p.id,
  1
FROM public.orders o
JOIN public.products p ON p.sku = 'SNY-WH1000XM5'
WHERE o.user_id = 'O24LG7rERPprWwsYkRx6K6Y5wJJk91gw'
  AND o.status  = 'delivered';

-- Order 2 → 2× Nike AM270
INSERT INTO public.order_items (order_id, product_id, quantity)
SELECT
  o.id,
  p.id,
  2
FROM public.orders o
JOIN public.products p ON p.sku = 'NKE-AM270-BLK-10'
WHERE o.user_id = 'O24LG7rERPprWwsYkRx6K6Y5wJJk91gw'
  AND o.status  = 'processing';


-- -------------------------------------------------------
-- REVIEWS  (only for the delivered order per business rule)
-- -------------------------------------------------------
INSERT INTO public.reviews (user_id, product_id, rating, title, comment)
SELECT
  'O24LG7rERPprWwsYkRx6K6Y5wJJk91gw',
  p.id,
  5,
  'Best headphones I''ve ever owned',
  'The noise cancellation is absolutely outstanding. Wore these on a 10-hour flight and arrived refreshed. Battery life is incredible too.'
FROM public.products p
WHERE p.sku = 'SNY-WH1000XM5';