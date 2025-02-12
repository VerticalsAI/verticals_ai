import { Button } from "@/components/ui";
import { useLogin } from "@/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import StarterButton from "./starter-button";

const StarterButtons = () => {
  const { user } = useLogin();
  const isEvm = user?.wallet?.chainType === "ethereum";
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
      prompt: "Find the best stablecoin yields" + (isEvm ? " on sei" : ""),
    },
    {
      title: "Analyze my portfolio",
      description: "Swap on Kamino",
      icon: "/icons/atom.svg",
      prompt: "show my portfolio" + (isEvm ? " on sei" : ""),
    },
    {
      title: "Swap",
      description: `Swap on ${isEvm ? "Symphony" : "Kamino"}`,
      icon: "/icons/atom.svg",
      prompt: `Swap on ${isEvm ? "Symphony" : "Kamino"}`,
    },
    // {
    //   title: "Bridge funds",
    //   description: "Get developer docs for protocols",
    //   icon: "/icons/Cardholder.svg",
    //   prompt: "Bridge funds",
    // },
  ] as const;
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
