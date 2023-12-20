interface SpaceCardProps {
  space: any
}

export const SpaceCard: React.FC<SpaceCardProps> = ({ space }) => {
  return (
    <div className="border-2 rounded-lg border-blue-500 p-2">
      <h4>{space.name}</h4>
      <p>Capacity: {space.capacity}</p>
      <p>{space.description}</p>
      <p>{space.spaceType[0].name}</p>
    </div>
  )
}