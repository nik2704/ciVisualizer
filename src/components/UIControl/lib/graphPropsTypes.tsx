import { ViewMode } from "../ToolBox/lib/toolBoxTypes";
import { GraphConfig } from "./configTypes";
import { IGraphData } from "./graphTypes";

export type UIControlDrawGraphProps = {
    data: IGraphData | null;
    config: GraphConfig;
    onClickNode?: (nodeId: string) => void;
    onClickLink?: (source: string, target: string) => void;
    onClickGraph?: () => void;
    width: number;
    height: number;
    viewMode: ViewMode;
}
