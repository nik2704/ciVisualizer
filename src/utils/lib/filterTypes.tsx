import { NodeGraph, LinkGraph } from "components/UIControl/lib/graphTypes";

export type Predicate<T> = (item: T) => boolean;

export type DisplayCondition<T> = {
  name: string;
  area: string;
  condition: Predicate<T>;
};

export type LineFilter<T> = DisplayCondition<T>[];

export type Filters = {
  nodeFilters: LineFilter<NodeGraph>;
  linkFilters: LineFilter<LinkGraph>;
};
