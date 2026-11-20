import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/app/providers/store";

function Providers({ children }: { children: ReactNode }) {
  const [store] = useState(makeStore);
  return <Provider store={store}>{children}</Provider>;
}

export default Providers;
