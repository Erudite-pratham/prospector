export interface Calls {
  id: string;
  companyId: string;
  companyName: string;
  stage: string;
  createdAt: string;
  callSummary: string;
  clientRepresentative: {
    name: string;
    title: string;
    department: string;
  };
  consultAddRepresentative: string;
}

export interface CallDetailsInterface {
  id: string;
  companyId: string;
  companyName: string;
  stage: string;
  notesLink: string;
  createdAt: string;
  callSummary: string;
  clientRepresentative: {
    name: string;
    title: string;
    department: string;
  };
  competitorsMentioned: {
    competitorName: string;
    context: string;
    sentiment: string;
  }[];
  clientProblems: {
    problemStatement: string;
    tag: string;
    category: string;
    industryContext: string;
  }[];
  solutionsPitched: {
    solutionDescription: string;
    addressedProblem: string;
    fitLabel: string;
  }[];
  summaryRows: {
    problem: string;
    solutionPitched: string;
    clientObjection: string;
    objectionHandling: string;
    clientReaction: string;
  }[];
  keyTakeaways: string[];
  followUpActions: string[];
  consultAddRepresentative: string;
}
