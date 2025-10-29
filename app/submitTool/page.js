import Image from "next/image";

export default function About() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-3xl font-bold">Submit Tool</h1>
      <p className="text-lg">Submit your tool details below.</p>
    </div>
  );
}
