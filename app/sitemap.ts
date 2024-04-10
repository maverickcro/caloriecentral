import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.calorie-pal.com",
      lastModified: new Date(),
    },
    {
      url: "https://www.calorie-pal.com/calculators",
      lastModified: new Date(),
    },
    {
      url: "https://www.calorie-pal.com/carbs-calculator",
      lastModified: new Date(),
    },
    {
      url: "https://www.calorie-pal.com/protein-calculator",
      lastModified: new Date(),
    },
    {
      url: "https://www.calorie-pal.com/sugar-calculator",
      lastModified: new Date(),
    },
    {
      url: "https://www.calorie-pal.com/subway-calculator",
      lastModified: new Date(),
    },
    {
      url: "https://www.calorie-pal.com/tdee-calculator",
      lastModified: new Date(),
    },
    {
      url: "https://www.calorie-pal.com/calorie-deficit-calculator",
      lastModified: new Date(),
    },
    {
      url: "https://www.calorie-pal.com/fasting-calculator",
      lastModified: new Date(),
    },
    {
      url: "https://www.calorie-pal.com/body-recomposition-calculator",
      lastModified: new Date(),
    },
    {
      url: "https://www.calorie-pal.com/fat-calculator",
      lastModified: new Date(),
    },
    {
      url: "https://www.calorie-pal.com/anorexic-calculator",
      lastModified: new Date(),
    },
  ];
}
