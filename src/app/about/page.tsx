import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 min-h-[calc(100vh-16rem)] flex items-center justify-center">
      <Card className="w-full max-w-3xl shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="text-center bg-card-foreground/5 p-8">
          <Info className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-foreground">About StartLinker</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Connecting Innovators, Building Futures.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6 text-foreground/90">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              StartLinker is a dynamic platform designed to bridge the gap between visionary entrepreneurs and the skilled individuals needed to bring those visions to life. Our mission is to foster a collaborative ecosystem where ideas can flourish, co-founders can connect, and innovative startups can be built from the ground up. We empower individuals to transform their groundbreaking concepts into tangible realities by providing the tools, network, and support necessary for success in the competitive startup landscape.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">Our Vision</h2>
            <p className="leading-relaxed">
              We envision a world where every great idea has the opportunity to become a successful venture. StartLinker aims to be the premier global hub for startup creation, where collaboration transcends geographical boundaries and innovation knows no limits. We strive to be the catalyst for the next generation of technological advancements and business breakthroughs, nurtured by a supportive and diverse community.
            </p>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">What We Offer</h2>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>A vibrant community of entrepreneurs, developers, designers, marketers, and strategists.</li>
              <li>Tools for project creation, team management, and collaborative planning.</li>
              <li>A platform to submit ideas, gather feedback, and gain validation from peers.</li>
              <li>Networking opportunities to find co-founders and team members with complementary skills.</li>
              <li>Discussion forums for brainstorming, problem-solving, and knowledge sharing.</li>
              <li>Direct messaging capabilities to facilitate communication and collaboration.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">Join Us</h2>
            <p className="leading-relaxed">
              Whether you're an aspiring founder with a groundbreaking concept, a developer looking for your next exciting project, a designer eager to create impactful user experiences, or a strategist ready to steer a venture to success, StartLinker provides the tools and community to help you achieve your goals.
            </p>
            <p className="leading-relaxed">
              We believe that the best innovations come from collaboration. Join StartLinker today to explore projects, find team members, submit your ideas, and be part of a community dedicated to building the future of technology and business.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
