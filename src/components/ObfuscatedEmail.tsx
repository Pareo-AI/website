'use client';

import { useEffect, useState } from 'react';

interface Props {
  encoded: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ObfuscatedEmail({ encoded, className, style }: Props) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(atob(encoded));
  }, [encoded]);

  if (!email) return null;

  return (
    <a href={`mailto:${email}`} className={className} style={style}>
      {email}
    </a>
  );
}
