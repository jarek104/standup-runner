export interface StandupData {
  name: string;
  members: StandupMember[];
  current: {
    running: boolean;
    speakerTotalTime: number;
    speaker: StandupMember;
    standupEndTime: number;
    standupStartTime: number;
  };
  // running: boolean;
  // speakerTotalTime: number;
  // speakerName: string;
  // standupEndTime: number;
  // standupStartTime: number;
}

export interface StandupMember {
  id: string;
  name: string;
  totalTime: number;
}

export interface StandupLog {
  name: string;
  totalTime: number;
  logId: string;
}