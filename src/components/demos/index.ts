import DemoA1 from "./tender/DemoA1";
import DemoA2 from "./tender/DemoA2";
import DemoA3 from "./tender/DemoA3";
import DemoB1 from "./knowledge/DemoB1";
import DemoB2 from "./knowledge/DemoB2";
import DemoB3 from "./knowledge/DemoB3";
import DemoC1 from "./coordination/DemoC1";
import DemoC2 from "./coordination/DemoC2";
import DemoC3 from "./coordination/DemoC3";

export const demoMap: Record<string, Record<number, React.ComponentType>> = {
  a: { 0: DemoA1, 1: DemoA2, 2: DemoA3 },
  b: { 0: DemoB1, 1: DemoB2, 2: DemoB3 },
  c: { 0: DemoC1, 1: DemoC2, 2: DemoC3 },
};
