export default function InitialsAvatar({
  name,
  size = "s",
  color = "gray",
}: {
  name: string;
  size?: "s" | "m";
  color?: "blue" | "gray";
}) {
  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClasses = {
    s: "w-8 h-8 text-xs",
    m: "w-10 h-10 text-sm",
  };

  const colorClasses = {
    blue: "bg-blue-500",
    gray: "bg-gray-500",
  };

  return (
    <div
      className={`rounded-full flex items-center justify-center text-white font-medium ${sizeClasses[size]} ${colorClasses[color]}`}
    >
      {getInitials(name)}
    </div>
  );
}
