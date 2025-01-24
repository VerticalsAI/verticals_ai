import { useSidebar } from "@/components/ui";
import Image from "next/image";

export const PortfolioBox = () => {
  const {  open } = useSidebar();

  return (
    <div className="w-full p-2 flex flex-col gap-4">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/Cardholder.svg"
            alt="Logo"
            width={open ? 24 : 20}
            height={open ? 24 : 20}
          />
          {open && (
            <h1 className="text-sm font-semibold uppercase">PORTFOLIO</h1>
          )}
        </div>
      </div>
      {open && (
        <div className="flex flex-col gap-[-1px] self-stretch rounded-xl border bg-white/5">
          <div className="flex items-center gap-2.5 self-stretch px-3 py-2">
            <div className="flex flex-col justify-center gap-1 grow">
              <div className="flex items-center gap-1.5 self-stretch">
                <Image
                  src="/icons/safe-square.svg"
                  alt="Logo"
                  width={20}
                  height={20}
                />
                <span className="font-normal text-xs text-[#697c72]">
                  Starting amountz
                </span>
              </div>
              <span className="font-medium text-xs text-white">50.00 SOL</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 self-stretch px-3 py-2 border">
            <div className="flex flex-col justify-center gap-1 grow">
              <div className="flex items-center gap-1 self-stretch">
                <Image
                  src="/icons/diagram-up.svg"
                  alt="Logo"
                  width={20}
                  height={20}
                />
                <span className="font-normal text-xs text-[#697c72]">
                  Net worth
                </span>
              </div>
              <span className="font-medium text-xs">
                51.28 SOL <span className="text-green-500">(2.57%)</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 self-stretch px-3 py-2 ">
            <div className="flex flex-col justify-center gap-1 grow">
              <div className="flex items-center gap-1 self-stretch">
                <Image
                  src="/icons/sale-square.svg"
                  alt="Logo"
                  width={20}
                  height={20}
                />
                <span className="font-normal text-xs text-[#697c72]">
                  Realized Profit
                </span>
              </div>
              <span className="font-medium text-xs">
                1.28 SOL <span className="text-green-500">(2.57%)</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
