interface TileProps {
  value: number;
}

export default function Tile({ value }: TileProps) {
  if (value === 0) return <div className="tile"></div>;
  return <div className={`tile tile-${value}`}>{value}</div>;
}
