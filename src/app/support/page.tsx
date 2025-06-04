import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LifeBuoy, Mail } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 min-h-[calc(100vh-16rem)] flex items-center justify-center">
      <Card className="w-full max-w-2xl shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="text-center bg-card-foreground/5 p-8">
          <LifeBuoy className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-foreground">Support & Contact</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            We're here to help you with StartLinker.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6 text-foreground/90">
          <p className="text-lg leading-relaxed">
            If you have any questions, encounter issues, or need assistance with any feature of StartLinker, please don't hesitate to reach out. Our team is dedicated to providing you with the support you need to make the most of our platform.
          </p>
          <p className="leading-relaxed">
            Currently, the best way to contact us for support is via email. We aim to respond to all inquiries as quickly as possible.
          </p>
          <div className="bg-card p-4 rounded-md border border-border text-center">
            <h4 className="font-semibold text-foreground mb-2">Contact Information</h4>
            <Link href="mailto:startlinker7@gmail.com" className="inline-flex items-center text-primary hover:underline">
              <Mail className="h-5 w-5 mr-2" /> startlinker7@gmail.com
            </Link>
          </div>
           <div className="pt-4 text-center text-muted-foreground text-sm">
            We are working on expanding our support channels, including FAQs and a help center. Thank you for your patience!
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
