"use client"
import { useEffect } from "react";


import { useRouter } from "next/navigation";
import LoginButton from "./_components/login-button";

const Graph = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/chat");
  }, [router]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen pt-16 pb-4">
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <h1 className="text-4xl font-bold text-brand-600">
              Meet VERTICALS AI
            </h1>
            <p className="">Smart AI agents optimizing your stablecoin yields through data-driven strategies and market insights.</p>
            <LoginButton />
          </div>
          {/* <div className="w-full flex-1 max-w-2xl rounded-md border border-neutral-200 dark:border-neutral-700 relative">
            <GraphComponent />
            <BorderBeam />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Graph;
