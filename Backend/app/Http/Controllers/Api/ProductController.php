<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseApiController;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;

class ProductController extends BaseApiController
{
    public function index()
    {
        try {
            $products = Product::all();

            return $this->success(
                ProductResource::collection($products),
                'Products retrieved successfully.'
            );
        } catch (\Throwable $e) {
            return $this->error(
                'Failed to retrieve products.',
                500
            );
        }
    }

    public function store(StoreProductRequest $request)
    {
        try {
            $data = $request->validated();

            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store(
                    'products',
                    'public'
                );
            }

            $product = Product::create($data);

            return $this->success(
                new ProductResource($product),
                'Product created successfully.',
                201
            );
        } catch (\Throwable $e) {
            return $this->error(
                'Failed to create product.',
                500
            );
        }
    }

    public function show(Product $product)
    {
        try {
            return $this->success(
                new ProductResource($product),
                'Product retrieved successfully.'
            );
        } catch (\Throwable $e) {
            return $this->error(
                'Failed to retrieve product.',
                500
            );
        }
    }

    public function update(
        UpdateProductRequest $request,
        Product $product
    ) {
        try {
            $data = $request->validated();

            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store(
                    'products',
                    'public'
                );
            } else {
                unset($data['image']);
            }

            $product->update($data);

            return $this->success(
                new ProductResource($product->fresh()),
                'Product updated successfully.'
            );
        } catch (\Throwable $e) {
            return $this->error(
                'Failed to update product.',
                500
            );
        }
    }

    public function destroy(Product $product)
    {
        try {
            $product->delete();

            return response()->json(null, 204);
        } catch (\Throwable $e) {
            return $this->error(
                'Failed to delete product.',
                500
            );
        }
    }
}
