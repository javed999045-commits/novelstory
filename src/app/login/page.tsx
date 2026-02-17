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
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
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
          <CardDescription>Sign in to continue</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Button size="lg" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold">
            <Phone className="mr-2 h-5 w-5" /> Continue with Phone
          </Button>
          <Button size="lg" variant="secondary" className="w-full font-bold">
            <GoogleIcon className="mr-2 h-5 w-5" /> Continue with Google
          </Button>
          <Button size="lg" variant="secondary" className="w-full font-bold">
            <Mail className="mr-2 h-5 w-5" /> Continue with Email
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
            <Link href="#">Explore as Guest</Link>
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
