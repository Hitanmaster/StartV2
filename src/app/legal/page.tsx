import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale } from "lucide-react";

export default function LegalPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 min-h-[calc(100vh-16rem)] flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="text-center bg-card-foreground/5 p-8">
          <Scale className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-foreground">Legal Information</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Terms of Service and Other Legal Notices.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6 text-foreground/90">
          <p className="text-lg leading-relaxed">
            Welcome to StartLinker. By accessing or using our platform, you agree to comply with and be bound by our Terms of Service, Privacy Policy, and all applicable laws and regulations.
          </p>
          <p className="leading-relaxed">
            The content on this page, including but not limited to terms and conditions, disclaimers, and intellectual property notices, is currently under development and will be updated comprehensively in the near future.
          </p>
          <p className="leading-relaxed">
            Users are responsible for the content they post and their interactions on the platform. StartLinker reserves the right to remove content or suspend accounts that violate our community guidelines or terms of use.
          </p>
           <div className="pt-4 text-center text-muted-foreground text-sm">
            Please check back soon for the full legal documentation governing the use of StartLinker.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
