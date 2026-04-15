# Lab 10 Demo Manual (shop-back)

## What Was Implemented

- Level 2 (FBV): `api/views/fbv.py`
- Level 3 (CBV): `api/views/cbv.py`
- Level 4 (Mixins): `api/views/mixins.py`
- Level 5 (Generics): `api/views/generics.py`
- Active level selector: `api/views/__init__.py` (currently imports from `generics.py`)
- API routes: `api/urls.py`

## Requirement Checklist

- [x] `fbv.py` created with `products_list` and `product_detail`
- [x] `cbv.py` created with `ProductListAPIView`, `ProductDetailAPIView`, and `get_object(product_id)`
- [x] `mixins.py` created with DRF mixins and `lookup_url_kwarg = 'product_id'`
- [x] `generics.py` created with Product + Category endpoints and `/categories/<id>/products/`
- [x] `api/views/__init__.py` imports from `generics.py` (Level 5 active)
- [x] Endpoints keep same CRUD contract

## Run Instructions

1. Open terminal in project folder:
   - `cd Lab4\\task2\\online-store`
2. Activate venv:
   - `venv\\Scripts\\activate`
3. Run backend:
   - `python manage.py runserver`
4. Base URL:
   - `http://127.0.0.1:8000/api/`

## Endpoints To Demonstrate

### Products

- `GET /api/products/`
- `POST /api/products/`
- `GET /api/products/<product_id>/`
- `PUT /api/products/<product_id>/`
- `DELETE /api/products/<product_id>/`

### Categories

- `GET /api/categories/`
- `POST /api/categories/`
- `GET /api/categories/<category_id>/`
- `PUT /api/categories/<category_id>/`
- `DELETE /api/categories/<category_id>/`
- `GET /api/categories/<category_id>/products/`

## Postman Demo Flow

Use collection file:

- `OnlineShopAPI.postman_collection.json`

Recommended order:

1. Get all categories
2. Get all products
3. Create category
4. Create product (attach to created category)
5. Get product by id
6. Update product
7. Get products by category
8. Delete product
9. Delete category

For `POST`/`PUT`, set Body to `raw` + `JSON`.

## Quick Technical Notes

- Current active implementation is Level 5 (generics).
- To switch level, edit imports in `api/views/__init__.py`.
- URL parameters are explicit:
  - `product_id` for product detail routes
  - `category_id` for category detail/product-list-by-category routes
