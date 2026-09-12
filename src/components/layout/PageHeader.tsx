type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="font-display text-3xl text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{description}</p>
    </header>
  );
}
