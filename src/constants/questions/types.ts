export interface QuestionOption {
  id: string;
  text: string;
  traits: string[];
}

export interface Question {
  id: string;
  scenario: string;
  options: QuestionOption[];
}

export type StreamType = 'pcm' | 'pcb' | 'pcmb' | 'commerce' | 'arts';
