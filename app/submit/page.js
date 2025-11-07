"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { categories } from "../data";

const schema = yup.object({
  tool: yup.string().required("Tool name is required"),
  github: yup
    .string()
    .matches(
      /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/,
      "Enter a valid GitHub repo URL"
    )
    .required("GitHub URL is required"),
  category: yup.string().required("Please select a category"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
  instructions: yup.string().optional(),
  resources: yup.string().optional(),
});

export default function Submit() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("✅ Form submitted:", data);
    alert("Tool submitted successfully!");
  };

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen">
      <h1 className="text-center text-white text-6xl pt-20">Submit a tool</h1>
      <h5 className="text-center text-gray-400 py-10">
        Help us grow our curated library of cybersecurity tools
      </h5>

      <div className="flex justify-center">
        <Card className="w-full max-w-xl bg-[#182138]">
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2 text-white">
                  <Label htmlFor="tool">Tool name</Label>
                  <Input
                    id="tool"
                    placeholder="e.g. Nmap"
                    {...register("tool")}
                  />
                  {errors.tool && (
                    <p className="text-red-400 text-sm">
                      {errors.tool.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2 text-white">
                  <Label htmlFor="github">GitHub URL</Label>
                  <Input
                    id="github"
                    placeholder="https://github.com/user/repo"
                    {...register("github")}
                  />
                  {errors.github && (
                    <p className="text-red-400 text-sm">
                      {errors.github.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-3 text-white">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue("category", value, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="bg-[#182138] text-white">
                        {categories.map((value, key) => (
                          <SelectItem key={key} value={value.name}>
                            {value.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-red-400 text-sm">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="grid w-full gap-3 text-white">
                  <Label htmlFor="description">Short description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a brief description of the tool"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-red-400 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid w-full gap-3 text-white">
                  <Label htmlFor="instructions">
                    Usage instruction (Optional)
                  </Label>
                  <Textarea
                    id="instructions"
                    placeholder="Provide instructions on how to use the tool"
                    {...register("instructions")}
                  />
                </div>

                <div className="grid w-full gap-3 text-white">
                  <Label htmlFor="resources">
                    Extra resources/links (Optional)
                  </Label>
                  <Textarea
                    id="resources"
                    placeholder="Add any extra resources or links related to the tool"
                    {...register("resources")}
                  />
                </div>

                <CardFooter className="flex-col gap-2 px-0">
                  <Button
                    variant="outline"
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-600"
                    disabled={!isValid}
                  >
                    Submit for review
                  </Button>
                </CardFooter>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}