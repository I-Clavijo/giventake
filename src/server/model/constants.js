export const MODEL_KEY = {
  User: 'User',
  Post: 'Post',
  ReportedPost: 'ReportedPost'
};


export const REPORTS_REASONS = {
  SPAM: 'This post contains spam',
  INAPPROPRIATE_CONTENT: 'This post contains inappropriate content',
  OFFENSIVE_LANGUAGE: 'This post contains offensive language',
  COPYRIGHT_VIOLATION: 'This post violates copyright',
  FALSE_INFORMATION: 'This post contains false information',
  PERSONAL_ATTACK: 'This post contains a personal attack',
  OTHER: 'Other reason (please specify)'
};

export const REPORTS_KEYS = Object.keys(REPORTS_REASONS);