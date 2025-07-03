"use client";

import { login } from "@/lib/auth-actions";
import { useRouter } from "next/navigation";

interface AuthButtonProps {
  isLoggedIn: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function AuthButton({
  isLoggedIn,
  className,
  children,
}: AuthButtonProps) {
  const router = useRouter();

  const handleClick = async () => {
    if (isLoggedIn) {
      router.push("/trips");
    } else {
      await login();
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}