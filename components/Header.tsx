const navItems = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#perfis", label: "Candidatos e empresas" },
  { href: "#vagas-preview", label: "Vagas" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3" aria-label="JobFlow">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
            JF
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-950">
            JobFlow
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-slate-950"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#vagas-preview"
            className="hidden rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-100 sm:inline-flex"
          >
            Ver vagas
          </a>
          <a
            href="#perfis"
            className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Entrar ou cadastrar
          </a>
        </div>
      </div>
    </header>
  );
}
