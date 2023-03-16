export interface EventParticipantCardProps {
    eventId: number;
}

export interface User {
    id: number
    name: string
    number: number
    created_at: number
    updated_at: number
  };

export interface Event {
    id: number
    name: string
    description: string
    max_attendee: number
    start_at: number
    end_at: number
    created_at: number
    updated_at: number
    user: User[]
  };
