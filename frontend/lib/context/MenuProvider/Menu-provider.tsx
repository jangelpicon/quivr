import { createContext, useEffect, useState } from "react";

import { useDevice } from "@/lib/hooks/useDevice";
import { usePathname } from "next/navigation";

type MenuContextType = {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuContext = createContext<MenuContextType | undefined>(
  undefined
);

export const MenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const { isMobile } = useDevice();
  const [isOpened, setIsOpened] = useState(false);
  const pathname = usePathname()

  useEffect(() => {
      setIsOpened(!isMobile && !["/search", "/"].includes(pathname!));
  }, [isMobile]);

  return (
    <MenuContext.Provider
      value={{
        isOpened,
        setIsOpened,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};