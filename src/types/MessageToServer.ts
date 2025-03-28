export type ExploreModelOp =
  | "NewInit"
  | "NewTrace"
  | "NewFork"
  | "StepLeft"
  | "StepRight"
  | "Next";

export type ExploreModelMessage = {
  kind: "ExploreModel";
  operation: ExploreModelOp;
};

export type MessageToServer = ExploreModelMessage;
