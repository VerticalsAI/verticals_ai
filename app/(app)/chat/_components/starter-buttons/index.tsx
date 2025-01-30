import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import Image from "next/image";
import StarterButton from "./starter-button";

const starterButtons = [
  //   {
  //     title: "Best stablecoin yield",
  //     description: "Search the trending tokens",
  //     icon: "Coins" as const,
  //     prompt: "Show me the trending tokens",
  //   },
  {
    title: "Best stablecoin yield",
    description: "Stablecoin Yields",
    icon: "/icons/settings.svg",
    prompt: "Find the best stablecoin yields",
  },
  {
    title: "Analyze my portfolio",
    description: "Swap on Jupiter",
    icon: "/icons/atom.svg",
    prompt: "show my portfolio ",
  },
  {
    title: "Swap",
    description: "Swap on Jupiter",
    icon: "/icons/atom.svg",
    prompt: "Swap on Jupiter",
  },
  // {
  //   title: "Bridge funds",
  //   description: "Get developer docs for protocols",
  //   icon: "/icons/Cardholder.svg",
  //   prompt: "Bridge funds",
  // },
] as const;

const StarterButtons = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {starterButtons.map(button => (
        <StarterButton key={button.title} {...button} />
      ))}
      <Button
        className={cn(
          "flex items-center p-3 rounded-xl gap-2 text-sm !border-white/10 h-fit justify-start"
        )}
        variant="outline"
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Image
              src={"/icons/Refresh.svg"}
              alt={"Refresh"}
              width={20}
              height={20}
            />
          </div>
          {/* <p className="text-xs text-neutral-600 dark:text-neutral-400 hidden md:block">
          {description}
        </p> */}
        </div>
      </Button>
    </div>
  );
};

export default StarterButtons;
