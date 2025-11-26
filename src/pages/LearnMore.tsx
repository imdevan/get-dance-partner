import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

// Easy-to-edit data structure for developers
const faqs = [
  {
    question: "What is Dance Partner?",
    answer: "Dance Partner is a cross-platform mobile app designed to help dancers maximize their learning from dance classes. It allows you to organize, tag, annotate, and practice from your dance recap videos all in one beautiful, intuitive interface."
  },
  {
    question: "When will Dance Partner be available?",
    answer: "Dance Partner is currently in active development. We're working hard to bring you the best possible experience. Join our waitlist to be notified when we launch and get early access to beta testing opportunities."
  },
  {
    question: "Which platforms will be supported?",
    answer: "Dance Partner will be available on iOS, Android, and web. Your videos and notes will sync seamlessly across all your devices, so you can practice anywhere, anytime."
  },
  {
    question: "How does video organization work?",
    answer: "Our smart organization system lets you tag videos by dance style, instructor, moves, and fundamentals. You can create custom categories, add notes, and quickly find exactly what you're looking for when it's time to practice."
  },
  {
    question: "Will my data be secure?",
    answer: "Absolutely. Your videos and notes are stored securely with end-to-end encryption. You have full control over your data and can export everything at any time. We never share your information with third parties."
  },
  {
    question: "How much will it cost?",
    answer: "We're still finalizing our pricing model, but our goal is to make Dance Partner accessible to all dancers. We'll offer a free tier with core features and premium options for advanced functionality. Early supporters will receive special discounts."
  },
];

const infoSections = [
  {
    title: "Development Status",
    content: "🚧 Active Development - We're currently building the core features including video organization, tagging system, and annotation tools. Our team is working hard to ensure a smooth and intuitive user experience.",
  },
  {
    title: "Expected Release",
    content: "📅 Beta Launch: Q2 2025 - We're aiming for a beta release in Spring 2025. Join our waitlist to be among the first to try Dance Partner and help shape its future.",
  },
  {
    title: "Get Involved",
    content: "💬 We'd love to hear from you! Whether you're a dancer, instructor, or studio owner, your feedback is invaluable. Reach out to us to share your thoughts or participate in user testing.",
  },
];

const LearnMore = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => window.location.href = '/'}
            className="mb-8 hover:bg-muted"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Learn More About{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                Dance Partner
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about how we're revolutionizing dance education
            </p>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {infoSections.map((section, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold">{section.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">
              Got questions? We've got answers.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-background border-2 rounded-lg px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your Dance Practice?
          </h2>
          <p className="text-muted-foreground text-lg">
            Join our waitlist and be the first to experience Dance Partner
          </p>
          <Button 
            size="lg" 
            className="mt-4 px-8 py-6 text-lg rounded-full"
            onClick={() => window.location.href = '/'}
          >
            Join the Waitlist
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LearnMore;