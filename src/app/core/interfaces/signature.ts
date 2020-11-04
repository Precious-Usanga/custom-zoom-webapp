export interface ISignature {
  meetingNumber: number;
  apiKey: string;
  apiSecret: string;
  role: number;
}

export interface IMeeting {
  meeting_id: number;
  meeting_pswd: string;
  user_email: string;
  username: string;
  role: number;
}

export interface IMeetingInit {
  leaveUrl: string;
  apiKey: string;
  signature: string;
}

export interface IMeetingConstants {
  apiKey: string;
  apiSecret: string;
}
