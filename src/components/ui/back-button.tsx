'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  fallbackHref?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function BackButton({
  fallbackHref = "/",
  className = "",
  children,
  variant = "outline",
  size = "sm"
}: BackButtonProps) {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`w-fit ${className}`}
      onClick={handleGoBack}
    >
      <ArrowLeft className="h-4 w-4" />
      {children || "Quay lại"}
    </Button>
  );
}