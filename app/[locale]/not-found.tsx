import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-9xl font-black text-primary/20">404</h1>
      <h2 className="text-3xl font-bold tracking-tight">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md">
        Sorry, the page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild className="rounded-xl mt-4">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}