export type TabId = 'cybernetics' | 'linguistics' | 'burroughs' | 'experiments' | 'beliefs' | 'rfc';

export interface CyberneticPillar {
  id: string;
  title: string;
  subtitle: string;
  formula: string;
  historicalContext: string;
  desc: string;
  implication: string;
  simulationHint: string;
}

export interface BurroughsConcept {
  id: string;
  tag: string;
  title: string;
  quote: string;
  source: string;
  mechanism: string;
  body: string;
  cyberConnection: string;
}

export interface ViralPacket {
  id: string;
  name: string;
  category: string;
  primaryText: string;
  secondaryText: string;
  description: string;
}

export interface CyberneticBelief {
  id: string;
  dogma: string;
  wienerOrthodoxy: string;
  philosophicalImplication: string;
  burroughsCounterpoint: string;
  historicalOrigin: string;
  modernManifestation: string;
}

export type ExperimentGroupId = 
  | 'language-virus'
  | 'feedback-servos'
  | 'ashby-homeostat'
  | 'entropy-information'
  | 'second-order';

export interface ExperimentMetadata {
  id: string;
  groupId: ExperimentGroupId;
  groupTitle: string;
  title: string;
  subtitle: string;
  authorReference: string;
  epistemology: string;
  iconName: string;
}
