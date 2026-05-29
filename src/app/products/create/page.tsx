"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";

import { Badge } from "@/components/ui/badge";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Upload,
  ImagePlus,
  Package,
  Tag,
  Layers3,
  DollarSign,
  Boxes,
  Search,
  Globe,
  Calendar,
  Star,
  Eye,
  Save,
  Send,
} from "lucide-react";

export default function CreateProductPage() {
  const [featured, setFeatured] =
    React.useState(false);

  const [status, setStatus] =
    React.useState("draft");

  const [images, setImages] =
    React.useState<string[]>([]);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files =
      e.target.files;

    if (!files) return;

    const previews =
      Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );

    setImages(previews);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb]">

      {/* TOP ACTION BAR */}
      <div className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div>

            <h1 className="text-2xl font-bold text-slate-900">
              Create Product
            </h1>

            <p className="text-sm text-slate-500">
              Manage your ecommerce product information
            </p>

          </div>

          <div className="flex items-center gap-3">

            <Button
              variant="outline"
              className="rounded-xl"
            >
              <Save className="mr-2 h-4 w-4" />

              Save Draft
            </Button>

            <Button
              variant="outline"
              className="rounded-xl"
            >
              <Eye className="mr-2 h-4 w-4" />

              Preview
            </Button>

            <Button className="rounded-xl bg-slate-900 hover:bg-slate-800">

              <Send className="mr-2 h-4 w-4" />

              Publish Product

            </Button>

          </div>

        </div>

      </div>

      {/* PAGE */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-3">

        {/* LEFT */}
        <div className="space-y-8 lg:col-span-2">

          {/* PRODUCT INFO */}
          <Card className="rounded-3xl border-0 shadow-sm">

            <CardHeader>

              <CardTitle className="flex items-center gap-2 text-xl">

                <Package className="h-5 w-5 text-slate-500" />

                Product Information

              </CardTitle>

              <CardDescription>
                Basic information about your product
              </CardDescription>

            </CardHeader>

            <CardContent className="space-y-6">

              <div className="space-y-2">

                <Label>
                  Product Name
                </Label>

                <Input
                  placeholder="Premium Headphone"
                  className="h-12 rounded-xl"
                />

              </div>

              <div className="space-y-2">

                <Label>
                  Slug
                </Label>

                <Input
                  placeholder="premium-headphone"
                  className="h-12 rounded-xl"
                />

              </div>

              <div className="space-y-2">

                <Label>
                  Short Description
                </Label>

                <Textarea
                  placeholder="Short product summary..."
                  className="min-h-[100px] rounded-2xl"
                />

              </div>

              <div className="space-y-2">

                <Label>
                  Full Description
                </Label>

                <Textarea
                  placeholder="Write full product details..."
                  className="min-h-[220px] rounded-2xl"
                />

              </div>

            </CardContent>

          </Card>

          {/* PRODUCT MEDIA */}
          <Card className="rounded-3xl border-0 shadow-sm">

            <CardHeader>

              <CardTitle className="flex items-center gap-2 text-xl">

                <ImagePlus className="h-5 w-5 text-slate-500" />

                Product Media

              </CardTitle>

              <CardDescription>
                Upload thumbnail and product gallery images
              </CardDescription>

            </CardHeader>

            <CardContent className="space-y-6">

              {/* THUMBNAIL */}
              <div>

                <Label className="mb-3 block">
                  Thumbnail Upload
                </Label>

                <label className="flex h-52 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:bg-slate-100">

                  <Upload className="mb-4 h-10 w-10 text-slate-400" />

                  <p className="font-medium text-slate-700">
                    Upload Thumbnail
                  </p>

                  <span className="mt-1 text-sm text-slate-500">
                    PNG, JPG, WEBP
                  </span>

                  <input
                    type="file"
                    className="hidden"
                  />

                </label>

              </div>

              {/* MULTIPLE IMAGES */}
              <div>

                <Label className="mb-3 block">
                  Product Gallery
                </Label>

                <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 transition hover:bg-slate-100">

                  <ImagePlus className="mb-3 h-8 w-8 text-slate-400" />

                  <p className="font-medium text-slate-700">
                    Upload Multiple Images
                  </p>

                  <input
                    type="file"
                    multiple
                    onChange={
                      handleImageUpload
                    }
                    className="hidden"
                  />

                </label>

              </div>

              {/* IMAGE PREVIEW */}
              {images.length >
                0 && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                  {images.map(
                    (
                      image,
                      index,
                    ) => (
                      <div
                        key={index}
                        className="overflow-hidden rounded-2xl border bg-white"
                      >

                        <img
                          src={image}
                          alt="preview"
                          className="h-32 w-full object-cover"
                        />

                      </div>
                    ),
                  )}

                </div>
              )}

            </CardContent>

          </Card>

          {/* PRICING */}
          <Card className="rounded-3xl border-0 shadow-sm">

            <CardHeader>

              <CardTitle className="flex items-center gap-2 text-xl">

                <DollarSign className="h-5 w-5 text-slate-500" />

                Pricing

              </CardTitle>

            </CardHeader>

            <CardContent className="grid gap-6 md:grid-cols-3">

              <div className="space-y-2">

                <Label>
                  Regular Price
                </Label>

                <Input
                  type="number"
                  placeholder="$199"
                  className="h-12 rounded-xl"
                />

              </div>

              <div className="space-y-2">

                <Label>
                  Sale Price
                </Label>

                <Input
                  type="number"
                  placeholder="$149"
                  className="h-12 rounded-xl"
                />

              </div>

              <div className="space-y-2">

                <Label>
                  Discount %
                </Label>

                <Input
                  type="number"
                  placeholder="25%"
                  className="h-12 rounded-xl"
                />

              </div>

            </CardContent>

          </Card>

          {/* INVENTORY */}
          <Card className="rounded-3xl border-0 shadow-sm">

            <CardHeader>

              <CardTitle className="flex items-center gap-2 text-xl">

                <Boxes className="h-5 w-5 text-slate-500" />

                Inventory

              </CardTitle>

            </CardHeader>

            <CardContent className="grid gap-6 md:grid-cols-2">

              <div className="space-y-2">

                <Label>
                  SKU
                </Label>

                <Input
                  placeholder="SKU-001"
                  className="h-12 rounded-xl"
                />

              </div>

              <div className="space-y-2">

                <Label>
                  Stock Quantity
                </Label>

                <Input
                  type="number"
                  placeholder="120"
                  className="h-12 rounded-xl"
                />

              </div>

              <div className="space-y-2">

                <Label>
                  Stock Status
                </Label>

                <Select>

                  <SelectTrigger className="h-12 rounded-xl">

                    <SelectValue placeholder="Select status" />

                  </SelectTrigger>

                  <SelectContent>

                    <SelectItem value="in-stock">
                      In Stock
                    </SelectItem>

                    <SelectItem value="out-stock">
                      Out Of Stock
                    </SelectItem>

                    <SelectItem value="pre-order">
                      Pre Order
                    </SelectItem>

                  </SelectContent>

                </Select>

              </div>

              <div className="space-y-2">

                <Label>
                  Low Stock Warning
                </Label>

                <Input
                  type="number"
                  placeholder="5"
                  className="h-12 rounded-xl"
                />

              </div>

            </CardContent>

          </Card>

          {/* ORGANIZATION */}
          <Card className="rounded-3xl border-0 shadow-sm">

            <CardHeader>

              <CardTitle className="flex items-center gap-2 text-xl">

                <Layers3 className="h-5 w-5 text-slate-500" />

                Product Organization

              </CardTitle>

            </CardHeader>

            <CardContent className="grid gap-6 md:grid-cols-2">

              <div className="space-y-2">

                <Label>
                  Category
                </Label>

                <Select>

                  <SelectTrigger className="h-12 rounded-xl">

                    <SelectValue placeholder="Select category" />

                  </SelectTrigger>

                </Select>

              </div>

              <div className="space-y-2">

                <Label>
                  Subcategory
                </Label>

                <Select>

                  <SelectTrigger className="h-12 rounded-xl">

                    <SelectValue placeholder="Select subcategory" />

                  </SelectTrigger>

                </Select>

              </div>

              <div className="space-y-2">

                <Label>
                  Brand
                </Label>

                <Select>

                  <SelectTrigger className="h-12 rounded-xl">

                    <SelectValue placeholder="Select brand" />

                  </SelectTrigger>

                </Select>

              </div>

              <div className="space-y-2">

                <Label>
                  Tags
                </Label>

                <Input
                  placeholder="electronics, audio..."
                  className="h-12 rounded-xl"
                />

              </div>

            </CardContent>

          </Card>

          {/* SEO */}
          <Card className="rounded-3xl border-0 shadow-sm">

            <CardHeader>

              <CardTitle className="flex items-center gap-2 text-xl">

                <Globe className="h-5 w-5 text-slate-500" />

                SEO Settings

              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-6">

              <div className="space-y-2">

                <Label>
                  SEO Title
                </Label>

                <Input
                  placeholder="SEO title"
                  className="h-12 rounded-xl"
                />

              </div>

              <div className="space-y-2">

                <Label>
                  Meta Description
                </Label>

                <Textarea
                  placeholder="Meta description..."
                  className="rounded-2xl"
                />

              </div>

              <div className="space-y-2">

                <Label>
                  Meta Keywords
                </Label>

                <Input
                  placeholder="keyword1, keyword2"
                  className="h-12 rounded-xl"
                />

              </div>

            </CardContent>

          </Card>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* PUBLISH */}
          <Card className="sticky top-28 rounded-3xl border-0 shadow-sm">

            <CardHeader>

              <CardTitle className="text-xl">
                Publish Settings
              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-6">

              {/* STATUS */}
              <div className="space-y-3">

                <Label>
                  Product Status
                </Label>

                <Tabs
                  defaultValue="draft"
                  className="w-full"
                >

                  <TabsList className="grid w-full grid-cols-2 rounded-xl">

                    <TabsTrigger value="draft">
                      Draft
                    </TabsTrigger>

                    <TabsTrigger value="published">
                      Published
                    </TabsTrigger>

                  </TabsList>

                </Tabs>

              </div>

              {/* FEATURED */}
              <div className="flex items-center justify-between rounded-2xl border p-4">

                <div>

                  <p className="font-medium">
                    Featured Product
                  </p>

                  <p className="text-sm text-slate-500">
                    Highlight product on homepage
                  </p>

                </div>

                <Switch
                  checked={featured}
                  onCheckedChange={
                    setFeatured
                  }
                />

              </div>

              {/* SCHEDULE */}
              <div className="space-y-3">

                <Label>
                  Schedule Publish
                </Label>

                <div className="relative">

                  <Calendar className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />

                  <Input
                    type="datetime-local"
                    className="h-12 rounded-xl pl-10"
                  />

                </div>

              </div>

              {/* PRODUCT VISIBILITY */}
              <div className="rounded-2xl bg-slate-50 p-5">

                <div className="mb-4 flex items-center gap-2">

                  <Star className="h-4 w-4 text-amber-500" />

                  <span className="font-semibold">
                    Product Visibility
                  </span>

                </div>

                <div className="space-y-3 text-sm text-slate-600">

                  <div className="flex items-center justify-between">

                    <span>Status</span>

                    <Badge variant="secondary">
                      Draft
                    </Badge>

                  </div>

                  <div className="flex items-center justify-between">

                    <span>SEO Score</span>

                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">

                      Good

                    </Badge>

                  </div>

                </div>

              </div>

            </CardContent>

          </Card>

        </div>

      </div>

    </div>
  );
}
