import { Card, CardContent } from "@/components/ui/card";
import { categories } from "../data";

export default function Categories() {
  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen min-w-screen px-15">
      <h1 className="text-white text-6xl pt-10">Categories</h1>
      <p className="text-xl text-gray-400 py-5">Browse tools by category</p>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 gap-y-15 sm:grid-cols-2">
        {categories.map((cat, key) => (
          <Card
            key={key}
            className="max-w-2xs bg-[#182138] border-none transition-transform duration-300 hover:scale-105"
          >
            <CardContent>
              <div className="text-center rounded  bg-gray-400">
                <img src={cat.img} alt={cat.name} className="w-fit min-h-25" />
              </div>
              <div className="text-center">
                <h1 className="text-2xl text-white">{cat.name}</h1>
                <p className="text-gray-400 text-xl">{cat.ntools} tools</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}