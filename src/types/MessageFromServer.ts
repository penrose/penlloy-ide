export type DomainAndSubstanceMessage = {
  kind: "DomainAndSubstance";
  domain: string;
  substance: string;
};

export type ConfigMessage = {
  kind: "Config";
  isTrace: boolean;
};

//add new type, either DomainAndSubstanceMessage or ConfigMessage
export type ServerMessage = DomainAndSubstanceMessage | ConfigMessage;
