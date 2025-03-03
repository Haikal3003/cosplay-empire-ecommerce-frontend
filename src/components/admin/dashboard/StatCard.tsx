type StatCardProps = {
  title: string;
  value: string | number;
};

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="p-4  rounded-lg border bg-white border-slate-200">
      <h2 className="text-sm  font-spaceGrotesk">{title}</h2>
      <p className="text-lg font-semibold mt-2">{value}</p>
    </div>
  );
}
