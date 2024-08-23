import * as Graph from "@microsoft/microsoft-graph-types";

export interface ISiteStorageBreakdownProps {
  /**
   * the site to get a breakdown for
   */
  site?: Graph.Site;
}

export default function SiteStorageBreakdown(
  props: ISiteStorageBreakdownProps
) {
  const { site } = props;
  if (!site) {
    return <h1>Click on a site to continue.</h1>;
  }
  return <div className="flex flex-col items-center"></div>;
}
