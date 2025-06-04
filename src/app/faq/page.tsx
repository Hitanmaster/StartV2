import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "What is StartLinker?",
    answer: "StartLinker is a dynamic platform designed to connect entrepreneurs, developers, designers, marketers, and strategists. Our goal is to foster collaboration, help validate startup ideas, build Minimum Viable Products (MVPs), and launch innovative projects by providing a supportive ecosystem and necessary tools."
  },
  {
    question: "How do I create a project on StartLinker?",
    answer: "Once logged in, navigate to your Dashboard or the 'Create Project' page. You'll find a form where you can detail your project idea, specify the skills you're looking for in team members, set project visibility, and add other relevant information. Click 'Create Project' to submit it to the platform."
  },
  {
    question: "How can I find collaborators or co-founders?",
    answer: "You can browse projects listed by other users to see if any align with your skills and interests. Alternatively, when you create your own project, you can specify the roles you're looking to fill. Our platform aims to help you connect with individuals who have complementary skills. (Advanced matchmaking features are planned for future updates)."
  },
  {
    question: "Is StartLinker free to use?",
    answer: "Currently, StartLinker is free for all users to sign up, create profiles, post projects, and browse for collaborations. We may introduce premium features in the future, but core functionalities for connection and collaboration will remain accessible."
  },
  {
    question: "How do I edit my profile?",
    answer: "After logging in, click on your account avatar in the header, then select 'My Profile' from the dropdown menu. On your profile page, you'll find an 'Edit Profile' button. This will take you to a form where you can update your name, title, bio, skills, interests, and social media links."
  },
  {
    question: "What kind of projects can I find or create on StartLinker?",
    answer: "StartLinker is open to a wide range of startup projects across various industries, including technology, healthcare, e-commerce, education, gaming, sustainability, creative arts, social impact, and more. Whether it's a web app, mobile app, hardware product, or a service-based idea, you can share and build it here."
  },
  {
    question: "How does the messaging system work?",
    answer: "StartLinker includes a direct messaging feature allowing users to communicate one-on-one or in group chats related to specific projects. You can access your messages via the mail icon in the header or through your 'My Messages' page. This helps facilitate communication with potential collaborators and team members."
  }
];

export default function FaqPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 min-h-[calc(100vh-16rem)] flex items-center justify-center">
      <Card className="w-full max-w-3xl shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="text-center bg-card-foreground/5 p-8">
          <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-foreground">Frequently Asked Questions</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Find answers to common questions about StartLinker.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index}>
                <AccordionTrigger className="text-lg text-foreground/90 hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
