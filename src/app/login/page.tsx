
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/icons/Logo";
import { Headphones, PenSquare } from "lucide-react";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm border-border bg-card text-card-foreground">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline font-bold text-card-foreground">
            HearHere
          </CardTitle>
          <CardDescription>Listen | Create | Earn</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button asChild size="lg" className="h-auto py-4">
            <Link href="/listener/login">
              <div className="flex flex-col items-center">
                <Headphones className="mb-2 h-6 w-6" />
                <span className="font-bold text-lg">I'M A LISTENER</span>
                <span className="font-normal text-sm text-primary-foreground/80">(Listen to Stories)</span>
              </div>
            </Link>
          </Button>

           <Button asChild size="lg" variant="secondary" className="h-auto py-4">
            <Link href="/listener/login">
              <div className="flex flex-col items-center">
                <PenSquare className="mb-2 h-6 w-6" />
                <span className="font-bold text-lg">I'M A CREATOR</span>
                <span className="font-normal text-sm text-secondary-foreground/80">(Upload Stories)</span>
              </div>
            </Link>
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          
          <Button asChild variant="link" className="text-accent font-bold">
            <Link href="/home">Continue as Guest</Link>
          </Button>
        </CardContent>
         <CardFooter className="text-center text-xs text-muted-foreground justify-center px-4">
          <p>
            By continuing, you agree to HearHere's{" "}
            <Link href="#" className="underline hover:text-accent">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline hover:text-accent">
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
