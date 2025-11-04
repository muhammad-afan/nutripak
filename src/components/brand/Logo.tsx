import Image from "next/image";

export default function Logo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/logo.svg"
      alt="NutriPak"
      width={200}
      height={80}
      className={className}
    //   style={{ objectFit: 'contain', width: 'auto', height: '100%' }}
      priority
      unoptimized
    />
  );
}
