export interface EventCardProps {
  eventList: {
    name: string
    displayName: string
    icon?: React.ReactNode
    url: string
    openingTime: Date
    closingTime: Date
  }[]
}
