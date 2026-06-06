
BEGIN;

-- TRUNCATE TABLE
--   public.order_items,
--   public.orders,
--   public.cart_items,
--   public.wishlists,
--   public.reviews,
--   public.product_images,
--   public.products,
--   public.categories_relations,
--   public.categories,
--   public.brands,
--   public.addresses,
--   public.account,
--   public.session,
--   public.verification,
--   -- public."user"
-- RESTART IDENTITY CASCADE;

-- INSERT INTO public."user"
-- (id,name,email,"emailVerified","createdAt","updatedAt",username,"displayUsername",role,"phoneNumber","isActive","lastName")
-- VALUES
-- ('Ec5T7kkFCzk03TmcgJEYlZLptoL88kUD','Ali','ali@example.com',true,NOW(),NOW(),'ali','Ali','customer','09120000000',true,'Ahmadi');

-- INSERT INTO public.account
-- (id,"accountId","providerId","userId","createdAt","updatedAt")
-- VALUES
-- ('acc_1','google_123','google','if1VgrrT87mN39xFykEqMywthYbGbs4w',NOW(),NOW());

-- INSERT INTO public.session
-- (id,"expiresAt",token,"createdAt","updatedAt","userId")
-- VALUES
-- ('sess_1',NOW()+INTERVAL '30 days','token_123',NOW(),NOW(),'if1VgrrT87mN39xFykEqMywthYbGbs4w');

-- INSERT INTO public.verification
-- (id,identifier,value,"expiresAt","createdAt","updatedAt")
-- VALUES
-- ('ver_1','ali@example.com','123456',NOW()+INTERVAL '1 day',NOW(),NOW());

INSERT INTO public.brands (name,description,logo_url) VALUES
('Apple','Electronics','https://example.com/apple.png'),
('Samsung','Electronics','https://example.com/samsung.png');

INSERT INTO public.categories (name,description,sort_order) VALUES
('Electronics','Electronic devices',1),
('Phones','Mobile phones',2);

-- INSERT INTO public.categories_relations(parent_id,child_id)
-- VALUES (1,2);

INSERT INTO public.products
(name,description,price,compare_at_price,stock_quantity,sku,category_id,brand_id,is_active)
VALUES
('iPhone 16','Apple smartphone',99900,109900,25,'APL-IP16',2,1,true),
('Galaxy S26','Samsung smartphone',89900,99900,30,'SMS-S26',2,2,true);

INSERT INTO public.product_images
(product_id,image_url,sort_order,is_primary)
SELECT id,'https://example.com/iphone.jpg',1,true
FROM public.products WHERE sku='APL-IP16';

INSERT INTO public.product_images
(product_id,image_url,sort_order,is_primary)
SELECT id,'https://example.com/galaxy.jpg',1,true
FROM public.products WHERE sku='SMS-S26';

INSERT INTO public.addresses
(user_id,address,city,state,country,postal_code,is_default,address_type)
VALUES
('if1VgrrT87mN39xFykEqMywthYbGbs4w',
'123 Main St',
'Tehran',
'Tehran',
'Iran',
'1234567890',
true,
'home');

INSERT INTO public.orders
(user_id,subtotal,tax,shipping_cost,total,status,shipping_address_id)
VALUES
('if1VgrrT87mN39xFykEqMywthYbGbs4w',99900,9000,5000,113900,'purchased',1);

INSERT INTO public.order_items(order_id,product_id,quantity)
SELECT 1,id,1
FROM public.products
WHERE sku='APL-IP16';

INSERT INTO public.reviews
(user_id,product_id,rating,title,comment)
SELECT
'if1VgrrT87mN39xFykEqMywthYbGbs4w',
id,
5,
'Excellent',
'Great product'
FROM public.products
WHERE sku='APL-IP16';

INSERT INTO public.cart_items(user_id,product_id,quantity)
SELECT
'if1VgrrT87mN39xFykEqMywthYbGbs4w',
id,
2
FROM public.products
WHERE sku='GALAXY-NOMATCH';

INSERT INTO public.wishlists(user_id,product_id)
SELECT
'if1VgrrT87mN39xFykEqMywthYbGbs4w',
id
FROM public.products
WHERE sku='SMS-S26';

COMMIT;
