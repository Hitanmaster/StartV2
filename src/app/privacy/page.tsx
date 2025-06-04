import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Mail } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 min-h-[calc(100vh-16rem)] flex items-center justify-center">
      <Card className="w-full max-w-3xl shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="text-center bg-card-foreground/5 p-8">
          <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-foreground">Privacy Policy</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Last Updated: May 21, 2024 (Placeholder Date)
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6 text-foreground/90">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-primary">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to StartLinker ("we," "us," or "our"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services (collectively, the "Platform"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
             <p className="text-xs text-muted-foreground italic">
              Note: This is a generalized privacy policy template. For a legally binding document, please consult with a legal professional.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-primary">2. Information We Collect</h2>
            <p className="leading-relaxed">We may collect information about you in a variety of ways. The information we may collect on the Platform includes:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>
                <strong>Personally Identifiable Information:</strong> Information such as your name, email address, password (hashed), professional title, biography, skills, interests, and social media links (e.g., LinkedIn, GitHub) that you voluntarily give to us when you register with the Platform or when you choose to participate in various activities related to the Platform, such as creating a profile, posting projects, or sending messages.
              </li>
              <li>
                <strong>Project Information:</strong> Details about startup ideas and projects you submit, including title, description, tags, category, visibility settings, and team requirements.
              </li>
              <li>
                <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Platform, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Platform. (This section is a placeholder and depends on actual tracking implemented).
              </li>
              <li>
                <strong>User Content:</strong> Any content you post to the Platform, such as newsfeed posts, comments, and messages, including any images or media you upload.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-primary">3. How We Use Your Information</h2>
            <p className="leading-relaxed">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Platform to:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Create and manage your account.</li>
              <li>Facilitate connections between users (e.g., founders, co-founders, developers).</li>
              <li>Display your profile and project information to other users.</li>
              <li>Enable user-to-user communications.</li>
              <li>Send you administrative emails, such as account confirmations or updates to our policies.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Platform.</li>
              <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
              <li>(Placeholder) Personalize your experience and offer content or features that match your interests.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-primary">4. Disclosure of Your Information</h2>
            <p className="leading-relaxed">We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>
                <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
              </li>
              <li>
                <strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance. (This section is a placeholder and depends on actual third-party services used).
              </li>
              <li>
                <strong>Other Users:</strong> Your profile information, project details (if public), and any content you post will be visible to other users of the Platform as intended by the Platform's functionality.
              </li>
            </ul>
          </section>
          
          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-primary">5. Data Security</h2>
            <p className="leading-relaxed">
             We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-primary">6. Your Rights and Choices</h2>
            <p className="leading-relaxed">
              You may at any time review or change the information in your account or terminate your account by logging into your account settings and updating your account, or by contacting us using the contact information provided below. Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Service and/or comply with legal requirements.
            </p>
          </section>

           <section className="space-y-2">
            <h2 className="text-xl font-semibold text-primary">7. Changes to This Privacy Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold text-primary">8. Contact Us</h2>
            <p className="leading-relaxed">
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-card p-3 rounded-md border border-border">
              <Link href="mailto:startlinker7@gmail.com" className="inline-flex items-center text-primary hover:underline">
                <Mail className="h-5 w-5 mr-2" /> startlinker7@gmail.com
              </Link>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
