import { useState } from 'react';

export function ServiceIdentity({ name, logo }: { name: string; logo?: string }) {
  const [failed, setFailed] = useState(false);
  if (!logo || failed) return <span className="product-name-fallback">{name}</span>;

  return <img className="service-wordmark" src={logo} alt={name} onError={() => setFailed(true)} />;
}
