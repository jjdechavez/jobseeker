import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SigninPage() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>

      <main className="container max-w-md min-h-min flex flex-col items-center justify-center mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Start the Job Hunt</CardTitle>
            <CardDescription>
              Dynamic job hunt: Refine skills, craft a compelling resume, and
              unlock fulfilling opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a
                href={`${
                  import.meta.env.VITE_APP_API_URL
                }/auth/github/authorize`}
                rel="noreferrer"
              >
                Sign in with Github
              </a>
            </Button>
          </CardContent>
        </Card>
      </main>
    </ThemeProvider>
  );
}
