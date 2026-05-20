interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  center = true,
}: Props) {
  return (
    <div
      className={`mb-12 ${
        center ? "text-center mx-auto" : ""
      } max-w-2xl`}
    >
      <h2 className="text-display-md mb-4">{title}</h2>
      {subtitle && (
        <p className="text-body-md text-brand-gray-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
}
