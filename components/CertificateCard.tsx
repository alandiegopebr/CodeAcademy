export default function CertificateCard({ title, issuedAt }: { title: string; issuedAt: string }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 text-slate-100">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">Issued {issuedAt}</p>
    </div>
  );
}
