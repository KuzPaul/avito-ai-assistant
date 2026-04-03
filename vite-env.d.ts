declare module "*.svg?react" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<"svg"> & { title?: string }
  >;
  export default ReactComponent;
}

declare module "*.svg" {
  import * as React from "react";
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default content;
}
