import * as Graph from "@microsoft/microsoft-graph-types";
import { useEffect } from "react";

export interface ILibrarySizeNavigatorProps {
  site: Graph.Site;
}

export default function LibrarySizeNavigator(
  props: ILibrarySizeNavigatorProps
) {
  const { site } = props;
  useEffect(() => {}, [site]);
}
