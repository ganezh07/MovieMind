type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-3">
        <span className="h-7 w-1 rounded-full bg-accent" />
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{description}</p>
    </header>
  );
}
